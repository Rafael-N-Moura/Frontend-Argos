interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

interface SentimentMeterProps {
  sentiment: SentimentData;
}

const SentimentMeter = ({ sentiment }: SentimentMeterProps) => {
  const total = sentiment.positive + sentiment.neutral + sentiment.negative;
  const positiveWidth = (sentiment.positive / total) * 100;
  const neutralWidth = (sentiment.neutral / total) * 100;
  const negativeWidth = (sentiment.negative / total) * 100;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Termômetro de Sentimento (Últimas 24h):
      </h3>
      
      {/* Progress Bar */}
      <div className="w-full h-6 bg-muted rounded-full overflow-hidden flex">
        <div 
          className="bg-positive h-full transition-all duration-700 ease-out"
          style={{ width: `${positiveWidth}%` }}
        />
        <div 
          className="bg-neutral h-full transition-all duration-700 ease-out"
          style={{ width: `${neutralWidth}%` }}
        />
        <div 
          className="bg-negative h-full transition-all duration-700 ease-out"
          style={{ width: `${negativeWidth}%` }}
        />
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-positive rounded-full" />
          <span>Positivo: {sentiment.positive}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-neutral rounded-full" />
          <span>Neutro: {sentiment.neutral}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-negative rounded-full" />
          <span>Negativo: {sentiment.negative}%</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentMeter;