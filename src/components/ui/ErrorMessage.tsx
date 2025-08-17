interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
    className?: string;
}

export const ErrorMessage = ({
    message = "Erro ao carregar dados",
    onRetry,
    className = ''
}: ErrorMessageProps) => {
    return (
        <div className={`p-4 text-center ${className}`}>
            <div className="mb-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-destructive mb-2">{message}</h3>
                <p className="text-muted-foreground text-sm">Verifique sua conexão e tente novamente</p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                    Tentar novamente
                </button>
            )}
        </div>
    );
}; 