import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsDetail from "@/components/NewsDetail";
import { newsApi } from "@/lib/api";
import type { News } from "@shared/schema";

export default function NewsDetailPage() {
  const [, params] = useRoute("/news/:slug");
  const [, setLocation] = useLocation();
  
  const slug = params?.slug;

  const {
    data: article,
    isLoading,
    error,
  } = useQuery<News>({
    queryKey: ["/api/news", slug],
    queryFn: () => newsApi.getBySlug(slug!),
    enabled: !!slug,
  });

  const handleBack = () => {
    setLocation("/");
  };

  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              Invalid article URL
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-6 w-32 mb-6" />
          
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Skeleton className="h-6 w-16 mr-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-12 w-full mb-6" />
            <div className="flex items-center mb-8">
              <Skeleton className="h-12 w-12 rounded-full mr-4" />
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          <Skeleton className="aspect-video w-full mb-8" />
          
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error instanceof Error ? error.message : "Article not found"}
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <NewsDetail article={article} onBack={handleBack} />
      </main>
      <Footer />
    </div>
  );
}
