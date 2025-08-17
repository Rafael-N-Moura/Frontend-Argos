import { useState } from 'react';
import { RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useDataRefresh, DataRefreshStatus } from '@/hooks/useDataRefresh';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DataRefreshButtonProps {
    variant?: 'default' | 'outline' | 'secondary' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    showProgress?: boolean;
    className?: string;
}

export const DataRefreshButton = ({
    variant = 'default',
    size = 'default',
    showProgress = true,
    className = ''
}: DataRefreshButtonProps) => {
    const { status, refreshAllCities, clearStatus } = useDataRefresh();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleRefresh = async () => {
        try {
            await refreshAllCities();
            // Recarregar a página após atualização bem-sucedida
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Erro no refresh:', error);
        }
    };

    const getButtonContent = () => {
        if (status.isRefreshing) {
            return <Loader2 className="h-4 w-4 animate-spin" />;
        }

        if (status.success) {
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        }

        if (status.error) {
            return <AlertCircle className="h-4 w-4 text-red-500" />;
        }

        return <RefreshCw className="h-4 w-4" />;
    };

    const getButtonVariant = () => {
        if (status.isRefreshing) return 'secondary';
        if (status.success) return 'default';
        if (status.error) return 'destructive';
        return variant;
    };

    const getButtonDisabled = () => {
        return status.isRefreshing;
    };

    return (
        <TooltipProvider>
            <div className={`flex flex-col gap-2 ${className}`}>
                <Tooltip open={showTooltip && !status.isRefreshing}>
                    <TooltipTrigger asChild>
                        <Button
                            variant={getButtonVariant()}
                            size={size}
                            onClick={handleRefresh}
                            disabled={getButtonDisabled()}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="min-w-[140px]"
                        >
                            {getButtonContent()}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>🔄 Atualizar dados de todas as cidades com Gemini AI</p>
                    </TooltipContent>
                </Tooltip>

                {/* Progress Indicator */}
                {showProgress && (
                    <div className="text-xs text-muted-foreground">
                        {status.progress}
                    </div>
                )}

                {/* Error Alert */}
                {status.error && (
                    <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {status.error}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearStatus}
                                className="ml-2 h-6 px-2 text-xs"
                            >
                                Limpar
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Success Message */}
                {status.success && (
                    <Alert className="mt-2 border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            Dados atualizados com sucesso! A página será recarregada em breve...
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </TooltipProvider>
    );
};
