import { Link } from "wouter";
import { User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, getCategoryColor } from "@/lib/api";
import type { News } from "@shared/schema";

interface HeroSectionProps {
  featuredArticle: News;
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="mb-12">
      <Card className="rounded-2xl shadow-sm overflow-hidden border-slate-200">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <img
              src={featuredArticle.cover_image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"}
              alt={featuredArticle.title}
              className="w-full h-64 lg:h-full object-cover"
            />
          </div>
          <CardContent className="lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center mb-4">
              <Badge className={getCategoryColor(featuredArticle.category)}>
                {featuredArticle.category}
              </Badge>
              <span className="text-slate-500 text-sm ml-4">
                {formatDate(featuredArticle.published_at.toString())}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4 leading-tight">
              {featuredArticle.title}
            </h2>
            <div
              className="text-slate-600 text-lg mb-6 leading-relaxed line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: featuredArticle.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
              }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-slate-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-800">Tech Editor</p>
                  <p className="text-sm text-slate-500">{featuredArticle.source}</p>
                </div>
              </div>
              <Link href={`/news/${featuredArticle.slug}`}>
                <Button variant="ghost" className="text-primary hover:text-blue-700 font-medium">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
