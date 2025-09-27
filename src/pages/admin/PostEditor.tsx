import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Save,
  Eye,
  ArrowLeft,
  Image,
  Tag,
  Calendar,
  FileText,
  Globe,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

const PostEditor: React.FC = () => {
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    imageUrl: "",
    published: false,
    featured: false,
  });

  const categories = [
    "Política Nacional",
    "Economia",
    "Eleições",
    "Reformas",
    "Internacional",
    "Análise",
  ];

  const handleSave = () => {
    // Aqui será implementada a lógica de salvamento
    console.log("Salvando post:", post);
  };

  const handlePublish = () => {
    setPost({ ...post, published: true });
    // Aqui será implementada a lógica de publicação
    console.log("Publicando post:", post);
  };

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
              <h1 className="text-3xl font-bold text-foreground">
                Editor de Posts
              </h1>
              <p className="text-muted-foreground">
                Crie e edite posts do seu blog político
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button onClick={handlePublish}>
              <Globe className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Conteúdo Principal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título do Post</Label>
                  <Input
                    id="title"
                    placeholder="Digite o título do seu post..."
                    value={post.title}
                    onChange={(e) =>
                      setPost({ ...post, title: e.target.value })
                    }
                    className="text-lg font-medium"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Escreva um resumo atrativo do seu post..."
                    value={post.excerpt}
                    onChange={(e) =>
                      setPost({ ...post, excerpt: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    placeholder="Escreva o conteúdo completo do seu post..."
                    value={post.content}
                    onChange={(e) =>
                      setPost({ ...post, content: e.target.value })
                    }
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Suporte a Markdown. Use **negrito**, *itálico*, e
                    [links](url).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="mr-2 h-5 w-5" />
                  Imagem Destacada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="URL da imagem ou faça upload..."
                    value={post.imageUrl}
                    onChange={(e) =>
                      setPost({ ...post, imageUrl: e.target.value })
                    }
                  />
                  {post.imageUrl && (
                    <div className="border border-border rounded-lg overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <Button variant="outline" className="w-full">
                    <Image className="mr-2 h-4 w-4" />
                    Fazer Upload de Imagem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status do Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published" className="flex items-center">
                    {post.published ? (
                      <Globe className="mr-2 h-4 w-4 text-success" />
                    ) : (
                      <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    Publicado
                  </Label>
                  <Switch
                    id="published"
                    checked={post.published}
                    onCheckedChange={(checked) =>
                      setPost({ ...post, published: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Post em Destaque</Label>
                  <Switch
                    id="featured"
                    checked={post.featured}
                    onCheckedChange={(checked) =>
                      setPost({ ...post, featured: checked })
                    }
                  />
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {post.published ? "Publicado em" : "Será publicado em"}:
                    Agora
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Categories & Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Categorias e Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={post.category}
                    onChange={(e) =>
                      setPost({ ...post, category: e.target.value })
                    }
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="política, economia, brasil..."
                    value={post.tags}
                    onChange={(e) => setPost({ ...post, tags: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separe as tags com vírgulas
                  </p>
                </div>

                {post.tags && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.split(",").map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar Preview
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver no Site
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
