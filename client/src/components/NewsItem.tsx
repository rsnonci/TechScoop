import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, getCategoryColor } from "@/lib/api";
import type { News } from "@shared/schema";

interface NewsItemProps {
  article: News;
}

export default function NewsItem({ article }: NewsItemProps) {
  // Extract text content from HTML for preview
  const getTextPreview = (html: string, maxLength: number = 150): string => {
    const textContent = html.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <Card className="rounded-xl shadow-sm border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
      <div className="aspect-video overflow-hidden">
        <img
          src={article.cover_image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(article.category)}>
            {article.category}
          </Badge>
          <span className="text-slate-500 text-sm">
            {formatDate(article.published_at.toString())}
          </span>
        </div>
        
        <Link href={`/news/${article.slug}`}>
          <h3 className="text-xl font-semibold text-slate-800 mb-3 leading-tight hover:text-primary cursor-pointer transition-colors">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-slate-600 mb-4 line-clamp-3">
          {getTextPreview(article.content)}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">{article.source}</span>
          <Link href={`/news/${article.slug}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-blue-700 text-sm font-medium p-0">
              Read More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
