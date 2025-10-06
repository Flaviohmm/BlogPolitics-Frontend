import { api } from "./api";
import { Category } from "@/types/category";

export const categoryService = {
    // Buscar todas as categorias
    getAll: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>('/api/v1/categories');
        return response.data;
    },

    // Buscar categoria por ID
    getById: async (id: number): Promise<Category> => {
        const response = await api.get<Category>(`/api/v1/categories/${id}`);
        return response.data;
    },

    // Buscar categoria por slug
    getBySlug: async (slug: string): Promise<Category> => {
        const response = await api.get<Category>(`/api/v1/categories/slug/${slug}`);
        return response.data;
    },

    // Criar categoria (admin)
    create: async (category: Partial<Category>): Promise<Category> => {
        const response = await api.post<Category>('/api/v1/categories', category);
        return response.data;
    },

    // Atualizar categoria (admin)
    update: async (id: number, category: Partial<Category>): Promise<Category> => {
        const response = await api.put<Category>(`/api/v1/categories/${id}`, category);
        return response.data;
    },

    // Delete categoria (admin)
    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/v1/categories/${id}`);
    },
};
