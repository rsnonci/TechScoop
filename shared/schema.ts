import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// News articles table schema
export const news = pgTable("news", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  cover_image: text("cover_image"),
  category: varchar("category", { length: 100 }).notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  published_at: timestamp("published_at").notNull().default(sql`now()`),
  created_at: timestamp("created_at").notNull().default(sql`now()`),
  updated_at: timestamp("updated_at").notNull().default(sql`now()`),
});

// Insert schema for creating new articles (excludes auto-generated fields)
export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  created_at: true,
  updated_at: true,
}).extend({
  published_at: z.union([
    z.string().transform((str) => new Date(str)),
    z.date()
  ]).optional(),
});

// Types for TypeScript
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

// Keep the existing user schema for completeness
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
