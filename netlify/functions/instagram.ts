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

const scrapeInstagramPosts = async (limit: number = 8): Promise<InstagramPost[]> => {
  try {
    // Try to fetch from Instagram's public endpoint
    const response = await axios.get(`https://www.instagram.com/psu.igsa/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 8000,
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
            username: 'psu.igsa',
            thumbnail_url: node.thumbnail_src
          };
        });
      }
    }
    
    throw new Error('Could not extract posts from HTML');
  } catch (error) {
    console.error('Instagram scraping failed:', error);
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