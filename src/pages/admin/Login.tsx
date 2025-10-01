import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Chamada para o backend Java
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Verificar se o usuário tem permissão de admin
        if (data.user.role !== "ADMIN" && data.user.role !== "AUTHOR") {
          setError(
            "Você não tem permissão para acessar o painel administrativo."
          );
          return;
        }

        // Armazenar dados de autenticação
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        localStorage.setItem("tokenExpiry", data.expiresAt);

        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${data.user.firstName}`,
        });

        // Redirecionar para dashboard
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500);
      } else {
        // Tratar diferentes tipos de erro
        if (response.status === 401) {
          setError("Email ou senha incorretos.");
        } else if (response.status === 403) {
          setError("Sua conta está desativada. Entre em contato com o administrador.");
        } else if (response.status === 429) {
          setError("Muitas tentativas de login. Tente novamente mais tarde.");
        } else {
          setError(data.message || "Erro ao realizar login. Tente novamente.");
        }
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Erro ao conectar com o servidor. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">
              Login Administrativo
            </CardTitle>
            <CardDescription className="text-center">
              Acesse o painel administrativo do blog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="animate-in fade-in-0">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Acesso restrito a administradores e autores autorizados
              </p>
              <p className="text-xs text-muted-foreground">
                Protegido por autenticação JWT
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
