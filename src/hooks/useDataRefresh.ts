import { useState } from 'react';
import { api } from '@/lib/api';

export interface DataRefreshStatus {
    isRefreshing: boolean;
    progress: string;
    currentCity?: string;
    error?: string;
    success?: boolean;
}

export interface DataRefreshStats {
    total_noticias: number;
    total_topicos: number;
    ultima_coleta: string;
    status_gemini: {
        topicos_gemini: number;
        topicos_fallback: number;
        distribuicao_categorias: Record<string, number>;
        score_medio: number;
    };
}

export const useDataRefresh = () => {
    const [status, setStatus] = useState<DataRefreshStatus>({
        isRefreshing: false,
        progress: 'Pronto para atualizar'
    });

    const refreshAllCities = async () => {
        setStatus({
            isRefreshing: true,
            progress: 'Iniciando atualização de dados...'
        });

        try {
            // 1. Limpar dados existentes (opcional - pode ser feito por cidade)
            setStatus({
                isRefreshing: true,
                progress: 'Preparando para coleta de novos dados...'
            });

            // 2. Iniciar refresh para todas as cidades
            setStatus({
                isRefreshing: true,
                progress: 'Coletando notícias e processando tópicos...'
            });

            // Chamar a API de refresh para todas as cidades
            const response = await api.post('/data-refresh/refresh/todas-cidades', {
                dias_atras: 3,
                usar_gemini: true,
                limpar_existente: false  // MUDANÇA: False para segurança
            });

            if (response.data.success) {
                setStatus({
                    isRefreshing: false,
                    progress: 'Atualização concluída com sucesso!',
                    success: true
                });

                // Aguardar um pouco antes de limpar o status
                setTimeout(() => {
                    setStatus({
                        isRefreshing: false,
                        progress: 'Pronto para atualizar'
                    });
                }, 3000);

                return response.data;
            } else {
                throw new Error(response.data.message || 'Erro na atualização');
            }

        } catch (error: any) {
            console.error('Erro no refresh de dados:', error);
            setStatus({
                isRefreshing: false,
                progress: 'Erro na atualização',
                error: error.response?.data?.detail || error.message || 'Erro desconhecido'
            });

            // Limpar erro após 5 segundos
            setTimeout(() => {
                setStatus({
                    isRefreshing: false,
                    progress: 'Pronto para atualizar'
                });
            }, 5000);

            throw error;
        }
    };

    const refreshSingleCity = async (cidade: string) => {
        setStatus({
            isRefreshing: true,
            progress: `Atualizando dados de ${cidade}...`,
            currentCity: cidade
        });

        try {
            const response = await api.post(`/data-refresh/refresh/cidade/${cidade}`, {
                dias_atras: 3,
                usar_gemini: true,
                limpar_existente: false  // MUDANÇA: False para segurança
            });

            if (response.data.success) {
                setStatus({
                    isRefreshing: false,
                    progress: `${cidade} atualizada com sucesso!`,
                    success: true
                });

                setTimeout(() => {
                    setStatus({
                        isRefreshing: false,
                        progress: 'Pronto para atualizar'
                    });
                }, 3000);

                return response.data;
            } else {
                throw new Error(response.data.message || 'Erro na atualização');
            }

        } catch (error: any) {
            console.error(`Erro ao atualizar ${cidade}:`, error);
            setStatus({
                isRefreshing: false,
                progress: `Erro ao atualizar ${cidade}`,
                error: error.response?.data?.detail || error.message || 'Erro desconhecido'
            });

            setTimeout(() => {
                setStatus({
                    isRefreshing: false,
                    progress: 'Pronto para atualizar'
                });
            }, 5000);

            throw error;
        }
    };

    const getRefreshStats = async (cidade: string): Promise<DataRefreshStats> => {
        try {
            const response = await api.get(`/data-refresh/estatisticas/cidade/${cidade}`);
            // A API retorna os dados aninhados em 'estatisticas'
            return response.data.estatisticas;
        } catch (error: any) {
            console.error('Erro ao obter estatísticas:', error);
            throw error;
        }
    };

    const clearStatus = () => {
        setStatus({
            isRefreshing: false,
            progress: 'Pronto para atualizar'
        });
    };

    return {
        status,
        refreshAllCities,
        refreshSingleCity,
        getRefreshStats,
        clearStatus
    };
};
