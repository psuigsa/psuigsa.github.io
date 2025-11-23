// Utility to parse frontmatter from markdown files
type BasicValue = string | boolean;
type ParsedFrontmatter = Record<string, BasicValue | string[]>;

interface EventFrontmatter {
  name?: string;
  description?: string;
  date?: string;
  location?: string;
  type?: string;
  image?: string;
  color?: string;
  time?: string;
  organizer?: string;
  contact?: string;
  phone?: string;
  capacity?: string;
  registration?: string;
  published?: boolean;
  details?: string;
  highlights?: string[];
  requirements?: string;
}

export interface Event extends EventFrontmatter {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  type: string;
  color: string;
  time: string;
  organizer: string;
  contact: string;
  details: string;
  highlights: string[];
}

const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/;

// Helper to fetch and parse markdown files
async function fetchMarkdownFile(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return response.text();
}

// Parse YAML frontmatter from markdown (handles lists and block scalars)
function parseFrontmatter(content: string): { data: ParsedFrontmatter; content: string } {
  const match = content.match(FRONTMATTER_REGEX);
  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatter, body] = match;
  const lines = frontmatter.split("\n");
  const data: ParsedFrontmatter = {};

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      i++;
      continue;
    }

    const keyMatch = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyMatch) {
      i++;
      continue;
    }

    const key = keyMatch[1];
    let value = keyMatch[2].trim();

    // Multiline blocks (| or >)
    if (value === "|" || value === ">") {
      i++;
      const blockLines: string[] = [];
      while (i < lines.length) {
        const blockLine = lines[i];
        // Stop when we reach a new top-level key
        if (/^[A-Za-z0-9_-]+:/.test(blockLine.trim())) {
          break;
        }
        blockLines.push(blockLine.replace(/^  /, ""));
        i++;
      }
      const combined = value === ">" ? blockLines.join(" ").trim() : blockLines.join("\n").trim();
      data[key] = combined;
      continue;
    }

    // Lists (lines starting with "- ")
    if (value === "" && i + 1 < lines.length && lines[i + 1].trim().startsWith("- ")) {
      const items: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        const item = lines[i].trim().replace(/^- /, "").replace(/^["']|["']$/g, "");
        items.push(item);
        i++;
      }
      data[key] = items;
      continue;
    }

    // Plain scalars
    value = value.replace(/^["']|["']$/g, "");
    if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else {
      data[key] = value;
    }
    i++;
  }

  return { data, content: body.trim() };
}

function parseDateValue(value?: string): number | null {
  if (!value) return null;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : timestamp;
}

function normalizeEvent(frontmatter: EventFrontmatter, body: string, id: string): Event {
  return {
    id,
    name: frontmatter.name ?? "Untitled Event",
    description: frontmatter.description ?? "",
    date: frontmatter.date ?? "",
    location: frontmatter.location ?? "",
    type: frontmatter.type ?? "Social",
    image: frontmatter.image,
    color: frontmatter.color ?? "from-igsa-blue to-igsa-green",
    time: frontmatter.time ?? "",
    organizer: frontmatter.organizer ?? "",
    contact: frontmatter.contact ?? "",
    phone: frontmatter.phone,
    capacity: frontmatter.capacity,
    registration: frontmatter.registration,
    published: frontmatter.published ?? true,
    details: frontmatter.details || body || frontmatter.description || "",
    highlights: Array.isArray(frontmatter.highlights) ? frontmatter.highlights : [],
    requirements: frontmatter.requirements,
  };
}

// Load all events from the content directory
export async function loadEvents(): Promise<Event[]> {
  try {
    const manifestResponse = await fetch("/content/events/manifest.json");
    if (!manifestResponse.ok) {
      throw new Error("Failed to load events manifest");
    }

    const eventFiles: string[] = await manifestResponse.json();
    const events: Event[] = [];

    for (const filename of eventFiles) {
      if (!filename.endsWith(".md")) continue;
      const url = `/content/events/${filename}`;

      try {
        const content = await fetchMarkdownFile(url);
        const { data, content: body } = parseFrontmatter(content);
        const event = normalizeEvent(data as EventFrontmatter, body, filename.replace(".md", ""));

        if (event.published !== false) {
          events.push(event);
        }
      } catch (error) {
        console.warn(`Failed to load event file ${filename}:`, error);
      }
    }

    // Sort newest-first when dates are parseable; otherwise keep original order
    return events.sort((a, b) => {
      const aDate = parseDateValue(a.date);
      const bDate = parseDateValue(b.date);

      if (aDate && bDate) return bDate - aDate;
      if (aDate) return -1;
      if (bDate) return 1;
      return 0;
    });
  } catch (error) {
    console.error("Failed to load events:", error);
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
