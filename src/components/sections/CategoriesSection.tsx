import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  TrendingUp,
  Vote,
  BarChart3,
  Globe,
  Users,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CategoriesSection: React.FC = () => {
  const categories = [
    {
      name: "Política Nacional",
      description:
        "Acompanhe as principais decisões e debates do cenário político brasileiro",
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
      count: 145,
      slug: "politica-nacional",
    },
    {
      name: "Economia",
      description:
        "Análises econômicas e impactos das políticas fiscais no país",
      icon: TrendingUp,
      color: "text-political-green",
      bgColor: "bg-green-100",
      count: 89,
      slug: "economia",
    },
    {
      name: "Eleições",
      description: "Cobertura completa dos processos eleitorais e campanhas",
      icon: Vote,
      color: "text-political-red",
      bgColor: "bg-red-100",
      count: 67,
      slug: "eleicoes",
    },
    {
      name: "Pesquisas",
      description: "Dados e estatísticas sobre opinião pública e tendências",
      icon: BarChart3,
      color: "text-political-gold",
      bgColor: "bg-yellow-100",
      count: 43,
      slug: "pesquisas",
    },
    {
      name: "Internacional",
      description: "Política externa e relações diplomáticas do Brasil",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      count: 32,
      slug: "internacional",
    },
    {
      name: "Sociedade",
      description: "Impactos sociais das políticas públicas na população",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      count: 56,
      slug: "sociedade",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Explore por Categoria
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encontre conteúdo especializado sobre os temas que mais interessam
            você
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.slug}
                to={`/categoria/${category.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className={`w-6 h-6 ${category.color}`} />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.count} artigos
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* View All Categories */}
        <div className="text-center">
          <Link
            to="/categorias"
            className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
          >
            Ver Todas as Categorias
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
