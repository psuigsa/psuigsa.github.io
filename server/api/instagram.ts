import { Request, Response } from 'express';
import { instagramService } from '../services/instagram.js';

export async function getInstagramPosts(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 8;
    const posts = await instagramService.fetchPosts(limit);
    
    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    console.error('Error in getInstagramPosts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Instagram posts',
      data: []
    });
  }
}

export async function refreshInstagramCache(req: Request, res: Response) {
  try {
    await instagramService.refreshCache();
    res.json({
      success: true,
      message: 'Instagram cache refreshed successfully'
    });
  } catch (error) {
    console.error('Error refreshing Instagram cache:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh Instagram cache'
    });
  }
}

// Debug endpoint to test Instagram scraping
export async function testInstagramScraping(req: Request, res: Response) {
  try {
    console.log('🧪 Testing Instagram scraping...');
    
    // Test direct Instagram page access
    const testUrl = 'https://www.instagram.com/psu.igsa/';
    console.log(`📡 Attempting to fetch: ${testUrl}`);
    
    const response = await fetch(testUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    console.log(`📊 Response status: ${response.status}`);
    console.log(`📊 Response headers:`, Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const html = await response.text();
      console.log(`📄 HTML length: ${html.length} characters`);
      
      // Check if it contains Instagram data
      const hasSharedData = html.includes('window._sharedData');
      const hasGraphQL = html.includes('"graphql"');
      
      res.json({
        success: true,
        debug: {
          status: response.status,
          htmlLength: html.length,
          hasSharedData,
          hasGraphQL,
          firstChars: html.substring(0, 200)
        }
      });
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Instagram scraping test failed:', error.message);
    res.json({
      success: false,
      error: error.message,
      debug: {
        message: 'Instagram is likely blocking the request or the endpoint has changed'
      }
    });
  }
}