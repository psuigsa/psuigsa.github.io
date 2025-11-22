// Utility to parse frontmatter from markdown files
interface EventFrontmatter {
  name: string;
  description: string;
  date: string;
  location: string;
  type: string;
  image?: string;
  color: string;
  time: string;
  organizer: string;
  contact: string;
  phone?: string;
  capacity?: string;
  registration?: string;
  published: boolean;
  details: string;
  highlights: string[];
  requirements?: string;
}

export interface Event extends EventFrontmatter {
  id: string;
}

// Helper to fetch and parse markdown files
async function fetchMarkdownFile(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return response.text();
}

// Parse YAML frontmatter from markdown
function parseFrontmatter(content: string): { data: any; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatter, body] = match;
  const data: any = {};
  
  // Simple YAML parser for our needs
  const lines = frontmatter.split('\n');
  let currentKey = '';
  let inList = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Check for list items
    if (trimmed.startsWith('- ')) {
      if (inList && currentKey) {
        const value = trimmed.substring(2).replace(/^["'](.*)["']$/, '$1');
        data[currentKey].push(value);
      }
      continue;
    }
    
    // Check for key-value pairs
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      
      // Handle multiline strings
      if (value === '|') {
        currentKey = key;
        inList = false;
        data[key] = '';
        continue;
      }
      
      // Remove quotes
      value = value.replace(/^["'](.*)["']$/, '$1');
      
      // Check if it's a boolean
      if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else if (value === '') {
        // Check if next line starts with a dash (list)
        data[key] = [];
        currentKey = key;
        inList = true;
      } else {
        data[key] = value;
        inList = false;
      }
    } else if (currentKey && data[currentKey] === '') {
      // Continuation of multiline string
      data[currentKey] += (data[currentKey] ? '\n' : '') + trimmed;
    }
  }
  
  return { data, content: body };
}

// Load all events from the content directory
export async function loadEvents(): Promise<Event[]> {
  try {
    // In production (GitHub Pages), we'll fetch from the deployed content
    const eventFiles = [
      'campus-tour.md',
      'diwali-mela.md',
      // Add more event files here as they are created
    ];
    
    const events: Event[] = [];
    
    for (const filename of eventFiles) {
      try {
        const url = `/content/events/${filename}`;
        const content = await fetchMarkdownFile(url);
        const { data } = parseFrontmatter(content);
        
        if (data.published !== false) {
          events.push({
            ...data as EventFrontmatter,
            id: filename.replace('.md', ''),
          });
        }
      } catch (error) {
        console.warn(`Failed to load event file ${filename}:`, error);
      }
    }
    
    return events;
  } catch (error) {
    console.error('Failed to load events:', error);
    // Return empty array on error to prevent breaking the app
    return [];
  }
}

// Load homepage settings
export async function loadHomepageSettings() {
  try {
    const response = await fetch('/content/settings/homepage.json');
    if (!response.ok) throw new Error('Failed to load homepage settings');
    return await response.json();
  } catch (error) {
    console.error('Failed to load homepage settings:', error);
    return null;
  }
}

// Load contact settings
export async function loadContactSettings() {
  try {
    const response = await fetch('/content/settings/contact.json');
    if (!response.ok) throw new Error('Failed to load contact settings');
    return await response.json();
  } catch (error) {
    console.error('Failed to load contact settings:', error);
    return null;
  }
}

// Load about settings
export async function loadAboutSettings() {
  try {
    const response = await fetch('/content/settings/about.json');
    if (!response.ok) throw new Error('Failed to load about settings');
    return await response.json();
  } catch (error) {
    console.error('Failed to load about settings:', error);
    return null;
  }
}
