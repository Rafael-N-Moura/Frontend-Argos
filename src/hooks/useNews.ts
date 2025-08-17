import { useQuery } from '@tanstack/react-query';
import { api, News, Topic } from '../lib/api';

export const useNews = (cidade: string | null) => {
    return useQuery({
        queryKey: ['news', cidade],
        queryFn: () => api.get<News[]>(`/news/cidade/${cidade}`).then(res => res.data),
        enabled: !!cidade,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
};

export const useNewsTopics = (cidade: string | null) => {
    return useQuery({
        queryKey: ['news-topics', cidade],
        queryFn: () => api.get<Topic[]>(`/topics/cidade/${cidade}`).then(res => res.data),
        enabled: !!cidade,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};

export const useNewsByTopic = (topicId: string | null) => {
    return useQuery({
        queryKey: ['news-by-topic', topicId],
        queryFn: () => api.get<News[]>(`/topics/${topicId}/news`).then(res => res.data),
        enabled: !!topicId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
}; 