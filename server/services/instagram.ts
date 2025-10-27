import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

export interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  timestamp: string;
  username: string;
  thumbnail_url?: string;
}

class InstagramService {
  private username = 'psu.igsa';
  private cacheFile = path.join(__dirname, '../cache/instagram-posts.json');
  private cacheDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  async fetchPosts(limit: number = 12): Promise<InstagramPost[]> {
    try {
      // Try to load from cache first
      const cachedPosts = await this.loadFromCache();
      if (cachedPosts) {
        console.log('✅ Returning cached Instagram posts');
        return cachedPosts.slice(0, limit);
      }

      console.log('🔄 Fetching fresh Instagram posts from public profile');
      const posts = await this.scrapePublicPosts(limit);
      await this.saveToCache(posts);
      console.log(`✅ Successfully scraped ${posts.length} posts`);
      return posts;
    } catch (error) {
      console.error('❌ Error fetching Instagram posts:', error.message);
      
      // Fallback to cache even if expired
      const cachedPosts = await this.loadFromCache(true);
      if (cachedPosts) {
        console.log('⚠️ Using expired cache as fallback');
        return cachedPosts.slice(0, limit);
      }
      
      // Final fallback to mock posts
      console.log('🎭 Using mock posts as final fallback');
      return this.getMockPosts().slice(0, limit);
    }
  }

  /**
   * UPDATED SCRAPING METHOD WITH MULTIPLE STRATEGIES
   * 
   * This method tries multiple extraction strategies to handle Instagram's
   * frequently changing HTML structure. Update the extraction functions
   * below if Instagram changes their data format.
   */
  private async scrapePublicPosts(limit: number): Promise<InstagramPost[]> {
    try {
      console.log(`🔍 Attempting to scrape Instagram posts for @${this.username}`);
      
      // First try: Direct Instagram page with modern headers
      const response = await axios.get(`https://www.instagram.com/${this.username}/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 15000,
      });

      const html = response.data;
      console.log(`📄 Retrieved HTML content (${html.length} characters)`);

      // Try multiple extraction strategies
      const strategies = [
        () => this.extractFromJsonLD(html, limit),
        () => this.extractFromReactData(html, limit),
        () => this.extractFromLegacySharedData(html, limit),
        () => this.extractFromMetaTags(html, limit)
      ];

      for (const strategy of strategies) {
        try {
          const posts = strategy();
          if (posts.length > 0) {
            console.log(`✅ Successfully extracted ${posts.length} posts`);
            return posts;
          }
        } catch (error) {
          console.log(`⚠️ Strategy failed: ${error.message}`);
          continue;
        }
      }
      
      throw new Error('All extraction strategies failed - Instagram structure may have changed');
    } catch (error) {
      console.error('❌ Error scraping Instagram:', error.message);
      
      // Alternative: Try the old JSON endpoint method as final attempt
      return await this.fetchViaLegacyEndpoint(limit);
    }
  }

  /**
   * LEGACY METHOD: Try the old Instagram endpoint (likely to fail)
   * Keep this as a fallback but expect it to not work
   */
  private async fetchViaLegacyEndpoint(limit: number): Promise<InstagramPost[]> {
    try {
      console.log('🔄 Trying legacy Instagram JSON endpoint');
      const url = `https://www.instagram.com/${this.username}/?__a=1&__d=dis`;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Cache-Control': 'no-cache',
        },
        timeout: 10000,
      });

      const data = response.data;
      
      if (data?.graphql?.user?.edge_owner_to_timeline_media?.edges) {
        const edges = data.graphql.user.edge_owner_to_timeline_media.edges;
        
        return edges.slice(0, limit).map((edge: any) => {
          const node = edge.node;
          return {
            id: node.id,
            caption: node.edge_media_to_caption?.edges[0]?.node?.text || '',
            media_url: node.display_url,
            media_type: node.is_video ? 'VIDEO' : (node.edge_sidecar_to_children ? 'CAROUSEL_ALBUM' : 'IMAGE'),
            permalink: `https://www.instagram.com/p/${node.shortcode}/`,
            timestamp: new Date(node.taken_at_timestamp * 1000).toISOString(),
            username: this.username,
            thumbnail_url: node.thumbnail_src
          };
        });
      }
      
      throw new Error('Legacy endpoint returned no posts');
    } catch (error) {
      console.log('⚠️ Legacy endpoint failed (expected):', error.message);
      throw error;
    }
  }

  private async fetchViaEmbed(limit: number): Promise<InstagramPost[]> {
    try {
      // Fallback method using Instagram's oEmbed API
      const response = await axios.get(`https://www.instagram.com/${this.username}/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 10000,
      });

      const html = response.data;
      
      // Extract JSON data from script tags
      const jsonMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);
      
      if (jsonMatch) {
        const sharedData = JSON.parse(jsonMatch[1]);
        const userData = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user;
        
        if (userData?.edge_owner_to_timeline_media?.edges) {
          const edges = userData.edge_owner_to_timeline_media.edges;
          
          return edges.slice(0, limit).map((edge: any) => {
            const node = edge.node;
            return {
              id: node.id,
              caption: node.edge_media_to_caption?.edges[0]?.node?.text || '',
              media_url: node.display_url,
              media_type: node.is_video ? 'VIDEO' : (node.edge_sidecar_to_children ? 'CAROUSEL_ALBUM' : 'IMAGE'),
              permalink: `https://www.instagram.com/p/${node.shortcode}/`,
              timestamp: new Date(node.taken_at_timestamp * 1000).toISOString(),
              username: this.username,
              thumbnail_url: node.thumbnail_src
            };
          });
        }
      }
      
      throw new Error('Could not extract posts from HTML');
    } catch (error) {
      console.error('Embed method also failed:', error);
      throw error;
    }
  }

  /**
   * EXTRACTION METHODS - UPDATE THESE IF INSTAGRAM CHANGES STRUCTURE
   */

  private extractFromJsonLD(html: string, limit: number): InstagramPost[] {
    const jsonLdMatches = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs);
    
    if (!jsonLdMatches) {
      throw new Error('No JSON-LD data found');
    }

    for (const match of jsonLdMatches) {
      try {
        const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
        const data = JSON.parse(jsonContent);
        
        if (data['@type'] === 'SocialMediaPosting' || data.mainEntity?.['@type'] === 'SocialMediaPosting') {
          const posts = Array.isArray(data) ? data : [data];
          return posts.slice(0, limit).map((post: any, index: number) => ({
            id: `jsonld_${index}`,
            caption: post.text || post.description || '',
            media_url: post.image || post.url || 'https://via.placeholder.com/400',
            media_type: 'IMAGE' as const,
            permalink: post.url || `https://instagram.com/${this.username}`,
            timestamp: post.datePublished || new Date().toISOString(),
            username: this.username
          }));
        }
      } catch (error) {
        continue;
      }
    }
    
    throw new Error('No valid JSON-LD social media data found');
  }

  private extractFromReactData(html: string, limit: number): InstagramPost[] {
    const patterns = [
      /window\.__additionalDataLoaded\s*\(\s*['"]\S+['"]\s*,\s*({.+?})\s*\)/s,
      /window\._sharedData\s*=\s*({.+?});/s,
      /"props":\s*({.+?"user":.+?"edge_owner_to_timeline_media".+?})/s,
      /"graphql":\s*({.+?"user":.+?"edge_owner_to_timeline_media".+?})/s
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        try {
          const data = JSON.parse(match[1]);
          
          const possiblePaths = [
            data?.user?.edge_owner_to_timeline_media?.edges,
            data?.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges,
            data?.graphql?.user?.edge_owner_to_timeline_media?.edges,
            data?.props?.user?.edge_owner_to_timeline_media?.edges
          ];

          for (const edges of possiblePaths) {
            if (Array.isArray(edges) && edges.length > 0) {
              return edges.slice(0, limit).map((edge: any) => {
                const node = edge.node;
                return {
                  id: node.id || `react_${Math.random().toString(36).substr(2, 9)}`,
                  caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
                  media_url: node.display_url || node.thumbnail_src || 'https://via.placeholder.com/400',
                  media_type: node.is_video ? 'VIDEO' : (node.edge_sidecar_to_children ? 'CAROUSEL_ALBUM' : 'IMAGE'),
                  permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                  timestamp: new Date((node.taken_at_timestamp || Date.now() / 1000) * 1000).toISOString(),
                  username: this.username,
                  thumbnail_url: node.thumbnail_src
                };
              });
            }
          }
        } catch (error) {
          continue;
        }
      }
    }
    
    throw new Error('No valid React application data found');
  }

  private extractFromLegacySharedData(html: string, limit: number): InstagramPost[] {
    const jsonMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);
    
    if (!jsonMatch) {
      throw new Error('No legacy shared data found');
    }

    const sharedData = JSON.parse(jsonMatch[1]);
    const userData = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user;
    
    if (userData?.edge_owner_to_timeline_media?.edges) {
      const edges = userData.edge_owner_to_timeline_media.edges;
      
      return edges.slice(0, limit).map((edge: any) => {
        const node = edge.node;
        return {
          id: node.id,
          caption: node.edge_media_to_caption?.edges[0]?.node?.text || '',
          media_url: node.display_url,
          media_type: node.is_video ? 'VIDEO' : (node.edge_sidecar_to_children ? 'CAROUSEL_ALBUM' : 'IMAGE'),
          permalink: `https://www.instagram.com/p/${node.shortcode}/`,
          timestamp: new Date(node.taken_at_timestamp * 1000).toISOString(),
          username: this.username,
          thumbnail_url: node.thumbnail_src
        };
      });
    }
    
    throw new Error('No posts found in legacy shared data');
  }

  private extractFromMetaTags(html: string, limit: number): InstagramPost[] {
    const getMetaContent = (property: string): string => {
      const match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'));
      return match ? match[1] : '';
    };

    const title = getMetaContent('og:title') || getMetaContent('twitter:title');
    const description = getMetaContent('og:description') || getMetaContent('twitter:description');
    const image = getMetaContent('og:image') || getMetaContent('twitter:image');
    
    if (!title && !description && !image) {
      throw new Error('No useful meta tag data found');
    }

    return [{
      id: `meta_${Date.now()}`,
      caption: description || `Latest from @${this.username}`,
      media_url: image || 'https://via.placeholder.com/400',
      media_type: 'IMAGE' as const,
      permalink: `https://instagram.com/${this.username}`,
      timestamp: new Date().toISOString(),
      username: this.username
    }];
  }

  private async loadFromCache(ignoreExpiry = false): Promise<InstagramPost[] | null> {
    try {
      await fs.mkdir(path.dirname(this.cacheFile), { recursive: true });
      
      const cacheData = await fs.readFile(this.cacheFile, 'utf-8');
      const cache = JSON.parse(cacheData);
      
      if (!ignoreExpiry) {
        const now = Date.now();
        if (now - cache.timestamp > this.cacheDuration) {
          console.log('Cache expired');
          return null;
        }
      }
      
      return cache.posts;
    } catch (error) {
      console.log('No valid cache found');
      return null;
    }
  }

  private async saveToCache(posts: InstagramPost[]): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.cacheFile), { recursive: true });
      
      const cache = {
        timestamp: Date.now(),
        posts,
      };
      
      await fs.writeFile(this.cacheFile, JSON.stringify(cache, null, 2));
      console.log('Instagram posts cached successfully');
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  private getMockPosts(): InstagramPost[] {
    return [
      {
        id: 'mock_1',
        caption: 'Welcome to PSU IGSA! Join our vibrant community of Indian graduate students at Penn State University. 🎓🇮🇳 #PSUIGSA #PennState #IndianStudents',
        media_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_2',
        caption: 'Celebrating Diwali with our IGSA family! ✨ What an amazing evening filled with lights, joy, and community spirit. #Diwali2024 #IGSA #Community',
        media_url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_3',
        caption: 'Game night was a huge success! 🎮 Thank you to everyone who joined us for an evening of fun and friendship. #GameNight #IGSA #Fun',
        media_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_4',
        caption: 'Professional development workshop: "Navigating Your Career Path in the US" 📈 Great insights shared by our alumni panel!',
        media_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_5',
        caption: 'Cricket tournament this weekend! Come cheer for our teams and enjoy some great matches. 🏏 #Cricket #Sports #Community',
        media_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_6',
        caption: 'Potluck dinner bringing together flavors from across India! 🍛 Thank you to everyone who shared their delicious recipes.',
        media_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_7',
        caption: 'Yoga and meditation session in the beautiful Penn State campus. Finding peace amidst busy academic life. 🧘‍♀️ #Wellness #YogaLife',
        media_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_8',
        caption: 'Study group sessions helping each other succeed! Academic support is what makes our community strong. 📚 #StudyTogether #AcademicSupport',
        media_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
        username: 'psu.igsa'
      }
    ];
  }

  // Method to manually refresh cache (for cron job)
  async refreshCache(): Promise<void> {
    try {
      console.log('Refreshing Instagram cache...');
      const posts = await this.scrapePublicPosts(20);
      await this.saveToCache(posts);
      console.log(`Cache refreshed with ${posts.length} posts`);
    } catch (error) {
      console.error('Error refreshing Instagram cache:', error);
    }
  }
}

export const instagramService = new InstagramService();