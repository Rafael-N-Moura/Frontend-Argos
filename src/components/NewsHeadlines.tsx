interface NewsHeadline {
  id: string;
  title: string;
  source: string;
  date: string;
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
                <span>{headline.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsHeadlines;