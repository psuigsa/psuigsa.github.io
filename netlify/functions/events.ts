import { Handler } from "@netlify/functions";
import * as fs from "fs";
import * as path from "path";

interface Event {
  id: string;
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
  details: string;
  highlights: string[];
  requirements?: string;
  published?: boolean;
}

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: markdown };

  const frontmatterStr = match[1];
  const content = match[2];
  const frontmatter: Record<string, any> = {};

  frontmatterStr.split("\n").forEach((line) => {
    if (!line.trim()) return;
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    let value: any = line.substring(colonIndex + 1).trim();

    // Parse YAML values
    if (value === "true") value = true;
    if (value === "false") value = false;
    if (!isNaN(Number(value)) && value !== "") value = Number(value);
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        value = JSON.parse(value);
      } catch {
        // Keep as string if JSON parse fails
      }
    }
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  });

  return { frontmatter, content };
}

export const handler: Handler = async () => {
  try {
    const eventsDir = path.join(process.cwd(), "content", "events");

    // Check if directory exists
    if (!fs.existsSync(eventsDir)) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
        headers: { "Content-Type": "application/json" },
      };
    }

    const files = fs.readdirSync(eventsDir).filter((f) => f.endsWith(".md"));

    const events: Event[] = files
      .map((file) => {
        try {
          const filePath = path.join(eventsDir, file);
          const markdown = fs.readFileSync(filePath, "utf-8");
          const { frontmatter, content } = parseFrontmatter(markdown);

          return {
            id: file.replace(".md", ""),
            details: content,
            ...frontmatter,
          } as Event;
        } catch (error) {
          console.error(`Error reading ${file}:`, error);
          return null;
        }
      })
      .filter((event): event is Event => event !== null && event.published !== false)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      statusCode: 200,
      body: JSON.stringify(events),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error loading events:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load events" }),
      headers: { "Content-Type": "application/json" },
    };
  }
};
