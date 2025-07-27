interface MediaTopic {
  id: string;
  title: string;
  percentage: number;
}

interface MediaTopicsProps {
  topics: MediaTopic[];
  selectedTopic: string | null;
  onTopicClick: (topicId: string) => void;
}

const MediaTopics = ({ topics, selectedTopic, onTopicClick }: MediaTopicsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Pautas em Destaque na Mídia
      </h3>
      
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedTopic === topic.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-primary/50 hover:shadow-sm'
            }`}
            onClick={() => onTopicClick(topic.id)}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-card-foreground">{topic.title}</h4>
                <span className="text-sm font-medium text-primary">{topic.percentage}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${topic.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaTopics;