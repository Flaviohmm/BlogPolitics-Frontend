import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, User, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <header className="bg-background border-b border-border stick top-0 z-50 backdrop-blur-sm bg-background\/95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors"
          >
            <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 inline-block text-transparent bg-clip-text">PolíticaBR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Início
            </Link>
            <Link
              to="/blog"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              to="/categorias"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Categorias
            </Link>
            <Link
              to="/sobre"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contato
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4" />
            </Button>

            {/* Theme toggle */}
            <div className="hidden sm:flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
              <Moon className="h-4 w-4" />
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={toggleMenu}
              >
                Início
              </Link>
              <Link
                to="/blog"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                to="/categorias"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={toggleMenu}
              >
                Categorias
              </Link>
              <Link
                to="/sobre"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={toggleMenu}
              >
                Sobre
              </Link>
              <Link
                to="/contato"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={toggleMenu}
              >
                Contato
              </Link>
              <div className="flex flex-col space-x-4 pt-4 border-t border-border">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                    Buscar
                  </Button>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                    Login
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tema</span>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={toggleTheme}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
