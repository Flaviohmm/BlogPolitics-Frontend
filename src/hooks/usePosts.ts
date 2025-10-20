import { useQuery } from "@tanstack/react-query";

export interface Post {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    author: string;
    publishDate: string;
    category: string;
    imageUrl: string;
    commentCount: number;
    featured?: boolean;
    tags?: string[];
}

// Mock data - substituir com dados reais da API
const mockPosts: Post[] = [
    {
        id: '1',
        title: 'Reforma Política: Principais Propostas em Debate',
        excerpt: 'Análise detalhada das principais propostas de reforma política que estão sendo discutidas no Congresso Nacional.',
        content: `
      <p>A reforma política tem sido um dos temas mais debatidos no Congresso Nacional nos últimos meses. As principais propostas incluem mudanças no sistema eleitoral, financiamento de campanhas e regras para coligações partidárias.</p>
      <br>
      <strong>Principais Propostas</strong>
      <br><br>
      <p>Entre as mudanças mais significativas está a proposta de implementação do voto distrital misto, que combinaria elementos do sistema atual com a divisão do país em distritos eleitorais. Essa medida visa fortalecer o vínculo entre eleitores e representantes.</p>
      <br>
      <strong>Financiamento de Campanhas</strong>
      <br><br>
      <p>Outra questão central é o financiamento de campanhas eleitorais. A proposta em discussão prevê limites mais rígidos para gastos e maior transparência na prestação de contas dos candidatos.</p>
      <br>
      <strong>Perspectivas</strong>
      <br><br>
      <p>Especialistas avaliam que a reforma, se aprovada, pode trazer mudanças significativas no cenário político brasileiro, tornando o processo eleitoral mais transparente e democrático.</p>
    `,
        author: 'Carlos Silva',
        publishDate: '2025-03-15',
        category: 'Política Nacional',
        imageUrl: '/src/assets/political-reform.jpg',
        commentCount: 24,
        featured: true,
        tags: ['reforma-politica', 'congresso-nacional', 'eleicoes-2024']
    },
    {
        id: '2',
        title: 'Impactos da Nova Política Econômica',
        excerpt: 'Como as recentes mudanças na política econômica afetam o dia a dia dos brasileiros.',
        content: `
      <p>As recentes mudanças na política econômica do governo têm gerado amplo debate sobre seus impactos na vida dos brasileiros. Medidas como ajustes na taxa de juros e mudanças fiscais afetam diretamente o poder de compra e o acesso ao crédito.</p>
      <br>
      <strong>Taxa de Juros</strong>
      <br><br>
      <p>A decisão do Banco Central de ajustar a taxa Selic tem efeitos diretos sobre o crédito, investimentos e inflação. Economistas divergem sobre os benefícios de curto e longo prazo dessas medidas.</p>
      <br>
      <strong>Impacto no Consumidor</strong>
      <br><br>
      <p>Para o consumidor comum, essas mudanças se refletem nos preços dos produtos, nas condições de financiamento e na capacidade de investimento das empresas, afetando o mercado de trabalho.</p>
    `,
        author: 'Maria Santos',
        publishDate: '2025-03-14',
        category: 'Economia',
        imageUrl: '/src/assets/economy-analysis.jpg',
        commentCount: 18,
        tags: ['economia', 'politica-externa']
    },
    {
        id: '3',
        title: 'Eleições 2026: Panorama das Campanhas',
        excerpt: 'Um olhar sobre as estratégias de campanha dos principais candidatos.',
        content: `
      <p>As eleições de 2026 prometem ser das mais disputadas da história recente. Com candidatos de diferentes espectros políticos, as estratégias de campanha variam desde o uso massivo de redes sociais até eventos presenciais em comunidades.</p>
      <br>
      <strong>Estratégias Digitais</strong>
      <br><br>
      <p>O uso de redes sociais e marketing digital tem se tornado cada vez mais importante. Candidatos investem em equipes especializadas para criar conteúdo e engajar eleitores online.</p>
      <br>
      <strong>Propostas em Debate</strong>
      <br><br>
      <p>Os principais temas debatidos incluem economia, segurança pública, educação e saúde. Cada candidato apresenta suas propostas para enfrentar os desafios nessas áreas.</p>
    `,
        author: 'João Oliveira',
        publishDate: '2025-03-13',
        category: 'Eleições',
        imageUrl: '/src/assets/elections-campaign.jpg',
        commentCount: 32,
        tags: ['eleicoes-2024', 'reforma-politica']
    },
    {
        id: '4',
        title: 'Análise: Política Externa Brasileira',
        excerpt: 'Avaliação dos principais desafios e oportunidades da política externa do Brasil.',
        content: `
      <p>A política externa brasileira enfrenta novos desafios em um cenário internacional cada vez mais complexo. As relações com parceiros tradicionais e emergentes definem os rumos da diplomacia nacional.</p>
      <br>
      <strong>Relações Internacionais</strong>
      <br><br>
      <p>O Brasil busca fortalecer laços com países da América Latina, ao mesmo tempo em que mantém parcerias estratégicas com potências globais como Estados Unidos, China e União Europeia.</p>
      <br>
      <strong>Desafios Globais</strong>
      <br><br>
      <p>Questões como mudanças climáticas, comércio internacional e cooperação em saúde são prioridades na agenda externa brasileira.</p>
    `,
        author: 'Ana Costa',
        publishDate: '2025-03-12',
        category: 'Internacional',
        imageUrl: '/src/assets/hero-political.jpg',
        commentCount: 15,
        tags: ['politica-externa']
    },
    {
        id: '5',
        title: 'Debate sobre Reforma Tributária Avança',
        excerpt: 'Entenda os principais pontos da reforma tributária em discussão.',
        content: `
      <p>A reforma tributária é considerada uma das mais importantes reformas estruturais para a economia brasileira. O debate sobre sua implementação envolve diversos setores da sociedade e do governo.</p>
      <br>
      <strong>Principais Mudanças</strong>
      <br><br>
      <p>A proposta prevê a simplificação do sistema tributário atual, unificando diversos impostos em um único tributo sobre o consumo. Essa mudança pode reduzir a burocracia e aumentar a eficiência na arrecadação.</p>
      <br>
      <strong>Impactos Esperados</strong>
      <br><br>
      <p>Especialistas apontam que a reforma pode gerar benefícios como redução de custos para empresas, maior transparência tributária e potencial aumento na arrecadação a longo prazo.</p>
      <br>
      <strong>Desafios na Implementação</strong>
      <br><br>
      <p>A transição do sistema atual para o novo modelo enfrenta resistências de diversos setores, que temem impactos negativos em suas atividades. O governo trabalha em mecanismos de transição para minimizar esses efeitos.</p>
      <br>
      <strong>Cronograma</strong>
      <p>A expectativa é que a reforma seja votada ainda este ano, com implementação gradual ao longo dos próximos anos. O cronograma prevê períodos de transição para cada setor da economia.</p>
    `,
        author: 'Pedro Martins',
        publishDate: '2025-03-11',
        category: 'Economia',
        imageUrl: '/src/assets/economy-analysis.jpg',
        commentCount: 28,
        tags: ['economia', 'reforma-tributaria']
    },
    {
        id: '6',
        title: 'Partidos se Mobilizam para Eleições',
        excerpt: 'As estratégias dos partidos políticos para as próximas eleições.',
        content: `
      <p>Com as eleições se aproximando, os partidos políticos intensificam suas estratégias de mobilização e articulação. Convenções partidárias definem candidatos e alianças para o pleito.</p>
      <br>
      <strong>Alianças Políticas</strong>
      <br><br>
      <p>A formação de coligações tem sido tema central nas negociações entre os partidos. Diferentes espectros ideológicos buscam convergências para fortalecer suas candidaturas.</p>
      <br>
      <strong>Organização de Base</strong>
      <br><br>
      <p>Os partidos investem na estruturação de comitês locais e na capacitação de militantes para atuarem nas campanhas de rua e no contato direto com eleitores.</p>
    `,
        author: 'Lucia Fernandes',
        publishDate: '2025-03-10',
        category: 'Eleições',
        imageUrl: '/src/assets/elections-campaign.jpg',
        commentCount: 21,
        tags: ['eleicoes-2025', 'reforma-politica']
    }
];

export const usePostById = (id: string) => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            // Simular chamada à API
            await new Promise(resolve => setTimeout(resolve, 500));

            const post = mockPosts.find(p => p.id === id);
            if (!post) throw new Error('Post not found');
            return post;
        },
    });
};

export const useAllPosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            // Simular chamada à API
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockPosts;
        },
    });
};
