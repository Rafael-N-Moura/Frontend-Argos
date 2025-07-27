export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface Tweet {
  id: string;
  author: string;
  content: string;
  likes: number;
  retweets: number;
}

export interface MediaTopic {
  id: string;
  title: string;
  percentage: number;
}

export interface NewsHeadline {
  id: string;
  title: string;
  source: string;
  date: string;
}

export interface RegionData {
  sentiment: SentimentData;
  tweets: Tweet[];
  topics: MediaTopic[];
  headlines: { [topicId: string]: NewsHeadline[] };
}

export const mockData: { [regionId: string]: RegionData } = {
  sertao: {
    sentiment: {
      positive: 22,
      neutral: 48,
      negative: 30
    },
    tweets: [
      {
        id: '1',
        author: '@sertanejo_online',
        content: 'Enquanto a gente sofre com a seca, os políticos só aparecem em época de eleição. Roberto Neves é mais um?',
        likes: 15,
        retweets: 8
      },
      {
        id: '2',
        author: '@EnergiaLimpaPE',
        content: 'Importante a fala de Roberto Neves sobre incentivar a energia solar no Sertão. É o futuro!',
        likes: 45,
        retweets: 12
      }
    ],
    topics: [
      { id: 'recursos-hidricos', title: 'Recursos Hídricos e Seca', percentage: 68 },
      { id: 'energia-solar', title: 'Energia Solar', percentage: 25 },
      { id: 'agricultura', title: 'Agricultura Familiar', percentage: 15 }
    ],
    headlines: {
      'recursos-hidricos': [
        {
          id: '1',
          title: 'Sertão de PE enfrenta mais um período crítico de seca',
          source: 'Jornal do Commercio',
          date: '25/07/2025'
        },
        {
          id: '2',
          title: 'Governo federal anuncia R$ 500 mi para combate à seca no Nordeste',
          source: 'Folha de PE',
          date: '24/07/2025'
        }
      ],
      'energia-solar': [
        {
          id: '3',
          title: 'Candidato Roberto Neves promete auditoria para o Pajeú',
          source: 'Blog do Sertão',
          date: '09/07/2025'
        }
      ]
    }
  },
  agreste: {
    sentiment: {
      positive: 35,
      neutral: 45,
      negative: 20
    },
    tweets: [
      {
        id: '3',
        author: '@agriPE_news',
        content: 'O agreste precisa de mais investimento em tecnologia agrícola. Roberto Neves tem plano para isso?',
        likes: 28,
        retweets: 15
      },
      {
        id: '4',
        author: '@CamaruPolitico',
        content: 'Evento de Roberto Neves em Caruaru lotou! Propostas interessantes para o desenvolvimento regional.',
        likes: 67,
        retweets: 23
      }
    ],
    topics: [
      { id: 'agropecuaria', title: 'Agropecuária e Tecnologia', percentage: 55 },
      { id: 'educacao', title: 'Educação Técnica', percentage: 30 },
      { id: 'turismo', title: 'Turismo Rural', percentage: 20 }
    ],
    headlines: {
      'agropecuaria': [
        {
          id: '4',
          title: 'Produtores do Agreste apostam em inovação tecnológica',
          source: 'Diário de Pernambuco',
          date: '26/07/2025'
        }
      ],
      'educacao': [
        {
          id: '5',
          title: 'Novas vagas para cursos técnicos no Agreste pernambucano',
          source: 'G1 Caruaru',
          date: '25/07/2025'
        }
      ]
    }
  },
  mata: {
    sentiment: {
      positive: 42,
      neutral: 38,
      negative: 20
    },
    tweets: [
      {
        id: '5',
        author: '@MataSulPE',
        content: 'Roberto Neves promete valorizar o turismo histórico da Mata Sul. Finalmente alguém viu nosso potencial!',
        likes: 52,
        retweets: 18
      },
      {
        id: '6',
        author: '@PreservacaoMata',
        content: 'Precisamos equilibrar desenvolvimento e preservação ambiental na Mata Atlântica de PE.',
        likes: 31,
        retweets: 14
      }
    ],
    topics: [
      { id: 'turismo-historico', title: 'Turismo Histórico', percentage: 45 },
      { id: 'meio-ambiente', title: 'Preservação Ambiental', percentage: 35 },
      { id: 'acucar-alcool', title: 'Setor Sucroalcooleiro', percentage: 25 }
    ],
    headlines: {
      'turismo-historico': [
        {
          id: '6',
          title: 'Mata Sul aposta no turismo histórico como alternativa econômica',
          source: 'JC Online',
          date: '27/07/2025'
        }
      ],
      'meio-ambiente': [
        {
          id: '7',
          title: 'Projeto de reflorestamento na Mata Atlântica ganha força',
          source: 'Folha de PE',
          date: '26/07/2025'
        }
      ]
    }
  },
  metropolitana: {
    sentiment: {
      positive: 38,
      neutral: 32,
      negative: 30
    },
    tweets: [
      {
        id: '7',
        author: '@RecifePolitico',
        content: 'Roberto Neves precisa apresentar propostas concretas para o transporte público da RMR.',
        likes: 89,
        retweets: 34
      },
      {
        id: '8',
        author: '@TechRecifeHub',
        content: 'Ótima a proposta de Roberto Neves para o Porto Digital. Recife pode ser referência em tecnologia!',
        likes: 76,
        retweets: 28
      }
    ],
    topics: [
      { id: 'transporte', title: 'Transporte Público', percentage: 60 },
      { id: 'tecnologia', title: 'Inovação e Tecnologia', percentage: 35 },
      { id: 'seguranca', title: 'Segurança Pública', percentage: 30 }
    ],
    headlines: {
      'transporte': [
        {
          id: '8',
          title: 'BRT da RMR recebe novos investimentos do governo estadual',
          source: 'Diário de Pernambuco',
          date: '27/07/2025'
        },
        {
          id: '9',
          title: 'Metrô do Recife amplia horário de funcionamento aos domingos',
          source: 'G1 PE',
          date: '26/07/2025'
        }
      ],
      'tecnologia': [
        {
          id: '10',
          title: 'Porto Digital anuncia expansão para outras cidades de PE',
          source: 'Jornal do Commercio',
          date: '25/07/2025'
        }
      ]
    }
  }
};

export const regionNames: { [key: string]: string } = {
  sertao: 'Sertão Pernambucano',
  agreste: 'Agreste',
  mata: 'Mata Pernambucana',
  metropolitana: 'Região Metropolitana'
};