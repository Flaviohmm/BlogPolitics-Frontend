import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  MessageCircle,
  Tag as TagIcon,
  Loader2,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { usePostById } from "@/hooks/usePosts";
import PopularTags from "@/components/blog/PopularTags";
import DOMPurify from "dompurify";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = usePostById(id || "");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Política Nacional": "bg-blue-500",
      Economia: "bg-green-500",
      Eleições: "bg-purple-500",
      Internacional: "bg-orange-500",
      Análises: "bg-red-500",
    };
    return colors[category] || "bg-gray-500";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Post não encontrado
            </h1>
            <p className="text-muted-foreground mb-8">
              O artigo que você procura não existe ou foi removido.
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Sanitizar o conteúdo HTML
  const sanitizedContent = DOMPurify.sanitize(post.content || '', {
    ALLOWED_TAGS: ["p", "h2", "br", "strong"],
  });
  console.log(post.content);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Blog
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Featured Image */}
            {post.imageUrl && (
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Category Badge */}
            <div className="mb-4">
              <Link
                to={`/categoria/${post.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <Badge
                  className={`${getCategoryColor(
                    post.category
                  )} text-white hover:opacity-80`}
                >
                  {post.category}
                </Badge>
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{post.commentCount} comentários</span>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 font-medium">
              {post.excerpt}
            </p>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert
                prose-headings:text-foreground prose-headings:font-bold
                prose-p:text-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-foreground prose-ol:text-foreground"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <>
                <Separator className="my-8" />
                <div className="flex flex-wrap items-center gap-2">
                  <TagIcon className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`/tag/${tag}`}>
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        {tag.replace(/-/g, " ")}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-muted rounded-lg">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Sobre o autor
              </h3>
              <p className="text-muted-foreground">
                <strong>{post.author}</strong> é jornalista especializado em
                política brasileira e colaborador regular do PolíticaBR.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <PopularTags />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
