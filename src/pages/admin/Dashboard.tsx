import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  MessageCircle,
  TrendingUp,
  Eye,
  Plus,
  Edit,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  // Mock data - será substituído por dados reais do backend
  const stats = {
    totalPosts: 156,
    totalViews: 45230,
    totalComments: 892,
    totalUsers: 3420,
    postsThisMonth: 12,
    viewsThisMonth: 8340,
    commentsThisMonth: 156,
    usersThisMonth: 234,
  };

  const recentPosts = [
    {
      id: 1,
      title: "Análise da Reforma Política Atual",
      status: "published",
      views: 1205,
      comments: 23,
      publishedAt: "2025-01-15",
    },
    {
      id: 2,
      title: "Impactos Econômicos das Eleições",
      status: "draft",
      views: 0,
      comments: 0,
      publishedAt: null,
    },
    {
      id: 3,
      title: "Campanha Eleitoral 2026",
      status: "published",
      views: 856,
      comments: 31,
      publishedAt: "2025-01-12",
    },
  ];

  const StatCard = ({ title, value, change, icon: Icon, description }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">
          <span className={change >= 0 ? "text-success" : "text-destructive"}>
            {change >= 0 ? "+" : ""}
            {change}
          </span>{" "}
          {description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard Administrativo
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seu blog político de forma eficiente
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/admin/post-editor">
                <Plus className="mr-2 h-4 w-4" />
                Novo Post
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total de Posts"
            value={stats.totalPosts}
            change={stats.postsThisMonth}
            icon={FileText}
            description="este mês"
          />
          <StatCard
            title="Visualizações"
            value={stats.totalViews}
            change={stats.viewsThisMonth}
            icon={Eye}
            description="este mês"
          />
          <StatCard
            title="Comentários"
            value={stats.totalComments}
            change={stats.commentsThisMonth}
            icon={MessageCircle}
            description="este mês"
          />
          <StatCard
            title="Usuários"
            value={stats.totalUsers}
            change={stats.usersThisMonth}
            icon={Users}
            description="este mês"
          />
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Recentes</CardTitle>
            <CardDescription>
              Gerencie e monitore os posts mais recentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium text-foreground">
                        {post.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant={
                            post.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {post.status === "published"
                            ? "Publicado"
                            : "Rascunho"}
                        </Badge>
                        {post.status === "published" && (
                          <>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {post.views} visualizações
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {post.comments} comentários
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Ver Todos os Posts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
