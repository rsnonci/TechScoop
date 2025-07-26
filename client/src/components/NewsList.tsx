import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import NewsItem from "./NewsItem";
import { newsApi } from "@/lib/api";
import type { News } from "@shared/schema";

interface NewsListProps {
  selectedCategory: string;
}

export default function NewsList({ selectedCategory }: NewsListProps) {
  const [displayCount, setDisplayCount] = useState(6);

  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery<News[]>({
    queryKey: ["/api/news", selectedCategory || "all"],
    queryFn: () => newsApi.getAll(selectedCategory || undefined),
  });

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12">
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">
            Failed to load articles: {error instanceof Error ? error.message : "Unknown error"}
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="mb-12">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No Articles Found</h3>
          <p className="text-slate-600">
            {selectedCategory 
              ? `No articles found in the ${selectedCategory} category.`
              : "No articles have been published yet."
            }
          </p>
        </div>
      </section>
    );
  }

  const displayedArticles = articles.slice(0, displayCount);
  const hasMore = articles.length > displayCount;

  return (
    <section className="mb-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedArticles.map((article) => (
          <NewsItem key={article.id} article={article} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setDisplayCount(prev => prev + 6)}
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
          >
            Load More Articles
          </Button>
        </div>
      )}
    </section>
  );
}
