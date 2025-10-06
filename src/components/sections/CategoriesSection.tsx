import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  TrendingUp,
  Vote,
  BarChart3,
  Globe,
  CircuitBoard,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCategories } from "@/hooks/useCategories";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mapeamento de ícones
const iconMap: Record<string, React.ElementType> = {
  Building2,
  TrendingUp,
  Vote,
  BarChart3,
  Globe,
  CircuitBoard,
};

const CategoriesSection: React.FC = () => {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              Carregando categorias...
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Alert variant="destructive">
            <AlertDescription>
              Erro ao carregar categorias. Tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

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
          {categories?.map((category) => {
            const IconComponent = iconMap[category.icon] || Building2;
            return (
              <Link
                key={category.slug}
                to={`/categoria/${category.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      style={{
                        backgroundColor: `${category.color}20`,
                      }}
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
                        {category.postCount || 0} artigos
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
