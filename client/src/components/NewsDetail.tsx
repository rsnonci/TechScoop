import { ArrowLeft, ThumbsUp, Share, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, getCategoryColor } from "@/lib/api";
import type { News } from "@shared/schema";

interface NewsDetailProps {
  article: News;
  onBack: () => void;
}

export default function NewsDetail({ article, onBack }: NewsDetailProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.replace(/<[^>]*>/g, '').substring(0, 200),
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 text-slate-600 hover:text-slate-800 flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Articles
      </Button>

      <article className="bg-white">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Badge className={getCategoryColor(article.category)}>
              {article.category}
            </Badge>
            <span className="text-slate-500 text-sm ml-4">
              {formatDate(article.published_at)}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-slate-600 font-medium text-sm">TE</span>
            </div>
            <div className="ml-4">
              <p className="font-medium text-slate-800">Tech Editor</p>
              <p className="text-slate-500">{article.source}</p>
            </div>
          </div>
        </div>

        {article.cover_image && (
          <div className="mb-8">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div 
            className="text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:text-primary"
                onClick={handleShare}
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <Clock className="h-4 w-4" />
              <span>{estimateReadingTime(article.content)} min read</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
