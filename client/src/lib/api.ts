import { apiRequest } from "./queryClient";
import type { News, InsertNews } from "@shared/schema";

// API functions for news operations
export const newsApi = {
  // Fetch all news articles or filter by category
  getAll: async (category?: string): Promise<News[]> => {
    const url = category ? `/api/news?category=${category}` : '/api/news';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
    return response.json();
  },

  // Fetch specific article by slug
  getBySlug: async (slug: string): Promise<News> => {
    const response = await fetch(`/api/news/${slug}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Article not found');
      }
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }
    return response.json();
  },

  // Create new article (requires API key)
  create: async (article: InsertNews, apiKey: string): Promise<News> => {
    const response = await fetch('/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(article)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || 'Failed to create article');
    }
    
    const result = await response.json();
    return result.article;
  }
};

// Helper function to format dates
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

// Helper function to get category color
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'AI': 'bg-blue-100 text-blue-600',
    'Startups': 'bg-green-100 text-green-600',
    'Hardware': 'bg-purple-100 text-purple-600',
    'Security': 'bg-red-100 text-red-600',
    'Software': 'bg-yellow-100 text-yellow-600',
    'Research': 'bg-indigo-100 text-indigo-600',
    'Green Tech': 'bg-emerald-100 text-emerald-600',
  };
  
  return colors[category] || 'bg-gray-100 text-gray-600';
};
