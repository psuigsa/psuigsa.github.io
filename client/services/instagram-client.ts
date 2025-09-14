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

  private async fetchFreshPosts(limit: number): Promise<InstagramPost[]> {
    // Try multiple methods in order of preference
    const methods = [
      () => this.fetchViaProxy(),
      () => this.fetchViaRSS(),
      () => this.fetchViaCorsproxy()
    ];

    for (const method of methods) {
      try {
        console.log('Attempting to fetch Instagram posts...');
        const posts = await method();
        if (posts.length > 0) {
          return posts.slice(0, limit);
        }
      } catch (error) {
        console.log('Method failed, trying next...');
        continue;
      }
    }

    throw new Error('All fetch methods failed');
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

  private parseInstagramHTML(html: string): InstagramPost[] {
    try {
      // Extract JSON data from Instagram's HTML
      const jsonMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);
      
      if (jsonMatch) {
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
      }
      
      throw new Error('No posts found in HTML');
    } catch (error) {
      throw new Error('Failed to parse Instagram HTML');
    }
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