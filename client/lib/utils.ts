import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Parse YAML frontmatter from markdown
export function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: markdown };
  
  const frontmatterStr = match[1];
  const content = match[2];
  const frontmatter: Record<string, any> = {};
  
  frontmatterStr.split('\n').forEach(line => {
    if (!line.trim()) return;
    const [key, ...valueParts] = line.split(': ');
    let value: any = valueParts.join(': ').trim();
    
    // Parse values
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    if (!isNaN(Number(value)) && value !== '') value = Number(value);
    if (value.startsWith('[') && value.endsWith(']')) {
      value = JSON.parse(value);
    }
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    
    frontmatter[key.trim()] = value;
  });
  
  return { frontmatter, content };
}

// Load events from content folder
export async function loadEvents() {
  try {
    // Fetch all event markdown files
    const response = await fetch('/api/events');
    if (!response.ok) {
      console.warn('Could not load events from API, using fallback');
      return [];
    }
    
    const events = await response.json();
    return events;
  } catch (error) {
    console.warn('Error loading events:', error);
    return [];
  }
}
