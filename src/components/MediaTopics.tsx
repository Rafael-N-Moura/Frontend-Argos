import React, { useState } from 'react';
import { Brain, BarChart3 } from 'lucide-react';
import { PainelAnaliseEstrategica } from './PainelAnaliseEstrategica';

interface MediaTopic {
  id: string;
  region_id: string;
  title: string;
  percentage: number;
  created_at: string;
}

interface MediaTopicsProps {
  topics: MediaTopic[];
  selectedTopic: string | null;
  onTopicClick: (topicId: string) => void;
  cidade: string; // Adicionar cidade para o painel
}

const MediaTopics = ({ topics, selectedTopic, onTopicClick, cidade }: MediaTopicsProps) => {
  const [showAnaliseEstrategica, setShowAnaliseEstrategica] = useState(false);
  const [selectedTopicForAnalise, setSelectedTopicForAnalise] = useState<MediaTopic | null>(null);

  const handleAnaliseEstrategica = (topic: MediaTopic, e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que o clique propague para o tópico
    setSelectedTopicForAnalise(topic);
    setShowAnaliseEstrategica(true);
  };

  const handleCloseAnalise = () => {
    setShowAnaliseEstrategica(false);
    setSelectedTopicForAnalise(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Pautas em Destaque na Mídia
      </h3>

      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedTopic === topic.id
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-border hover:border-primary/50 hover:shadow-sm'
              }`}
            onClick={() => onTopicClick(topic.id)}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-card-foreground">{topic.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">{topic.percentage.toFixed(1)}%</span>
                  <button
                    onClick={(e) => handleAnaliseEstrategica(topic, e)}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-primary hover:text-primary/80"
                    title="Gerar Análise Estratégica"
                  >
                    <Brain className="h-4 w-4" />
                  </button>
                </div>
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

      {/* Painel de Análise Estratégica */}
      {showAnaliseEstrategica && selectedTopicForAnalise && (
        <PainelAnaliseEstrategica
          topicId={selectedTopicForAnalise.id}
          cidade={cidade}
          topicTitle={selectedTopicForAnalise.title}
          onClose={handleCloseAnalise}
        />
      )}
    </div>
  );
};

export default MediaTopics;