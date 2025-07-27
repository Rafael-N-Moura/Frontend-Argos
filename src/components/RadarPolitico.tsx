import { useState } from 'react';
import { MapPin, BarChart3 } from 'lucide-react';
import PernambucoMap from './PernambucoMap';
import SentimentMeter from './SentimentMeter';
import TweetsList from './TweetsList';
import MediaTopics from './MediaTopics';
import NewsHeadlines from './NewsHeadlines';
import { mockData, regionNames } from '../data/mockData';

const RadarPolitico = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
    setSelectedTopic(null); // Reset topic selection when changing region
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(selectedTopic === topicId ? null : topicId);
  };

  const currentRegionData = selectedRegion ? mockData[selectedRegion] : null;
  const currentHeadlines = selectedTopic && currentRegionData 
    ? currentRegionData.headlines[selectedTopic] || []
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Radar Político</h1>
                <p className="text-sm text-muted-foreground">v2</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Candidato(a): <span className="text-foreground font-medium">Roberto Neves</span></p>
              <p className="text-xs text-muted-foreground">Última atualização: 27/07/2025 19:40</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Inteligência Geográfica de Pautas</h2>
          <p className="text-muted-foreground">Clique em uma região para uma análise 360° (Mídia + Redes Sociais).</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Map */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Estado de Pernambuco</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Visão Geral</p>
              
              <PernambucoMap 
                selectedRegion={selectedRegion}
                onRegionClick={handleRegionClick}
              />
              
              {selectedRegion && (
                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-primary font-medium">
                    Região selecionada: {regionNames[selectedRegion]}
                  </p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 border-l-4 border-primary pl-3">
                Como usar a ferramenta:
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span className="text-primary font-medium">1.</span>
                  <span><strong className="text-foreground">Clique em uma região</strong> para ver o termômetro do Twitter e os temas da mídia local.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-medium">2.</span>
                  <span><strong className="text-foreground">Selecione uma pauta da mídia</strong> para ver as manchetes relacionadas.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-medium">3.</span>
                  <span><strong className="text-foreground">Cruze as informações:</strong> use o sentimento do Twitter para guiar o tom da sua comunicação sobre as pautas da mídia.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Analysis */}
          <div className="space-y-6">
            {selectedRegion ? (
              <>
                {/* Region Header */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {regionNames[selectedRegion]}
                  </h3>
                  <p className="text-sm text-muted-foreground">Análise Integrada</p>
                </div>

                {/* Twitter Analysis */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Análise de Imagem no X (Twitter)
                  </h3>
                  <SentimentMeter sentiment={currentRegionData!.sentiment} />
                </div>

                {/* Tweets */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <TweetsList tweets={currentRegionData!.tweets} />
                </div>

                {/* Media Topics */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <MediaTopics 
                    topics={currentRegionData!.topics}
                    selectedTopic={selectedTopic}
                    onTopicClick={handleTopicClick}
                  />
                </div>

                {/* News Headlines */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <NewsHeadlines 
                    headlines={currentHeadlines}
                    selectedTopic={selectedTopic}
                  />
                </div>
              </>
            ) : (
              /* Welcome Message */
              <div className="bg-card border border-border rounded-xl p-12 shadow-sm text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Bem-vindo ao Radar Político
                  </h3>
                  <p className="text-muted-foreground">
                    Selecione uma região no mapa para iniciar sua análise estratégica.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarPolitico;