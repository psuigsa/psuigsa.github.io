# Instagram Scraping Maintenance Guide

This document provides guidance for maintaining and updating the Instagram scraping functionality in this project.

## Overview

The project scrapes Instagram posts from the public `psu.igsa` profile using multiple strategies to handle Instagram's frequently changing HTML structure. All scraping implementations include robust fallbacks to ensure the website always displays content.

## Architecture

### Files Involved

1. **`netlify/functions/instagram.ts`** - Netlify serverless function for scraping
2. **`server/services/instagram.ts`** - Server-side scraping service with caching
3. **`client/services/instagram-client.ts`** - Client-side scraping (with CORS proxy)
4. **`server/api/instagram.ts`** - Express API endpoints

### Scraping Strategies

Each implementation uses multiple extraction strategies in order of preference:

1. **JSON-LD Structured Data** - Modern approach using `<script type="application/ld+json">`
2. **React Application Data** - Extract from `window.__additionalDataLoaded` or similar
3. **Legacy Shared Data** - Old `window._sharedData` method (deprecated but kept for compatibility)
4. **Meta Tags Fallback** - Basic profile info from Open Graph/Twitter meta tags

## Maintenance Tasks

### When Instagram Changes Their Structure

Instagram frequently updates their HTML structure. When scraping fails:

1. **Check the logs** - All implementations log detailed error messages
2. **Use the debug endpoint** - `GET /api/instagram/test` provides detailed analysis
3. **Update extraction patterns** - Modify the regex patterns and data paths

### Updating Extraction Patterns

#### JSON-LD Method
Look for `<script type="application/ld+json">` tags and update the data structure parsing:
```typescript
// In extractFromJsonLD function
if (data['@type'] === 'SocialMediaPosting' || data.mainEntity?.['@type'] === 'SocialMediaPosting') {
  // Update this condition if Instagram changes the JSON-LD structure
}
```

#### React Data Method
Update the regex patterns to match new variable names:
```typescript
// In extractFromReactData function
const patterns = [
  /window\.__additionalDataLoaded\s*\(\s*['"]\S+['"]\s*,\s*({.+?})\s*\)/s,
  /window\._sharedData\s*=\s*({.+?});/s,
  // ADD NEW PATTERNS HERE when Instagram introduces new data loading methods
];
```

#### Data Path Updates
Update the possible data paths if Instagram changes their JSON structure:
```typescript
const possiblePaths = [
  data?.user?.edge_owner_to_timeline_media?.edges,
  data?.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges,
  // ADD NEW PATHS HERE when Instagram changes their data structure
];
```

### Testing Changes

1. **Run the debug endpoint**: `GET /api/instagram/test`
2. **Check console logs** for detailed error messages
3. **Test with different limits**: `GET /api/instagram?limit=5`
4. **Verify fallback works**: Ensure mock data is returned when scraping fails

### Common Issues and Solutions

#### Issue: All extraction methods fail
**Solution**: Instagram may have changed their structure completely
- Check the debug endpoint output
- Look for new script tags or data patterns
- Update the extraction functions accordingly

#### Issue: CORS errors in client
**Solution**: The client service uses proxy services which may be down
- Try different CORS proxy services
- Update the proxy URLs in `fetchViaProxy()` and `fetchViaCorsproxy()`

#### Issue: Rate limiting
**Solution**: Instagram may be blocking too many requests
- Increase cache duration
- Add delays between requests
- Use different User-Agent strings

## Mock Data Fallback

All implementations fall back to mock data located in the `getMockPosts()` functions. This ensures the website always displays content even when scraping fails completely.

**Important**: Never remove the mock data fallback - it's essential for site reliability.

## Cache Management

The server implementation includes caching:
- Cache duration: 2 hours (configurable)
- Cache location: `server/cache/instagram-posts.json`
- Manual refresh: `POST /api/instagram/refresh`

## Debugging Tools

### Debug Endpoint
`GET /api/instagram/test` provides:
- HTTP response status
- HTML content analysis
- Available data patterns
- Suggestions for fixes

### Console Logging
All implementations include detailed console logging:
- `🔍` - Starting scraping attempt
- `✅` - Successful extraction
- `⚠️` - Method failed, trying next
- `❌` - Complete failure, using fallback
- `🎭` - Using mock data

## Alternative Solutions

If scraping becomes too unreliable, consider:

1. **Instagram Basic Display API** - Official API requiring app registration
2. **Third-party services** - Services that provide Instagram data APIs
3. **Manual content management** - Admin interface to manually add posts
4. **RSS feeds** - Some services provide Instagram RSS feeds

## Monitoring

Set up monitoring for:
- Scraping success/failure rates
- Cache hit/miss ratios
- Error patterns in logs
- Mock data usage frequency

## Security Considerations

- Never commit Instagram credentials to the repository
- Use appropriate User-Agent strings to identify requests
- Respect Instagram's terms of service and rate limits
- Ensure CORS is properly configured for client-side requests

---

**Last Updated**: Current implementation date
**Next Review**: Recommend monthly review of scraping functionality