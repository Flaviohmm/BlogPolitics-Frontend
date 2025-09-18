import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, MessageCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  imageUrl?: string;
  commentsCount: number;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  excerpt,
  author,
  publishDate,
  category,
  imageUrl,
  commentsCount,
  featured = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Política Nacional": "bg-primary text-primary-foreground",
      Economia: "bg-political-green text-white",
      Eleições: "bg-political-red text-white",
      Análises: "bg-political-gold text-white",
      Internacional: "bg-secondary text-secondary-foreground",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-muted text-muted-foreground"
    );
  };

  return (
    <Card
      className={`group shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
        featured ? "border-primary" : ""
      }`}
    >
      {imageUrl && (
        <div className="relative overflow-hidden">
          <Link to={`/post/${id}`}>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">
                Destaque
              </Badge>
            </div>
          )}
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Badge className={getCategoryColor(category)}>{category}</Badge>
        </div>

        <Link to={`/post/${id}`}>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(publishDate)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{commentsCount}</span>
            </div>
            <Link
              to={`/post/${id}`}
              className="flex items-center text-primary hover:text-primary-hover transition-colors"
            >
              <span className="mr-1">Ler</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
