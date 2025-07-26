import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import NewsList from "@/components/NewsList";
import { newsApi } from "@/lib/api";
import type { News } from "@shared/schema";

export default function Home() {
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Parse category from URL query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    setSelectedCategory(categoryParam || "");
  }, [location]);

  // Fetch all articles for hero section (we'll show the latest as featured)
  const { data: allArticles = [] } = useQuery<News[]>({
    queryKey: ["/api/news", "all"],
    queryFn: () => newsApi.getAll(),
  });

  const featuredArticle = allArticles[0]; // Most recent article as featured

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL without page reload using Wouter's setLocation
    const newUrl = category ? `/?category=${category}` : "/";
    window.history.replaceState({}, "", newUrl);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Show featured article if available */}
        {featuredArticle && !selectedCategory && (
          <HeroSection featuredArticle={featuredArticle} />
        )}

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* News List */}
        <NewsList selectedCategory={selectedCategory} />
      </main>

      <Footer />
    </div>
  );
}
