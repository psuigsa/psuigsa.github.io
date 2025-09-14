import { Handler } from '@netlify/functions';
import axios from 'axios';

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  timestamp: string;
  username: string;
  thumbnail_url?: string;
}

const getMockPosts = (): InstagramPost[] => {
  return [
    {
      id: 'mock_1',
      caption: 'Welcome to PSU IGSA! Join our vibrant community of Indian graduate students at Penn State University. 🎓🇮🇳',
      media_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_2',
      caption: 'Celebrating Diwali with our IGSA family! ✨ What an amazing evening filled with lights, joy, and community spirit.',
      media_url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=400&fit=crop',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_3',
      caption: 'Game night was a huge success! 🎮 Thank you to everyone who joined us for an evening of fun and friendship.',
      media_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_4',
      caption: 'Professional development workshop: "Navigating Your Career Path in the US" 📈 Great insights shared by our alumni panel!',
      media_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_5',
      caption: 'Cricket tournament this weekend! Come cheer for our teams and enjoy some great matches. 🏏',
      media_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_6',
      caption: 'Potluck dinner bringing together flavors from across India! 🍛 Thank you to everyone who shared their delicious recipes.',
      media_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_7',
      caption: 'Yoga and meditation session in the beautiful Penn State campus. Finding peace amidst busy academic life. 🧘‍♀️',
      media_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_8',
      caption: 'Study group sessions helping each other succeed! Academic support is what makes our community strong. 📚',
      media_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
      username: 'psu.igsa'
    }
  ];
};

/**
 * EXTRACTION STRATEGY 1: JSON-LD Structured Data
 * Instagram now uses JSON-LD for structured data which is more reliable
 * UPDATE THIS: Look for script tags with type="application/ld+json"
 */
function extractFromJsonLD(html: string, limit: number, username: string): InstagramPost[] {
  const jsonLdMatches = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs);
  
  if (!jsonLdMatches) {
    throw new Error('No JSON-LD data found');
  }

  for (const match of jsonLdMatches) {
    try {
      const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      const data = JSON.parse(jsonContent);
      
      // Look for social media posts or profile data
      if (data['@type'] === 'SocialMediaPosting' || data.mainEntity?.['@type'] === 'SocialMediaPosting') {
        const posts = Array.isArray(data) ? data : [data];
        return posts.slice(0, limit).map((post: any, index: number) => ({
          id: `jsonld_${index}`,
          caption: post.text || post.description || '',
          media_url: post.image || post.url || 'https://via.placeholder.com/400',
          media_type: 'IMAGE' as const,
          permalink: post.url || `https://instagram.com/${username}`,
          timestamp: post.datePublished || new Date().toISOString(),
          username
        }));
      }
    } catch (error) {
      continue; // Try next JSON-LD block
    }
  }
  
  throw new Error('No valid JSON-LD social media data found');
}

/**
 * EXTRACTION STRATEGY 2: React Application Data
 * Instagram loads data through React props - look for window.__additionalDataLoaded
 * UPDATE THIS: Check for different variable names if Instagram changes them
 */
function extractFromReactData(html: string, limit: number, username: string): InstagramPost[] {
  // Try various React data patterns Instagram might use
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
        
        // Navigate through possible data structures
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
                username,
                thumbnail_url: node.thumbnail_src
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

/**
 * EXTRACTION STRATEGY 3: Legacy Shared Data (Deprecated)
 * This is the old method - kept for compatibility but will likely fail
 * REMOVE THIS: When confirmed it no longer works
 */
function extractFromLegacySharedData(html: string, limit: number, username: string): InstagramPost[] {
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
        username,
        thumbnail_url: node.thumbnail_src
      };
    });
  }
  
  throw new Error('No posts found in legacy shared data');
}

/**
 * EXTRACTION STRATEGY 4: Meta Tags Fallback
 * Extract basic profile info from meta tags as a last resort
 * UPDATE THIS: Add more meta tag patterns if needed
 */
function extractFromMetaTags(html: string, limit: number, username: string): InstagramPost[] {
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

  // Create a single post from meta data (limited info available)
  return [{
    id: `meta_${Date.now()}`,
    caption: description || `Latest from @${username}`,
    media_url: image || 'https://via.placeholder.com/400',
    media_type: 'IMAGE' as const,
    permalink: `https://instagram.com/${username}`,
    timestamp: new Date().toISOString(),
    username
  }];
}

/**
 * Instagram Scraping Service
 * 
 * This function attempts to scrape Instagram posts using multiple strategies:
 * 1. Modern JSON-LD structured data approach
 * 2. Legacy window._sharedData method (deprecated but may still work)
 * 3. Basic HTML meta tag extraction
 * 
 * MAINTENANCE NOTES:
 * - Instagram frequently changes their HTML structure
 * - Update the parsing strategies below if scraping fails
 * - Check the console logs for detailed error information
 * - The mock data fallback ensures the site always shows content
 */
const scrapeInstagramPosts = async (limit: number = 8): Promise<InstagramPost[]> => {
  const username = 'psu.igsa';
  
  try {
    console.log(`🔍 Attempting to scrape Instagram posts for @${username}`);
    
    // Try to fetch from Instagram's public page
    const response = await axios.get(`https://www.instagram.com/${username}/`, {
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
      timeout: 10000,
    });

    const html = response.data;
    console.log(`📄 Retrieved HTML content (${html.length} characters)`);
    
    // Strategy 1: Try modern JSON-LD structured data approach
    try {
      const posts = extractFromJsonLD(html, limit, username);
      if (posts.length > 0) {
        console.log(`✅ Successfully extracted ${posts.length} posts using JSON-LD method`);
        return posts;
      }
    } catch (error) {
      console.log('⚠️ JSON-LD extraction failed:', error.message);
    }

    // Strategy 2: Try React application data approach
    try {
      const posts = extractFromReactData(html, limit, username);
      if (posts.length > 0) {
        console.log(`✅ Successfully extracted ${posts.length} posts using React data method`);
        return posts;
      }
    } catch (error) {
      console.log('⚠️ React data extraction failed:', error.message);
    }

    // Strategy 3: Try legacy window._sharedData method (deprecated but might still work)
    try {
      const posts = extractFromLegacySharedData(html, limit, username);
      if (posts.length > 0) {
        console.log(`✅ Successfully extracted ${posts.length} posts using legacy method`);
        return posts;
      }
    } catch (error) {
      console.log('⚠️ Legacy shared data extraction failed:', error.message);
    }

    // Strategy 4: Try basic meta tag extraction for profile info
    try {
      const posts = extractFromMetaTags(html, limit, username);
      if (posts.length > 0) {
        console.log(`✅ Successfully extracted ${posts.length} posts using meta tags method`);
        return posts;
      }
    } catch (error) {
      console.log('⚠️ Meta tags extraction failed:', error.message);
    }
    
    throw new Error('All extraction strategies failed - Instagram may have changed their HTML structure');
  } catch (error) {
    console.error('❌ Instagram scraping completely failed:', error.message);
    console.log('🎭 Falling back to mock data to ensure content is always available');
    
    // Return mock posts as fallback
    return getMockPosts().slice(0, limit);
  }
};

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const limit = parseInt(event.queryStringParameters?.limit || '8');
    const posts = await scrapeInstagramPosts(limit);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: posts,
        count: posts.length,
      }),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch Instagram posts',
        data: getMockPosts().slice(0, 8),
      }),
    };
  }
};