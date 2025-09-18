import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-section-alt border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 block">
              PolíticaBR
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Análise política independente e jornalismo de qualidade sobre o
              cenário brasileiro. Informação confiável para cidadãos
              conscientes.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/categorias"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/categoria/politica-nacional"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Política Nacional
                </Link>
              </li>
              <li>
                <Link
                  to="/categoria/economia"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Economia
                </Link>
              </li>
              <li>
                <Link
                  to="/categoria/eleicoes"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Eleições
                </Link>
              </li>
              <li>
                <Link
                  to="/categoria/analises"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Análises
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-foreground mb-2 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              Newsletter
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Receba as principais notícias e análises diretamente no seu email.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu email..."
                className="flex-1 px-3 py-2 border border-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary-hover transition-colors">
                Assinar
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 PolíticaBR. Todos os direitos reservados.
            <Link
              to="/privacidade"
              className="hover:text-primary transition-colors ml-1"
            >
              Política de Privacidade
            </Link>{" "}
            |
            <Link
              to="/termos"
              className="hover:text-primary transition-colors ml-1"
            >
              Termos de Serviço
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
