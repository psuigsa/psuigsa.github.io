import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { getInstagramPosts, refreshInstagramCache, testInstagramScraping } from "./api/instagram.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Instagram API routes
  app.get("/api/instagram/posts", getInstagramPosts);
  app.post("/api/instagram/refresh", refreshInstagramCache);
  app.get("/api/instagram/test", testInstagramScraping);

  return app;
}
