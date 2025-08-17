import { useQuery } from '@tanstack/react-query';
import { api, Tweet, SentimentData } from '../lib/api';

export const useTweets = (regionId: number | null) => {
    return useQuery({
        queryKey: ['tweets', regionId],
        queryFn: () => api.get<Tweet[]>(`/tweets/${regionId}/`).then(res => res.data),
        enabled: !!regionId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
};

export const useTweetsSentiment = (regionId: number | null) => {
    return useQuery({
        queryKey: ['tweets-sentiment', regionId],
        queryFn: () => api.get<SentimentData>(`/tweets/${regionId}/sentiment/`).then(res => res.data),
        enabled: !!regionId,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};

export const useTopTweets = (regionId: number | null) => {
    return useQuery({
        queryKey: ['top-tweets', regionId],
        queryFn: () => api.get<Tweet[]>(`/tweets/${regionId}/top/`).then(res => res.data),
        enabled: !!regionId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
};

// Novos hooks para dados globais
export const useGlobalTopTweets = () => {
    return useQuery({
        queryKey: ['global-top-tweets'],
        queryFn: () => api.get<Tweet[]>('/tweets/global/top/').then(res => res.data),
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
};

export const useGlobalSentiment = () => {
    return useQuery({
        queryKey: ['global-sentiment'],
        queryFn: () => api.get<SentimentData>('/tweets/global/sentiment/').then(res => res.data),
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}; 