export interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  timestamp: string;
  username: string;
}

class ClientInstagramService {
  private username = 'psu.igsa';
  private cacheKey = 'igsa_instagram_posts';
  private cacheDuration = 2 * 60 * 60 * 1000; // 2 hours

  async fetchPosts(limit: number = 8): Promise<InstagramPost[]> {
    try {
      // Check cache first
      const cached = this.getFromCache();
      if (cached) {
        console.log('Using cached Instagram posts');
        return cached.slice(0, limit);
      }

      // Try to fetch fresh posts
      const posts = await this.fetchFreshPosts(limit);
      this.saveToCache(posts);
      return posts;
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      
      // Return cached even if expired, or mock posts
      const fallback = this.getFromCache(true) || this.getMockPosts();
      return fallback.slice(0, limit);
    }
  }

  /**
   * UPDATED FETCH METHOD WITH MULTIPLE STRATEGIES
   * Tries different approaches to scrape Instagram data
   */
  private async fetchFreshPosts(limit: number): Promise<InstagramPost[]> {
    // Updated strategy order - prioritize methods most likely to work
    const methods = [
      () => this.fetchDirectly(),
      () => this.fetchViaProxy(),
      () => this.fetchViaCorsproxy(),
      () => this.fetchViaRSS()
    ];

    for (const method of methods) {
      try {
        console.log('🔄 Attempting Instagram fetch method...');
        const posts = await method();
        if (posts.length > 0) {
          console.log(`✅ Successfully fetched ${posts.length} posts`);
          return posts.slice(0, limit);
        }
      } catch (error) {
        console.log(`⚠️ Method failed: ${error.message}`);
        continue;
      }
    }

    throw new Error('All fetch methods failed');
  }

  /**
   * Try to fetch directly (will likely fail due to CORS but worth trying)
   */
  private async fetchDirectly(): Promise<InstagramPost[]> {
    const response = await fetch(`https://www.instagram.com/${this.username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    return this.parseInstagramHTML(html);
  }

  private async fetchViaProxy(): Promise<InstagramPost[]> {
    // Using a CORS proxy service
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const instagramUrl = encodeURIComponent(`https://www.instagram.com/${this.username}/`);
    
    const response = await fetch(`${proxyUrl}${instagramUrl}`);
    const html = await response.text();
    
    return this.parseInstagramHTML(html);
  }

  private async fetchViaCorsproxy(): Promise<InstagramPost[]> {
    // Alternative CORS proxy
    const proxyUrl = 'https://corsproxy.io/?';
    const instagramUrl = encodeURIComponent(`https://www.instagram.com/${this.username}/`);
    
    const response = await fetch(`${proxyUrl}${instagramUrl}`);
    const html = await response.text();
    
    return this.parseInstagramHTML(html);
  }

  private async fetchViaRSS(): Promise<InstagramPost[]> {
    // Some third-party services provide Instagram RSS feeds
    // This is a placeholder - you'd need to find a reliable service
    throw new Error('RSS method not implemented');
  }

  /**
   * UPDATED PARSING METHOD WITH MULTIPLE STRATEGIES
   * 
   * This method tries multiple extraction approaches to handle Instagram's
   * frequently changing HTML structure.
   * 
   * MAINTENANCE: Update these strategies if Instagram changes their structure
   */
  private parseInstagramHTML(html: string): InstagramPost[] {
    console.log(`📄 Parsing HTML content (${html.length} characters)`);
    
    // Strategy 1: Try modern JSON-LD approach
    try {
      const posts = this.extractFromJsonLD(html);
      if (posts.length > 0) {
        console.log(`✅ Extracted ${posts.length} posts using JSON-LD method`);
        return posts;
      }
    } catch (error) {
      console.log('⚠️ JSON-LD extraction failed:', error.message);
    }

    // Strategy 2: Try React application data
    try {
      const posts = this.extractFromReactData(html);
      if (posts.length > 0) {
        console.log(`✅ Extracted ${posts.length} posts using React data method`);
        return posts;
      }
    } catch (error) {
      console.log('⚠️ React data extraction failed:', error.message);
    }

    // Strategy 3: Try legacy window._sharedData (deprecated but might work)
    try {
      const posts = this.extractFromLegacySharedData(html);
      if (posts.length > 0) {
        console.log(`✅ Extracted ${posts.length} posts using legacy method`);
        return posts;
      }
    } catch (error) {
      console.log('⚠️ Legacy shared data extraction failed:', error.message);
    }

    // Strategy 4: Try meta tags fallback
    try {
      const posts = this.extractFromMetaTags(html);
      if (posts.length > 0) {
        console.log(`✅ Extracted ${posts.length} posts using meta tags method`);
        return posts;
      }
    } catch (error) {
      console.log('⚠️ Meta tags extraction failed:', error.message);
    }
    
    throw new Error('All parsing strategies failed - Instagram structure may have changed');
  }

  private extractFromJsonLD(html: string): InstagramPost[] {
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
          return posts.map((post: any, index: number) => ({
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
        continue; // Try next JSON-LD block
      }
    }
    
    throw new Error('No valid JSON-LD social media data found');
  }

  private extractFromReactData(html: string): InstagramPost[] {
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
              return edges.map((edge: any) => {
                const node = edge.node;
                return {
                  id: node.id || `react_${Math.random().toString(36).substr(2, 9)}`,
                  caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
                  media_url: node.display_url || node.thumbnail_src || 'https://via.placeholder.com/400',
                  media_type: node.is_video ? 'VIDEO' : (node.edge_sidecar_to_children ? 'CAROUSEL_ALBUM' : 'IMAGE'),
                  permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                  timestamp: new Date((node.taken_at_timestamp || Date.now() / 1000) * 1000).toISOString(),
                  username: this.username
                };
              });
            }
          }
        } catch (error) {
          continue; // Try next pattern
        }
      }
    }
    
    throw new Error('No valid React application data found');
  }

  private extractFromLegacySharedData(html: string): InstagramPost[] {
    const jsonMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);
    
    if (!jsonMatch) {
      throw new Error('No legacy shared data found');
    }

    const sharedData = JSON.parse(jsonMatch[1]);
    const userData = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user;
    
    if (userData?.edge_owner_to_timeline_media?.edges) {
      return userData.edge_owner_to_timeline_media.edges.map((edge: any) => {
        const node = edge.node;
        return {
          id: node.id,
          caption: node.edge_media_to_caption?.edges[0]?.node?.text || '',
          media_url: node.display_url,
          media_type: node.is_video ? 'VIDEO' : (node.edge_sidecar_to_children ? 'CAROUSEL_ALBUM' : 'IMAGE'),
          permalink: `https://www.instagram.com/p/${node.shortcode}/`,
          timestamp: new Date(node.taken_at_timestamp * 1000).toISOString(),
          username: this.username
        };
      });
    }
    
    throw new Error('No posts found in legacy shared data');
  }

  private extractFromMetaTags(html: string): InstagramPost[] {
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

  private getFromCache(ignoreExpiry = false): InstagramPost[] | null {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;
      
      const { posts, timestamp } = JSON.parse(cached);
      
      if (!ignoreExpiry && Date.now() - timestamp > this.cacheDuration) {
        return null;
      }
      
      return posts;
    } catch {
      return null;
    }
  }

  private saveToCache(posts: InstagramPost[]): void {
    try {
      const cache = {
        posts,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cache));
    } catch (error) {
      console.error('Failed to cache posts:', error);
    }
  }

  private getMockPosts(): InstagramPost[] {
    return [
      {
        id: 'mock_1',
        caption: 'Welcome to PSU IGSA! Join our vibrant community of Indian graduate students at Penn State University. 🎓🇮🇳',
        media_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_2',
        caption: 'Celebrating Diwali with our IGSA family! ✨ What an amazing evening filled with lights, joy, and community spirit.',
        media_url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_3',
        caption: 'Game night was a huge success! 🎮 Thank you to everyone who joined us for an evening of fun and friendship.',
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
        caption: 'Cricket tournament this weekend! Come cheer for our teams and enjoy some great matches. 🏏',
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
        caption: 'Yoga and meditation session in the beautiful Penn State campus. Finding peace amidst busy academic life. 🧘‍♀️',
        media_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
        username: 'psu.igsa'
      },
      {
        id: 'mock_8',
        caption: 'Study group sessions helping each other succeed! Academic support is what makes our community strong. 📚',
        media_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
        media_type: 'IMAGE',
        permalink: 'https://instagram.com/psu.igsa',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
        username: 'psu.igsa'
      }
    ];
  }
}

export const clientInstagramService = new ClientInstagramService();