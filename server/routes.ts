import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertNewsSchema } from "@shared/schema.js";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to validate API key for protected routes
  const validateApiKey = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    const apiKey = process.env.API_KEY || process.env.NEWS_API_KEY || "default_api_key";
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: "Missing or invalid authorization header. Expected format: 'Bearer <API_KEY>'" 
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    if (token !== apiKey) {
      return res.status(401).json({ 
        message: "Invalid API key" 
      });
    }
    
    next();
  };

  // GET /api/news - Fetch all news articles
  app.get("/api/news", async (req, res) => {
    try {
      console.log("Fetching news articles...");
      const { category } = req.query;
      
      let articles;
      if (category && typeof category === 'string') {
        console.log("Fetching articles for category:", category);
        articles = await storage.getNewsByCategory(category);
      } else {
        console.log("Fetching all articles");
        articles = await storage.getAllNews();
      }
      
      console.log("Found articles:", articles.length);
      res.json(articles);
    } catch (error) {
      console.error("Detailed error fetching news:", error);
      
      // Enhanced error reporting
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const errorStack = error instanceof Error ? error.stack : "No stack trace";
      
      console.error("Error stack:", errorStack);
      
      res.status(500).json({ 
        message: "Failed to fetch news articles",
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorStack : undefined
      });
    }
  });

  // GET /api/news/:slug - Fetch specific article by slug
  app.get("/api/news/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      if (!slug) {
        return res.status(400).json({ 
          message: "Article slug is required" 
        });
      }
      
      const article = await storage.getNewsBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ 
          message: "Article not found" 
        });
      }
      
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ 
        message: "Failed to fetch article",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // POST /api/news - Add new article (requires API key)
  app.post("/api/news", validateApiKey, async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validationResult = insertNewsSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid article data",
          errors: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      const articleData = validationResult.data;
      
      // Check if slug already exists
      const existingArticle = await storage.getNewsBySlug(articleData.slug);
      if (existingArticle) {
        return res.status(409).json({ 
          message: "Article with this slug already exists" 
        });
      }
      
      // Create the article
      const newArticle = await storage.createNews(articleData);
      
      res.status(201).json({
        message: "Article created successfully",
        article: newArticle
      });
    } catch (error) {
      console.error("Error creating article:", error);
      res.status(500).json({ 
        message: "Failed to create article",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
