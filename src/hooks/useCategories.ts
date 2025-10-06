import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";
import { Category } from "@/types/category";
import { useToast } from "@/hooks/use-toast";

export const useCategories = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Query para buscar todas as categorias
    const { data: categories, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryService.getAll,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    // Mutation para criar categoria
    const createMutation = useMutation({
        mutationFn: categoryService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast({
                title: 'Categoria criada',
                description: 'A categoria foi criada com sucesso!',
            });
        },
        onError: () => {
            toast({
                title: 'Erro',
                description: 'Não foi possível criar a categoria.',
                variant: 'destructive',
            });
        },
    });

    // Mutation para atualizar categoria
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Category> }) =>
            categoryService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast({
                title: 'Categoria atualizada',
                description: 'A categoria foi atualizada com sucesso!',
            });
        },
    });

    // Mutation para deletar categoria
    const deleteMutation = useMutation({
        mutationFn: categoryService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast({
                title: 'Categoria deletada',
                description: 'A categoria foi removida com sucesso!',
            });
        },
    });

    return {
        categories,
        isLoading,
        error,
        createCategory: createMutation.mutate,
        updateCategory: updateMutation.mutate,
        deleteCategory: deleteMutation.mutate,
    };
};
