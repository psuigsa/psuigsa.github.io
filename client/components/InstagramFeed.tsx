import { useState, useEffect } from 'react';
import { ExternalLink, Heart, MessageCircle, Instagram } from 'lucide-react';

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

interface InstagramFeedProps {
  maxPosts?: number;
  showCaptions?: boolean;
  className?: string;
}

const getMockPosts = (): InstagramPost[] => {
  return [
    {
      id: 'mock_1',
      caption: 'Welcome to PSU IGSA! Join our vibrant community of Indian graduate students at Penn State University. 🎓🇮🇳',
      media_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop',
      media_type: 'IMAGE' as const,
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_2',
      caption: 'Celebrating Diwali with our IGSA family! ✨ What an amazing evening filled with lights, joy, and community spirit.',
      media_url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=400&fit=crop',
      media_type: 'IMAGE' as const,
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_3',
      caption: 'Game night was a huge success! 🎮 Thank you to everyone who joined us for an evening of fun and friendship.',
      media_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
      media_type: 'IMAGE' as const,
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_4',
      caption: 'Professional development workshop: "Navigating Your Career Path in the US" 📈 Great insights shared by our alumni panel!',
      media_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      media_type: 'IMAGE' as const,
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_5',
      caption: 'Cricket tournament this weekend! Come cheer for our teams and enjoy some great matches. 🏏',
      media_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop',
      media_type: 'IMAGE' as const,
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_6',
      caption: 'Potluck dinner bringing together flavors from across India! 🍛 Thank you to everyone who shared their delicious recipes.',
      media_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
      media_type: 'IMAGE' as const,
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_7',
      caption: 'Yoga and meditation session in the beautiful Penn State campus. Finding peace amidst busy academic life. 🧘‍♀️',
      media_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      media_type: 'IMAGE' as const,
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      username: 'psu.igsa'
    },
    {
      id: 'mock_8',
      caption: 'Study group sessions helping each other succeed! Academic support is what makes our community strong. 📚',
      media_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
      media_type: 'IMAGE' as const,
      permalink: 'https://instagram.com/psu.igsa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
      username: 'psu.igsa'
    }
  ];
};

export default function InstagramFeed({ 
  maxPosts = 8,
  showCaptions = true,
  className = ''
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try API first with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      const apiUrl = isProduction 
        ? `/.netlify/functions/instagram?limit=${maxPosts}`
        : `/api/instagram/posts?limit=${maxPosts}`;
      
      const response = await fetch(apiUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.length > 0) {
          setPosts(data.data);
          setLoading(false);
          return;
        }
      }
      
      throw new Error('API response not successful');
    } catch (error) {
      console.log('Instagram API failed, using mock posts:', error);
      // Use mock posts as fallback
      setPosts(getMockPosts());
    } finally {
      setLoading(false);
    }
  };

  const formatCaption = (caption: string) => {
    if (!caption) return '';
    // Remove hashtags and mentions for cleaner display
    return caption.replace(/#\w+/g, '').replace(/@\w+/g, '').trim();
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    }
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
        {[...Array(maxPosts)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="bg-gray-200 aspect-square"></div>
            {showCaptions && (
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Instagram className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Unable to load Instagram posts</p>
        <button
          onClick={fetchInstagramPosts}
          className="bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {posts.slice(0, maxPosts).map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={post.media_url}
              alt="IGSA Instagram post"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Video indicator */}
            {post.media_type === 'VIDEO' && (
              <div className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            )}
            
            {/* Carousel indicator */}
            {post.media_type === 'CAROUSEL_ALBUM' && (
              <div className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* Overlay with external link icon */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          {showCaptions && (
            <div className="p-4">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3">
                {formatCaption(post.caption).slice(0, 120)}
                {post.caption && post.caption.length > 120 && '...'}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <Instagram className="w-3 h-3 mr-1" />
                  @{post.username}
                </span>
                <span>{getTimeAgo(post.timestamp)}</span>
              </div>
            </div>
          )}
        </a>
      ))}
    </div>
  );
}