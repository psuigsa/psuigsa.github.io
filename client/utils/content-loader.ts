// Utility to parse and load content managed by the CMS
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
const REPO_SLUG = "psuigsa/psuigsa.github.io";
const REPO_BRANCH = "main";
const RAW_CONTENT_BASE = `https://raw.githubusercontent.com/${REPO_SLUG}/${REPO_BRANCH}/content`;
const LOCAL_CONTENT_BASE = "/content";

type ContentSource = {
  baseUrl: string;
  label: "github" | "local";
};

const SOURCE_ORDER: ContentSource[] = [
  { baseUrl: `${LOCAL_CONTENT_BASE}/events`, label: "local" },
  { baseUrl: `${RAW_CONTENT_BASE}/events`, label: "github" },
];

function getPreferredSources(): ContentSource[] {
  if (typeof window !== "undefined" && window.location.hostname.endsWith("github.io")) {
    // On GitHub Pages we prefer live GitHub content to avoid stale builds
    return [...SOURCE_ORDER].reverse();
  }
  return SOURCE_ORDER;
}

function withCacheBuster(url: string, cacheBuster: number) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}cb=${cacheBuster}`;
}

async function fetchJson<T>(url: string, cacheBuster: number) {
  const response = await fetch(withCacheBuster(url, cacheBuster), { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.json() as Promise<T>;
}

async function fetchText(url: string, cacheBuster: number) {
  const response = await fetch(withCacheBuster(url, cacheBuster), { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.text();
}

async function loadManifest(cacheBuster: number) {
  const sources = getPreferredSources();

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    try {
      const files = await fetchJson<string[]>(`${source.baseUrl}/manifest.json`, cacheBuster);
      if (Array.isArray(files)) {
        return { files, sourceIndex: i, sources };
      }
    } catch (error) {
      console.warn(`Failed to load manifest from ${source.label}:`, error);
    }
  }

  throw new Error("Unable to load events manifest from any source");
}

async function fetchEventFile(
  filename: string,
  sources: ContentSource[],
  primaryIndex: number,
  cacheBuster: number
) {
  const orderedSources = [
    sources[primaryIndex],
    ...sources.filter((_, idx) => idx !== primaryIndex),
  ];

  for (const source of orderedSources) {
    try {
      return await fetchText(`${source.baseUrl}/${filename}`, cacheBuster);
    } catch (error) {
      console.warn(`Failed to load ${filename} from ${source.label}:`, error);
    }
  }

  throw new Error(`Unable to load ${filename} from any source`);
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

// Load all events from the content directory or directly from GitHub when needed
export async function loadEvents(): Promise<Event[]> {
  try {
    const cacheBuster = Date.now();
    const { files, sourceIndex, sources } = await loadManifest(cacheBuster);
    const events: Event[] = [];

    for (const filename of files) {
      if (!filename.endsWith(".md")) continue;

      try {
        const markdown = await fetchEventFile(filename, sources, sourceIndex, cacheBuster);
        const { data, content: body } = parseFrontmatter(markdown);
        const event = normalizeEvent(data as EventFrontmatter, body, filename.replace(".md", ""));

        if (event.published !== false) {
          events.push(event);
        }
      } catch (error) {
        console.warn(`Failed to load event file ${filename}:`, error);
      }
    }

    return events.sort((a, b) => {
      const aDate = parseDateValue(a.date) ?? 0;
      const bDate = parseDateValue(b.date) ?? 0;
      return bDate - aDate;
    });
  } catch (error) {
    console.error("Failed to load events:", error);
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
