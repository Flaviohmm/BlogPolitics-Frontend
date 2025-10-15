import { api } from "./api";
import { Tag } from "@/types/tag";

export const tagService = {
    // Buscar todas as tags
    getAll: async (): Promise<Tag[]> => {
        const response = await api.get<Tag[]>('/api/v1/tags');
        return response.data;
    },

    // Buscar tags populares
    getPopular: async (limit: number = 10): Promise<Tag[]> => {
        const response = await api.get<Tag[]>(`/api/v1/tags/popular?limit=${limit}`);
        return response.data;
    },

    // Buscar tag por ID
    getById: async (id: number): Promise<Tag> => {
        const response = await api.get<Tag>(`/api/v1/tags/${id}`);
        return response.data;
    },

    // Buscar tag por slug
    getBySlug: async (slug: string): Promise<Tag> => {
        const response = await api.get<Tag>(`/api/v1/tags/slug/${slug}`);
        return response.data;
    },

    // Buscar tags
    search: async (query: string): Promise<Tag[]> => {
        const response = await api.get<Tag[]>(`/api/v1/tags/search?q=${query}`);
        return response.data;
    },

    // Criar tag (admin)
    create: async (tag: Partial<Tag>): Promise<Tag> => {
        const response = await api.post<Tag>(`/api/v1/tags`, tag);
        return response.data;
    },

    // Atualizar tag (admin)
    update: async (id: number, tag: Partial<Tag>): Promise<Tag> => {
        const response = await api.put<Tag>(`/api/v1/tags/${id}`, tag);
        return response.data;
    },

    // Deletar tag (admin)
    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/v1/tags/${id}`);
    },
};