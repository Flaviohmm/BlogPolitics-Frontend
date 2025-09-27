import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  ArrowLeft,
  Download,
  Calendar,
  Globe,
  Heart,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState<string>("30d");

  // Mock data - será substituído por dados reais
  const analytics = {
    overview: {
      totalViews: 45230,
      uniqueVisitors: 23140,
      pageViews: 67890,
      avgSessionDuration: "3:24",
      bounceRate: "34.2%",
    },
    topPosts: [
      {
        id: 1,
        title: "Análise da Reforma Política Atual",
        views: 5420,
        comments: 89,
        shares: 234,
        engagement: 8.2,
      },
      {
        id: 2,
        title: "Impactos Econômicos das Eleições",
        views: 4180,
        comments: 67,
        shares: 189,
        engagement: 7.1,
      },
      {
        id: 3,
        title: "Campanha Eleitoral 2026",
        views: 3890,
        comments: 156,
        shares: 278,
        engagement: 9.5,
      },
      {
        id: 4,
        title: "Reforma Tributária Explicada",
        views: 3240,
        comments: 45,
        shares: 123,
        engagement: 5.8,
      },
    ],
    demographics: {
      ageGroups: [
        { range: "18-24", percentage: 15 },
        { range: "25-34", percentage: 28 },
        { range: "35-44", percentage: 23 },
        { range: "45-54", percentage: 20 },
        { range: "55+", percentage: 14 },
      ],
      topCities: [
        { city: "São Paulo", visitors: 8420 },
        { city: "Rio de Janeiro", visitors: 5230 },
        { city: "Brasília", visitors: 3890 },
        { city: "Belo Horizonte", visitors: 2340 },
        { city: "Salvador", visitors: 1890 },
      ],
    },
    traffic: {
      sources: [
        { source: "Busca Orgânica", percentage: 42, visitors: 9726 },
        { source: "Redes Sociais", percentage: 28, visitors: 6479 },
        { source: "Acesso Direto", percentage: 18, visitors: 4165 },
        { source: "Referência", percentage: 12, visitors: 2777 },
      ],
    },
  };

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            <span
              className={trend === "up" ? "text-success" : "text-destructive"}
            >
              {trend === "up" ? "▲" : "▼"} {change}
            </span>{" "}
            vs período anterior
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground">
                Acompanhe o desempenho do seu blog
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Últimos 30 dias
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <StatCard
            title="Visualizações"
            value={analytics.overview.totalViews.toLocaleString()}
            change="+12.5%"
            icon={Eye}
            trend="up"
          />
          <StatCard
            title="Visitantes Únicos"
            value={analytics.overview.uniqueVisitors.toLocaleString()}
            change="+8.3%"
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Páginas Vistas"
            value={analytics.overview.pageViews.toLocaleString()}
            change="+10.1%"
            icon={Globe}
            trend="up"
          />
          <StatCard
            title="Duração Média"
            value={analytics.overview.avgSessionDuration}
            change="+0:34"
            icon={BarChart3}
            trend="up"
          />
          <StatCard
            title="Taxa de Rejeição"
            value={analytics.overview.bounceRate}
            change="-2.4%"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts Populares</TabsTrigger>
            <TabsTrigger value="traffic">Fontes de Tráfego</TabsTrigger>
            <TabsTrigger value="demographics">Demografia</TabsTrigger>
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          </TabsList>

          {/* Top Posts */}
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Posts Mais Populares</CardTitle>
                <CardDescription>
                  Rankings baseados em visualizações e engajamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {post.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Eye className="mr-1 h-3 w-3" />
                              {post.views.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="mr-1 h-3 w-3" />
                              {post.comments}
                            </span>
                            <span className="flex items-center">
                              <Share2 className="mr-1 h-3 w-3" />
                              {post.shares}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={post.engagement > 8 ? "default" : "secondary"}
                      >
                        {post.engagement}% Engajamento
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Traffic Sources */}
          <TabsContent value="traffic">
            <Card>
              <CardHeader>
                <CardTitle>Fontes de Tráfego</CardTitle>
                <CardDescription>De onde vêm seus visitantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.traffic.sources.map((source) => (
                    <div
                      key={source.source}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-foreground">
                          {source.source}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {source.visitors.toLocaleString()} visitantes
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {source.percentage}%
                        </div>
                        <div className="w-20 bg-muted rounded-full h-2 mt-1">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demographics */}
          <TabsContent value="demographics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Faixa Etária</CardTitle>
                  <CardDescription>
                    Distribuição por idade dos leitores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.demographics.ageGroups.map((group) => (
                      <div
                        key={group.range}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {group.range} anos
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-muted rounded-full h-2 mr-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${group.percentage * 2}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {group.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Principais Cidades</CardTitle>
                  <CardDescription>Cidades com mais visitantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.demographics.topCities.map((city, index) => (
                      <div
                        key={city.city}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-primary">
                            #{index + 1}
                          </span>
                          <span className="text-sm font-medium">
                            {city.city}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {city.visitors.toLocaleString()} visitantes
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement */}
          <TabsContent value="engagement">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5" />
                    Curtidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8.420</div>
                  <p className="text-sm text-muted-foreground">+23% este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Share2 className="mr-2 h-5 w-5" />
                    Compartilhamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1.254</div>
                  <p className="text-sm text-muted-foreground">+18% este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Comentários
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">892</div>
                  <p className="text-sm text-muted-foreground">+31% este mês</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
