import { useState, useEffect } from 'react';
import { BarChart3, FileText, Hash, Clock, Brain } from 'lucide-react';
import { useDataRefresh, DataRefreshStats } from '@/hooks/useDataRefresh';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface DataRefreshStatsProps {
    cidade?: string;
    className?: string;
}

export const DataRefreshStats = ({ cidade, className = '' }: DataRefreshStatsProps) => {
    const { getRefreshStats } = useDataRefresh();
    const [stats, setStats] = useState<DataRefreshStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        if (!cidade) return;

        setLoading(true);
        setError(null);

        try {
            const data = await getRefreshStats(cidade);
            setStats(data);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar estatísticas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cidade) {
            fetchStats();
        }
    }, [cidade]);

    if (!cidade) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Estatísticas de Dados
                    </CardTitle>
                    <CardDescription>
                        Selecione uma cidade para ver as estatísticas
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    if (loading) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Estatísticas de Dados - {cidade}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-20" />
                        <Skeleton className="h-20" />
                        <Skeleton className="h-20" />
                        <Skeleton className="h-20" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Estatísticas de Dados - {cidade}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-4">
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={fetchStats}
                            className="text-primary hover:underline mt-2"
                        >
                            Tentar novamente
                        </button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!stats) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Estatísticas de Dados - {cidade}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-4">
                        Nenhuma estatística disponível
                    </div>
                </CardContent>
            </Card>
        );
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString('pt-BR');
        } catch {
            return 'Data não disponível';
        }
    };

    const getGeminiStatusColor = () => {
        if (!stats.status_gemini || !stats.status_gemini.topicos_gemini || !stats.status_gemini.topicos_fallback) {
            return 'bg-gray-100 text-gray-800';
        }

        const geminiPercentage = (stats.status_gemini.topicos_gemini /
            (stats.status_gemini.topicos_gemini + stats.status_gemini.topicos_fallback)) * 100;

        if (geminiPercentage >= 80) return 'bg-green-100 text-green-800';
        if (geminiPercentage >= 60) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Estatísticas de Dados - {cidade}
                </CardTitle>
                <CardDescription>
                    Última atualização: {formatDate(stats.ultima_coleta)}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Métricas Principais */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-primary">{stats.total_noticias}</div>
                        <div className="text-sm text-muted-foreground">Notícias</div>
                    </div>

                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <Hash className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-primary">{stats.total_topicos}</div>
                        <div className="text-sm text-muted-foreground">Tópicos</div>
                    </div>
                </div>

                {/* Status Gemini */}
                {stats.status_gemini && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-primary" />
                            <span className="font-medium">Status Gemini AI</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                <div className="text-lg font-bold text-green-600">
                                    {stats.status_gemini.topicos_gemini || 0}
                                </div>
                                <div className="text-xs text-green-700">Gemini</div>
                            </div>

                            <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                <div className="text-lg font-bold text-yellow-600">
                                    {stats.status_gemini.topicos_fallback || 0}
                                </div>
                                <div className="text-xs text-yellow-700">Fallback</div>
                            </div>
                        </div>

                        <Badge className={`w-fit ${getGeminiStatusColor()}`}>
                            Score: {(stats.status_gemini.score_medio || 0).toFixed(2)}
                        </Badge>
                    </div>
                )}

                {/* Distribuição de Categorias */}
                {stats.status_gemini && stats.status_gemini.distribuicao_categorias &&
                    Object.keys(stats.status_gemini.distribuicao_categorias).length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Categorias</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {Object.entries(stats.status_gemini.distribuicao_categorias).map(([categoria, count]) => (
                                    <Badge key={categoria} variant="outline" className="text-xs">
                                        {categoria}: {count}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                {/* Botão de Refresh */}
                <div className="pt-2">
                    <button
                        onClick={fetchStats}
                        className="w-full text-sm text-primary hover:underline"
                    >
                        Atualizar estatísticas
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};
