import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá nossas newsletters no seu email informado.",
      });
      setEmail("");
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-primary to-primary-hover">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
              <CheckCircle className="w-16 h-16 text-primary-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                Inscrição Confirmada!
              </h3>
              <p className="text-primary-foreground/80">
                Obrigado por se inscrever. Você receberá nossas melhores
                análises políticas diretamente no seu email.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary-hover">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
            {/* Icon */}
            <div className="bg-primary-foreground/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>

            {/* Content */}
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
              Fique por Dentro da Política
            </h3>

            <p className="text-primary-foreground/80 mb-8 text-lg">
              Receba semanalmente as principais análises, notícias e insights
              sobre o cenário político brasileiro.
              <strong className="text-primary-foreground"> Gratuito</strong> e
              sem spam.
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email..."
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-primary placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                required
              />
              <Button
                type="submit"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-6 py-3"
              >
                Assinar Grátis
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-primary-foreground/60">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Sem spam</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Privacidade garantida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
