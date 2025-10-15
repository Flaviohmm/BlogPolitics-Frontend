import React from "react";
import { Link } from "react-router-dom";
import { Tag as TagIcon, TrendingUp, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTags } from "@/hooks/useTags";

const PopularTags: React.FC = () => {
  const { tags, isLoading } = useTags();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="w-5 h-5" />
            Tags Populares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Tags Populares
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Link key={tag.id} to={`/tag/${tag.slug}`}>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag.name}
                {tag.postCount > 0 && (
                  <span className="ml-1 text-xs opacity-70">
                    ({tag.postCount})
                  </span>
                )}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTags;