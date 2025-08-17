import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, Target, Shield, MessageSquare, X, RefreshCw } from 'lucide-react';
import { useEstrategia } from '@/hooks/useEstrategia';

interface PainelAnaliseEstrategicaProps {
    topicId: string;
    cidade: string;
    topicTitle: string;
    onClose: () => void;
}

export const PainelAnaliseEstrategica: React.FC<PainelAnaliseEstrategicaProps> = ({
    topicId,
    cidade,
    topicTitle,
    onClose,
}) => {
    const { analise, loading, error, gerarAnalise, limparAnalise } = useEstrategia();

    const handleGerarAnalise = () => {
        gerarAnalise(topicId, cidade);
    };

    const handleClose = () => {
        limparAnalise();
        onClose();
    };

    const renderAnaliseEstrategica = () => {
        if (!analise?.analise_estrategica) return null;

        const texto = analise.analise_estrategica;

        // Extrair seções do texto retornado pelo Gemini
        const secoes = {
            diagnostico: extrairSecao(texto, '1. Diagnóstico do Cenário:', '2. Ângulo de Oportunidade'),
            oportunidade: extrairSecao(texto, '2. Ângulo de Oportunidade (Proativo):', '3. Ângulo de Risco'),
            risco: extrairSecao(texto, '3. Ângulo de Risco e Defesa (Reativo):', '4. Sugestões de Frases'),
            frases: extrairSecao(texto, '4. Sugestões de Frases de Efeito:', '')
        };

        return (
            <div className="space-y-6">
                {/* Diagnóstico do Cenário */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Target className="h-5 w-5 text-blue-600" />
                            Diagnóstico do Cenário
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                            {secoes.diagnostico || 'Análise em andamento...'}
                        </p>
                    </CardContent>
                </Card>

                {/* Ângulo de Oportunidade */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Target className="h-5 w-5 text-green-600" />
                            Ângulo de Oportunidade (Proativo)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                            {secoes.oportunidade || 'Análise em andamento...'}
                        </p>
                    </CardContent>
                </Card>

                {/* Ângulo de Risco */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Shield className="h-5 w-5 text-orange-600" />
                            Ângulo de Risco e Defesa (Reativo)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                            {secoes.risco || 'Análise em andamento...'}
                        </p>
                    </CardContent>
                </Card>

                {/* Frases de Efeito */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <MessageSquare className="h-5 w-5 text-purple-600" />
                            Sugestões de Frases de Efeito
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {secoes.frases ? (
                                secoes.frases.split('\n').filter(line => line.trim()).map((frase, index) => (
                                    <div key={index} className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-200">
                                        <p className="text-gray-800 font-medium">"{frase.trim()}"</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">Análise em andamento...</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const extrairSecao = (texto: string, inicio: string, fim: string): string => {
        const startIndex = texto.indexOf(inicio);
        if (startIndex === -1) return '';

        const start = startIndex + inicio.length;
        const endIndex = fim ? texto.indexOf(fim, start) : texto.length;

        return texto.substring(start, endIndex).trim();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Análise Estratégica
                        </h2>
                        <p className="text-gray-600">
                            {topicTitle} • {cidade}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClose}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {!analise && !loading && (
                        <div className="text-center py-12">
                            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Gerar Análise Estratégica
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Clique no botão abaixo para gerar uma análise estratégica completa
                                baseada nas notícias deste tópico. O nosso modelo irá analisar o contexto
                                e fornecer insights políticos acionáveis.
                            </p>
                            <Button
                                onClick={handleGerarAnalise}
                                className="px-8"
                                size="lg"
                            >
                                <Brain className="h-5 w-5 mr-2" />
                                Gerar Análise
                            </Button>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center py-12">
                            <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Gerando Análise Estratégica
                            </h3>
                            <p className="text-gray-600">
                                O modelo está analisando as notícias e criando insights estratégicos...
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                                <h3 className="text-xl font-semibold text-red-900 mb-2">
                                    Erro na Análise
                                </h3>
                                <p className="text-red-700 mb-4">{error}</p>
                                <Button
                                    variant="outline"
                                    onClick={handleGerarAnalise}
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Tentar Novamente
                                </Button>
                            </div>
                        </div>
                    )}

                    {analise && !loading && !error && (
                        <div>
                            {/* Resumo */}
                            <div className="mb-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Resumo da Análise
                                                </h3>
                                                <p className="text-gray-600">
                                                    Baseada em {analise.manchetes_analisadas} manchetes recentes
                                                </p>
                                            </div>
                                            <Badge variant="secondary" className="text-sm">
                                                {analise.manchetes_analisadas} notícias analisadas
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Análise Estratégica */}
                            {renderAnaliseEstrategica()}

                            {/* Manchetes Analisadas */}
                            <div className="mt-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Manchetes Analisadas</CardTitle>
                                        <CardDescription>
                                            Notícias utilizadas para gerar a análise estratégica
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3 max-h-60 overflow-y-auto">
                                            {analise.manchetes.map((manchete) => (
                                                <div
                                                    key={manchete.numero}
                                                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <Badge variant="outline" className="text-xs">
                                                        {manchete.numero}
                                                    </Badge>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {manchete.titulo}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-gray-500">
                                                                {manchete.fonte}
                                                            </span>
                                                            {manchete.data && (
                                                                <span className="text-xs text-gray-400">
                                                                    • {new Date(manchete.data).toLocaleDateString('pt-BR')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
