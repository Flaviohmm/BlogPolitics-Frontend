import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-hover text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
            <span className="text-sm font-medium">
              🇧🇷 Jornalismo Político Independente
            </span>
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Análise Política
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-political-gold via-white to-political-gold">
              Independente
            </span>
          </h1>

          <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Cobertura aprofundada do cenário político brasileiro com análise
            especializadas, dados confiáveis e perspectivas equilibradas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link to="/blog" className="flex items-center">
                Explore o Blog
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Play className="w-5 h-5 mr-2" />
              Assista ao Vídeo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">
                Artigos Publicados
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">15K+</div>
              <div className="text-primary-foreground/80">Leitores Mensais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80">
                Precisão de Dados
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
