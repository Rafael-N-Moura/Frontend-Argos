import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors para tratamento de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// Tipos para as respostas da API
export interface Region {
    id: string;
    name: string;
    cidade: string;
    regiao: string;
    bairros: string;
    created_at: string;
    updated_at: string;
}

export interface Tweet {
    id: string;
    region_id: string;
    author: string;
    content: string;
    likes: number;
    retweets: number;
    sentiment: string;
    score_sentimento: number;
    created_at: string;
}

export interface News {
    id: number;
    region_id: string;
    topic_id?: string;
    title: string;
    description?: string;
    content?: string;
    source: string;
    url?: string;
    cidade: string;
    regiao: string;
    published_at: string;
    collected_at: string;
    sentiment_score: number;
    created_at: string;
}

export interface Topic {
    id: string;
    region_id: string;
    title: string;
    percentage: number;
    created_at: string;
}

export interface SentimentData {
    positive: number;
    neutral: number;
    negative: number;
}

export interface RegionData {
    region: Region;
    sentiment: SentimentData;
    tweets: Tweet[];
    topics: Topic[];
    headlines: { [topicId: string]: News[] };
}

export interface RegionSummary {
    id: string;
    name: string;
    total_tweets: number;
    total_news: number;
    sentiment_summary: SentimentData;
} 