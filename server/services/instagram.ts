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

  private async scrapePublicPosts(limit: number): Promise<InstagramPost[]> {
    try {
      // Instagram's public JSON endpoint for profiles
      const url = `https://www.instagram.com/${this.username}/?__a=1&__d=dis`;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Cache-Control': 'no-cache',
        },
        timeout: 10000,
      });

      const data = response.data;
      
      // Extract posts from the response
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
      
      throw new Error('No posts found in response');
    } catch (error) {
      console.error('Error scraping Instagram:', error);
      
      // Alternative: Try fetching from Instagram's embed endpoint
      return await this.fetchViaEmbed(limit);
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