import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  publicDir: "public",
  plugins: [react(), expressPlugin(), copyContentPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  base: "/", // Since you're using the root domain (psuigsa.github.io)
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}

function copyContentPlugin(): Plugin {
  return {
    name: "copy-content-plugin",
    apply: "build", // Only apply during build
    closeBundle() {
      const contentSrc = path.resolve(__dirname, "content");
      const contentDest = path.resolve(__dirname, "dist/spa/content");
      
      // Copy content folder to build output recursively
      fs.cpSync(contentSrc, contentDest, { recursive: true });
      console.log("✓ Copied content folder to dist/spa/content");
    },
  };
}
