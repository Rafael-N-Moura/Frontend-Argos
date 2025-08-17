interface NewsHeadline {
  id: number;
  title: string;
  description?: string;
  source: string;
  url?: string;
  cidade: string;
  regiao: string;
  published_at: string;
  sentiment_score: number;
  created_at: string;
}

interface NewsHeadlinesProps {
  headlines: NewsHeadline[];
  selectedTopic: string | null;
}

const NewsHeadlines = ({ headlines, selectedTopic }: NewsHeadlinesProps) => {
  if (!selectedTopic) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Manchetes Relevantes
        </h3>
        <div className="p-8 text-center text-muted-foreground">
          <p>Selecione uma pauta para ver as notícias.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Manchetes Relevantes
      </h3>

      <div className="space-y-3">
        {headlines.map((headline) => (
          <div
            key={headline.id}
            className="p-4 border border-border rounded-lg bg-card hover:shadow-sm transition-shadow duration-200"
          >
            <div className="space-y-2">
              <h4 className="font-medium text-card-foreground leading-tight">
                {headline.title}
              </h4>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="font-medium">{headline.source}</span>
                <span>{new Date(headline.published_at).toLocaleDateString('pt-BR')}</span>
              </div>
              {headline.description && (
                <p className="text-sm text-muted-foreground">{headline.description}</p>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>📍 {headline.cidade}</span>
                <span>•</span>
                <span>Sentimento: {headline.sentiment_score > 0 ? '😊' : headline.sentiment_score < 0 ? '😞' : '😐'}</span>
              </div>
              {headline.url && (
                <a
                  href={headline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Ler mais →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsHeadlines;