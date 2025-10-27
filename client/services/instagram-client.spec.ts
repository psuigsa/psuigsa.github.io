import { describe, it, expect, vi } from 'vitest';
import { clientInstagramService } from './instagram-client';

describe('Instagram Client Service', () => {
  it('should return mock data when scraping fails', async () => {
    // Mock fetch to simulate network failure
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    
    const posts = await clientInstagramService.fetchPosts(3);
    
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.length).toBeLessThanOrEqual(3);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('caption');
    expect(posts[0]).toHaveProperty('media_url');
    expect(posts[0]).toHaveProperty('username', 'psu.igsa');
  });

  it('should handle empty HTML gracefully', async () => {
    // Mock fetch to return empty HTML
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('<html><head></head><body></body></html>')
    } as Response);
    
    const posts = await clientInstagramService.fetchPosts(2);
    
    // Should fall back to mock data
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].id).toMatch(/^mock_/);
  });

  it('should parse JSON-LD data correctly', async () => {
    const mockHtml = `
      <html>
        <head>
          <script type="application/ld+json">
            {
              "@type": "SocialMediaPosting",
              "text": "Test Instagram post",
              "image": "https://example.com/image.jpg",
              "url": "https://instagram.com/p/test123/",
              "datePublished": "2023-01-01T00:00:00Z"
            }
          </script>
        </head>
        <body></body>
      </html>
    `;
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockHtml)
    } as Response);
    
    const posts = await clientInstagramService.fetchPosts(1);
    
    expect(posts).toBeDefined();
    expect(posts.length).toBe(1);
    expect(posts[0].caption).toBe('Test Instagram post');
    expect(posts[0].media_url).toBe('https://example.com/image.jpg');
    expect(posts[0].permalink).toBe('https://instagram.com/p/test123/');
  });
});