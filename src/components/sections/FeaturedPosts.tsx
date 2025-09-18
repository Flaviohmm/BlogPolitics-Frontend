import React from "react";
import { TrendingUp } from "lucide-react";
import PostCard from "@/components/blog/PostCard";
import economyImage from "@/assets/economy-analysis.jpg";
import electionsImage from "@/assets/elections-campaign.jpg";
import reformImage from "@/assets/political-reform.jpg";

const FeaturedPosts: React.FC = () => {
  // Mock data - in a real app this would come from an API
  const featuredPosts = [
    {
      id: "1",
      title: "Análise: Os Desafios da Política Econômica Brasileira em 2025",
      excerpt:
        "Uma análise aprofundada sobre as principais medidas econômicas adotadas pelo governo e seus impactos na economia nacional. Exploramos os indicadores-chave e as perspectivas para os próximos meses.",
      author: "Maria Silva",
      publishDate: "2025-01-15",
      category: "Economia",
      commentsCount: 24,
      imageUrl: economyImage,
      featured: true,
    },
    {
      id: "2",
      title: "Reforma Tributária: O Que Muda Para os Brasileiros",
      excerpt:
        "Detalhamento das principais mudanças propostas na reforma tributária e como elas afetarão diferentes setores da economia e a vida dos cidadãos brasileiros.",
      author: "João Santos",
      publishDate: "2025-01-14",
      category: "Política Nacional",
      commentsCount: 18,
      imageUrl: reformImage,
      featured: true,
    },
    {
      id: "3",
      title: "Eleições 2026: Panorama dos Principais Candidatos",
      excerpt:
        "Perfil completo dos principais candidatos às eleições de 2026, suas propostas e estratégias de campanha nos principais estados do país.",
      author: "Ana Costa",
      publishDate: "2025-09-17",
      category: "Eleições",
      commentsCount: 32,
      imageUrl: electionsImage,
      featured: true,
    },
  ];

  return (
    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Em Destaque</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Destaques da Semana
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Os artigos mais relevantes e impactantes sobre o cenário político
            brasileiro, selecionados especialmente para você.
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <div
              key={post.id}
              className={index === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors font-medium">
            Ver Todos os Artigos
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
