import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data - substituir com dados reais da API
const mockPosts = [
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
    featured: true,
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
  },
  {
    id: "4",
    title: "Análise: Política Externa Brasileira",
    excerpt:
      "Avaliação dos principais desafios e oportunidades da política externa do Brasil.",
    author: "Ana Costa",
    publishDate: "2024-03-12",
    category: "Internacional",
    imageUrl: "/src/assets/hero-political.jpg",
    commentsCount: 15,
  },
  {
    id: "5",
    title: "Debate sobre Reforma Tributária Avança",
    excerpt: "Entenda os principais pontos da reforma tributária em discussão.",
    author: "Pedro Martins",
    publishDate: "2024-03-11",
    category: "Economia",
    imageUrl: "/src/assets/economy-analysis.jpg",
    commentsCount: 28,
  },
  {
    id: "6",
    title: "Partidos se Mobilizam para Eleições",
    excerpt: "As estratégias dos partidos políticos para as próximas eleições.",
    author: "Lucia Fernandes",
    publishDate: "2024-03-10",
    category: "Eleições",
    imageUrl: "/src/assets/elections-campaign.jpg",
    commentsCount: 21,
  },
];

const categories = [
  "Todas",
  "Política Nacional",
  "Economia",
  "Eleições",
  "Análises",
  "Internacional",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filtrar posts
  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Todas" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Paginação
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog PolíticaBR
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Análises, notícias e opiniões sobre a política brasileira
          </p>
        </section>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar artigos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Posts Grid */}
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum artigo encontrado com os filtros selecionados.
            </p>
          </div>
        )}

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
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
