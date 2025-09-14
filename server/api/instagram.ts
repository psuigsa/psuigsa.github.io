import { Request, Response } from 'express';
import { instagramService } from '../services/instagram.js';

/**
 * Instagram API Endpoints
 * 
 * This module provides endpoints for fetching Instagram posts and managing the cache.
 * All endpoints handle graceful fallbacks to ensure content is always available.
 */

export async function getInstagramPosts(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 8;
    console.log(`📡 API request for ${limit} Instagram posts`);
    
    const posts = await instagramService.fetchPosts(limit);
    
    res.json({
      success: true,
      data: posts,
      count: posts.length,
      message: posts[0]?.id?.startsWith('mock_') ? 'Using mock data (scraping may have failed)' : 'Live data retrieved'
    });
  } catch (error) {
    console.error('❌ Error in getInstagramPosts:', error);
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

/**
 * DEBUG ENDPOINT: Test Instagram Scraping
 * 
 * This endpoint helps debug Instagram scraping issues by testing direct
 * access to the Instagram page and reporting what was found.
 * 
 * Use this endpoint to understand why scraping might be failing:
 * - Check if Instagram is blocking requests
 * - See what HTML structure is being returned
 * - Identify new data patterns Instagram might be using
 */
export async function testInstagramScraping(req: Request, res: Response) {
  try {
    console.log('🧪 Testing Instagram scraping...');
    
    // Test direct Instagram page access
    const testUrl = 'https://www.instagram.com/psu.igsa/';
    console.log(`📡 Attempting to fetch: ${testUrl}`);
    
    const response = await fetch(testUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      },
    });
    
    console.log(`📊 Response status: ${response.status}`);
    console.log(`📊 Response headers:`, Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const html = await response.text();
      console.log(`📄 HTML length: ${html.length} characters`);
      
      // Analyze the HTML structure for debugging
      const hasSharedData = html.includes('window._sharedData');
      const hasJsonLD = html.includes('application/ld+json');
      const hasGraphQL = html.includes('"graphql"');
      const hasReactData = html.includes('__additionalDataLoaded');
      const hasMetaTags = html.includes('og:title') || html.includes('twitter:title');
      
      console.log('🔍 HTML analysis:', {
        hasSharedData,
        hasJsonLD,
        hasGraphQL,
        hasReactData,
        hasMetaTags
      });
      
      res.json({
        success: true,
        debug: {
          status: response.status,
          htmlLength: html.length,
          analysis: {
            hasSharedData,
            hasJsonLD,
            hasGraphQL,
            hasReactData,
            hasMetaTags
          },
          sampleContent: html.substring(0, 500),
          message: 'Instagram page accessible - check analysis for available data patterns'
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
        message: 'Instagram may be blocking requests or the page structure has changed',
        suggestions: [
          'Check if Instagram requires login for this profile',
          'Verify the username "psu.igsa" is correct',
          'Instagram may be rate limiting or blocking automated requests',
          'Consider using Instagram Basic Display API for reliable access'
        ]
      }
    });
  }
}