import { useState } from 'react';
import axios from 'axios';

interface Manchete {
    numero: number;
    titulo: string;
    fonte: string;
    data: string | null;
}

interface AnaliseEstrategica {
    status: string;
    topic_id: string;
    cidade: string;
    manchetes_analisadas: number;
    analise_estrategica: string;
    manchetes: Manchete[];
}

interface UseEstrategiaReturn {
    analise: AnaliseEstrategica | null;
    loading: boolean;
    error: string | null;
    gerarAnalise: (topicId: string, cidade: string) => Promise<void>;
    limparAnalise: () => void;
}

export const useEstrategia = (): UseEstrategiaReturn => {
    const [analise, setAnalise] = useState<AnaliseEstrategica | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const gerarAnalise = async (topicId: string, cidade: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post<AnaliseEstrategica>(
                `http://localhost:8000/api/estrategia/gerar-analise/${topicId}/${cidade}`
            );

            setAnalise(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao gerar análise estratégica';
            setError(errorMessage);
            console.error('Erro na análise estratégica:', err);
        } finally {
            setLoading(false);
        }
    };

    const limparAnalise = () => {
        setAnalise(null);
        setError(null);
    };

    return {
        analise,
        loading,
        error,
        gerarAnalise,
        limparAnalise,
    };
};
