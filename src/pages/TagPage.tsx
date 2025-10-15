import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import PopularTags from "@/components/blog/PopularTags";
import { useTags } from "@/hooks/useTags";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock posts relacionados à tag
const getPostsByTag = (tagSlug: string) => {
  const allPosts = [
    {
      id: "1",
      title: "Reforma Política: Principais Propostas em Debate",
      excerpt:
        "Análise detalhada das principais propostas de reforma política que estão sendo discutidas no Congresso Nacional.",
      author: "Carlos Silva",
      publishDate: "2024-03-15",
      category: "Política Nacional",
      imageUrl: "/src/assets/political-reform.jpg",
      commentsCount: 24,
      tags: ["reforma-politica", "congresso-nacional"],
    },
    {
      id: "2",
      title: "Impactos da Nova Política Econômica",
      excerpt:
        "Como as recentes mudanças na política econômica afetam o dia a dia dos brasileiros.",
      author: "Maria Santos",
      publishDate: "2024-03-14",
      category: "Economia",
      imageUrl: "/src/assets/economy-analysis.jpg",
      commentsCount: 18,
      tags: ["economia", "reforma-tributaria"],
    },
    {
      id: "3",
      title: "Eleições 2024: Panorama das Campanhas",
      excerpt:
        "Um olhar sobre as estratégias de campanha dos principais candidatos.",
      author: "João Oliveira",
      publishDate: "2024-03-13",
      category: "Eleições",
      imageUrl: "/src/assets/elections-campaign.jpg",
      commentsCount: 32,
      tags: ["eleicoes-2024", "reforma-politica"],
    },
  ];

  return allPosts.filter((post) => post.tags?.includes(tagSlug));
};

const TagPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tags, isLoading } = useTags();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const posts = slug ? getPostsByTag(slug) : [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tags) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Tag não encontrada</h1>
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb & Back */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tag Header */}
            {tags?.map((tag) => (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="default" className="text-lg px-4 py-2">
                    {tag.name}
                  </Badge>
                  <span className="text-muted-foreground">
                    {tag.postCount} {tag.postCount === 1 ? "artigo" : "artigos"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Artigos sobre {tag.name}
                </h1>
              </div>
            ))}

            {/* Posts Grid */}
            {currentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {currentPosts.map((post) => (
                    <PostCard key={post.id} {...post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index + 1}>
                          <PaginationLink
                            onClick={() => setCurrentPage(index + 1)}
                            isActive={currentPage === index + 1}
                            className="cursor-pointer"
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum artigo encontrado para esta tag.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PopularTags />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TagPage;
