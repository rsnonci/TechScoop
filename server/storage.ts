import { news, users, type News, type InsertNews, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

// Updated interface to include news operations
export interface IStorage {
  // User operations (keep existing)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // News operations
  getAllNews(): Promise<News[]>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  createNews(article: InsertNews): Promise<News>;
  getNewsByCategory(category: string): Promise<News[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // News operations
  async getAllNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(desc(news.published_at));
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    const [article] = await db.select().from(news).where(eq(news.slug, slug));
    return article || undefined;
  }

  async createNews(article: InsertNews): Promise<News> {
    const [newArticle] = await db
      .insert(news)
      .values(article)
      .returning();
    return newArticle;
  }

  async getNewsByCategory(category: string): Promise<News[]> {
    return await db.select().from(news).where(eq(news.category, category)).orderBy(desc(news.published_at));
  }
}

export const storage = new DatabaseStorage();
