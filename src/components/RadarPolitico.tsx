import { useState } from 'react';
import { MapPin, BarChart3, ChevronLeft, ChevronRight, Brain } from 'lucide-react';
import MediaTopics from './MediaTopics';
import NewsHeadlines from './NewsHeadlines';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorMessage } from './ui/ErrorMessage';
import { useRegions } from '../hooks/useRegions';
import { useNews, useNewsTopics } from '../hooks/useNews';
import { DataRefreshButton } from './DataRefreshButton';
import { PainelAnaliseEstrategica } from './PainelAnaliseEstrategica';


const RadarPolitico = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentNewsPage, setCurrentNewsPage] = useState(0);
  const [showAnaliseEstrategica, setShowAnaliseEstrategica] = useState(false);
  const [selectedTopicForAnalise, setSelectedTopicForAnalise] = useState<any>(null);

  // Fetch regions
  const { data: regions, isLoading: regionsLoading, error: regionsError } = useRegions();



  // Fetch news for the selected city
  const {
    data: cityNews,
    isLoading: newsLoading,
    error: newsError,
    refetch: refetchCityNews
  } = useNews(selectedCity);

  // Fetch topics for the selected city
  const {
    data: cityTopics,
    isLoading: topicsLoading,
    error: topicsError,
    refetch: refetchCityTopics
  } = useNewsTopics(selectedCity);



  const handleCityClick = (cityName: string) => {
    setSelectedCity(selectedCity === cityName ? null : cityName);
    setSelectedTopic(null); // Reset topic selection when changing city
    setCurrentNewsPage(0); // Reset news page when changing city
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(selectedTopic === topicId ? null : topicId);
  };

  const handleAnaliseEstrategica = (topic: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que o clique propague para o tópico
    setSelectedTopicForAnalise(topic);
    setShowAnaliseEstrategica(true);
  };

  const handleCloseAnalise = () => {
    setShowAnaliseEstrategica(false);
    setSelectedTopicForAnalise(null);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    if (cities) {
      const maxPage = Math.ceil(Object.keys(cities).length / 5) - 1;
      setCurrentPage(prev => Math.min(maxPage, prev + 1));
    }
  };

  const handlePreviousNewsPage = () => {
    setCurrentNewsPage(prev => Math.max(0, prev - 1));
  };

  const handleNextNewsPage = () => {
    if (cityNews) {
      const maxNewsPage = Math.ceil(cityNews.length / 2) - 1;
      setCurrentNewsPage(prev => Math.min(maxNewsPage, prev + 1));
    }
  };

  // Função para converter porcentagem para valores mais realistas
  const getRealisticPercentage = (percentage: number) => {
    // Converter para um valor entre 15% e 85% para parecer mais realista
    const minPercentage = 15;
    const maxPercentage = 85;

    // Normalizar o valor original (assumindo que está entre 0 e 100)
    const normalized = Math.max(0, Math.min(100, percentage));

    // Converter para o novo range
    const converted = minPercentage + (normalized / 100) * (maxPercentage - minPercentage);

    return Math.round(converted);
  };



  // Group regions by city
  const cities = regions?.reduce((acc, region) => {
    if (!acc[region.cidade]) {
      acc[region.cidade] = {
        name: region.cidade,
        regions: [],
        totalRegions: 0
      };
    }
    acc[region.cidade].regions.push(region);
    acc[region.cidade].totalRegions++;
    return acc;
  }, {} as Record<string, { name: string; regions: any[]; totalRegions: number }>);

  // Get cities for current page
  const cityNames = cities ? Object.keys(cities) : [];
  const citiesPerPage = 5;
  const startIndex = currentPage * citiesPerPage;
  const endIndex = startIndex + citiesPerPage;
  const currentCities = cityNames.slice(startIndex, endIndex);
  const totalPages = Math.ceil(cityNames.length / citiesPerPage);

  // Loading states
  if (regionsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Error states
  if (regionsError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ErrorMessage
          message="Erro ao carregar dados"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-foreground">Argos</h1>
                <p className="text-sm text-muted-foreground">v2</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Candidato(a): <span className="text-foreground font-medium">João Campos</span></p>
                <p className="text-xs text-muted-foreground">Última atualização: {new Date().toLocaleString('pt-BR')}</p>
              </div>
              {/* Data Refresh Button */}
              <DataRefreshButton
                variant="ghost"
                size="icon"
                showProgress={false}
                className="w-8 h-8 p-0"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Inteligência Geográfica de Pautas</h2>
          <p className="text-muted-foreground">Análise de mídia local por cidade de Pernambuco.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cities Map */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Cidades de Pernambuco</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className={`p-2 rounded-lg transition-colors ${currentPage === 0
                      ? 'text-muted-foreground/50 cursor-not-allowed'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                      }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
                    {currentPage + 1} de {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                    className={`p-2 rounded-lg transition-colors ${currentPage >= totalPages - 1
                      ? 'text-muted-foreground/50 cursor-not-allowed'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                      }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Selecione uma cidade para análise</p>

              <div className="space-y-3">
                {currentCities.map((cityName) => {
                  const city = cities[cityName];
                  return (
                    <button
                      key={cityName}
                      onClick={() => handleCityClick(cityName)}
                      className={`w-full p-4 text-left border rounded-lg transition-all duration-300 hover:border-primary/40 ${selectedCity === cityName
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-background border-border hover:bg-primary/5'
                        }`}
                    >
                      <h4 className="font-medium">{cityName}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Clique para analisar
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 border-l-4 border-primary pl-3">
                Como usar a ferramenta:
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">

                <div className="flex gap-3">
                  <span className="text-primary font-medium">1.</span>
                  <span><strong className="text-foreground">Clique em uma cidade</strong> para ver os temas da mídia local.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-medium">2.</span>
                  <span><strong className="text-foreground">Selecione uma pauta</strong> para ver as manchetes relacionadas.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Topics Analysis (When City Selected) */}
          <div className="space-y-6">
            {selectedCity ? (
              <>


                {/* Topics Analysis */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Análise de Tópicos - {selectedCity}
                  </h3>
                  {topicsLoading ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <LoadingSpinner />
                    </div>
                  ) : topicsError ? (
                    <ErrorMessage
                      message="Erro ao carregar tópicos"
                      onRetry={refetchCityTopics}
                    />
                  ) : cityTopics && cityTopics.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid gap-3">
                        {cityTopics.map((topic) => (
                          <div
                            key={topic.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedTopic === topic.id
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-background border-border hover:border-primary/40 hover:bg-primary/5'
                              }`}
                            onClick={() => handleTopicClick(topic.id)}
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm leading-tight">
                                {topic.title}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
                                  {getRealisticPercentage(topic.percentage)}%
                                </span>
                                <button
                                  onClick={(e) => handleAnaliseEstrategica(topic, e)}
                                  className="p-2 rounded-lg hover:bg-primary/20 transition-colors text-primary hover:text-primary/80"
                                  title="Gerar Análise Estratégica"
                                >
                                  <Brain className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>Nenhum tópico encontrado para esta cidade.</p>
                    </div>
                  )}
                </div>

                {/* News by Selected Topic */}
                {selectedTopic && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Notícias do Tópico Selecionado
                    </h3>
                    <div className="space-y-3">
                      {cityNews
                        ?.filter(news => news.topic_id === selectedTopic)
                        .slice(0, 3)
                        .map((news) => (
                          <div
                            key={news.id}
                            className="p-4 border border-border rounded-lg bg-card hover:shadow-sm transition-shadow duration-200"
                          >
                            <div className="space-y-2">
                              <h4 className="font-medium text-card-foreground leading-tight text-sm">
                                {news.title}
                              </h4>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="font-medium">{news.source}</span>
                                <span>{new Date(news.published_at).toLocaleDateString('pt-BR')}</span>
                              </div>
                              {news.url && (
                                <a
                                  href={news.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline"
                                >
                                  Ler mais →
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Welcome Message for Center Column */
              <div className="bg-card border border-border rounded-xl p-12 shadow-sm text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Análise de Tópicos
                  </h3>
                  <p className="text-muted-foreground">
                    Selecione uma cidade para ver a análise de tópicos da mídia local.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - City Analysis */}
          <div className="space-y-6">
            {selectedCity ? (
              <>
                {/* City Header */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {selectedCity}
                  </h3>
                  <p className="text-sm text-muted-foreground">Análise de Mídia Local</p>
                </div>

                {/* Loading or Error for City Data */}
                {newsLoading && <LoadingSpinner />}
                {newsError && (
                  <ErrorMessage
                    message="Erro ao carregar dados da cidade"
                    onRetry={refetchCityNews}
                  />
                )}

                {/* City Data */}
                {cityNews && !newsLoading && (
                  <>
                    {/* News Count */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Notícias da Cidade
                      </h3>
                      <p className="text-2xl font-bold text-primary">{cityNews.length}</p>
                      <p className="text-sm text-muted-foreground">notícias encontradas</p>
                    </div>

                    {/* News List */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">
                          Últimas Notícias
                        </h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePreviousNewsPage}
                            disabled={currentNewsPage === 0}
                            className={`p-2 rounded-lg transition-colors ${currentNewsPage === 0
                              ? 'text-muted-foreground/50 cursor-not-allowed'
                              : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                              }`}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
                            {currentNewsPage + 1} de {Math.ceil(cityNews.length / 2)}
                          </span>
                          <button
                            onClick={handleNextNewsPage}
                            disabled={currentNewsPage >= Math.ceil(cityNews.length / 2) - 1}
                            className={`p-2 rounded-lg transition-colors ${currentNewsPage >= Math.ceil(cityNews.length / 2) - 1
                              ? 'text-muted-foreground/50 cursor-not-allowed'
                              : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                              }`}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {cityNews
                          .slice(currentNewsPage * 2, (currentNewsPage * 2) + 2)
                          .map((news) => (
                            <div
                              key={news.id}
                              className="p-4 border border-border rounded-lg bg-card hover:shadow-sm transition-shadow duration-200"
                            >
                              <div className="space-y-2">
                                <h4 className="font-medium text-card-foreground leading-tight">
                                  {news.title}
                                </h4>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                  <span className="font-medium">{news.source}</span>
                                  <span>{new Date(news.published_at).toLocaleDateString('pt-BR')}</span>
                                </div>
                                {news.description && (
                                  <p className="text-sm text-muted-foreground">{news.description}</p>
                                )}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>📍 {news.cidade}</span>
                                </div>
                                {news.url && (
                                  <a
                                    href={news.url}
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


                  </>
                )}
              </>
            ) : (
              /* Welcome Message */
              <div className="bg-card border border-border rounded-xl p-12 shadow-sm text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Análise de Notícias
                  </h3>
                  <p className="text-muted-foreground">
                    Análise global já carregada. Selecione uma cidade para análise local.
                  </p>
                </div>
              </div>

            )}
          </div>
        </div>
      </div>

      {/* Painel de Análise Estratégica */}
      {showAnaliseEstrategica && selectedTopicForAnalise && selectedCity && (
        <PainelAnaliseEstrategica
          topicId={selectedTopicForAnalise.id}
          cidade={selectedCity}
          topicTitle={selectedTopicForAnalise.title}
          onClose={handleCloseAnalise}
        />
      )}
    </div>
  );
};

export default RadarPolitico;