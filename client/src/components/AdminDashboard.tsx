import { useQuery } from "@tanstack/react-query";
import { Newspaper, Eye, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDate, getCategoryColor } from "@/lib/api";
import { newsApi } from "@/lib/api";
import type { News } from "@shared/schema";

export default function AdminDashboard() {
  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery<News[]>({
    queryKey: ["/api/news", "admin"],
    queryFn: () => newsApi.getAll(),
  });

  // Calculate stats
  const totalArticles = articles.length;
  const thisMonth = articles.filter(article => {
    const articleDate = new Date(article.published_at);
    const now = new Date();
    return articleDate.getMonth() === now.getMonth() && 
           articleDate.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    {
      title: "Total Articles",
      value: totalArticles.toString(),
      icon: Newspaper,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Views",
      value: "1.2M",
      icon: Eye,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "This Month",
      value: thisMonth.toString(),
      icon: Calendar,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Avg Views",
      value: "4.9K",
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="p-6">
              <Skeleton className="h-12 w-12 mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))}
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">
            Failed to load dashboard data: {error instanceof Error ? error.message : "Unknown error"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">Manage and monitor your tech news articles</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 border-slate-200">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Articles Table */}
      <Card className="border-slate-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Recent Articles</h2>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Articles</h3>
              <p className="text-slate-600">No articles have been published yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {articles.slice(0, 10).map((article) => (
                    <tr key={article.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-slate-200 rounded-lg mr-4 flex-shrink-0">
                            {article.cover_image ? (
                              <img
                                src={article.cover_image}
                                alt=""
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-300 rounded-lg" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-slate-800 truncate">
                              {article.title}
                            </div>
                            <div className="text-sm text-slate-500 truncate">
                              {article.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {article.source}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(article.published_at.toString())}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-100 text-green-800">
                          Published
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
