import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tagService } from "@/services/tagService";
import { Tag } from "@/types/tag";
import { useToast } from "@/hooks/use-toast";

export const useTags = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Query para buscar todas as tags
    const { data: tags, isLoading, error } = useQuery({
        queryKey: ['tags'],
        queryFn: tagService.getAll,
        staleTime: 1000 * 60 * 10, // 10 minutos
    });

    // Query para tags populares
    const usePopularTags = (limit: number = 10) => {
        return useQuery({
            queryKey: ['tags', 'popular', limit],
            queryFn: () => tagService.getPopular(limit),
            staleTime: 1000 * 60 * 5,
        });
    };

    // Mutation para criar tag
    const createMutation = useMutation({
        mutationFn: tagService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            toast({
                title: 'Tag criada',
                description: 'A tag foi criada com sucesso!'
            });
        },
        onError: () => {
            toast({
                title: 'Erro',
                description: 'Não foi possível criar a tag.',
                variant: 'destructive',
            });
        },
    });

    // Mutation para atualizar tag
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Tag> }) =>
            tagService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            toast({
                title: 'Tag atualizada',
                description: 'A tag foi atualizada com sucesso!',
            });
        },
    });

    // Mutation para deletar tag
    const deleteMutation = useMutation({
        mutationFn: tagService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            toast({
                title: 'Tag deletada',
                description: 'A tag foi removida com sucesso!',
            });
        },
    });

    return {
        tags,
        isLoading,
        error,
        usePopularTags,
        createTag: createMutation.mutate,
        updateTag: updateMutation.mutate,
        deleteTag: deleteMutation.mutate,
    };
};