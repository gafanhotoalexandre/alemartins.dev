export const PROJECTS = [
  {
    title: 'Desculp.ai',
    description:
      'Aplicação fullstack divertida que utiliza inteligência artificial para gerar desculpas criativas e personalizadas para diferentes situações do cotidiano. Desenvolvida durante o programa de residência em TIC 20 do Capacita Brasil/C-JOVEM, integrando frontend em React com backend Node.js.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'TailwindCSS',
      'Zustand',
      'Zod',
      'Axios',
    ],
    github: 'https://github.com/gafanhotoalexandre/desculpai-web',
  },
  {
    title: 'CustomersHub',
    description:
      'API para cadastro e gerenciamento de clientes, desenvolvida com foco em boas práticas, código limpo e arquitetura escalável baseada em DDD, CQRS e MediatR. Projeto técnico com .NET 8, Clean Architecture e validações robustas.',
    stack: [
      '.NET 8',
      'ASP.NET Core',
      'Entity Framework Core',
      'MediatR',
      'FluentValidation',
      'CQRS',
      'DDD',
    ],
    github: 'https://github.com/gafanhotoalexandre/customers-hub',
  },
  {
    title: 'SimpleBank API',
    description:
      'API RESTful para gerenciamento bancário desenvolvida com Java e Spring Boot, incluindo documentação Swagger UI. Permite gerenciar usuários e transações financeiras com diferentes tipos de contas.',
    stack: ['Java', 'Spring Boot', 'Spring Data JPA', 'H2 Database', 'OpenAPI'],
    github:
      'https://github.com/gafanhotoalexandre/dio-java-basico/tree/main/simplebank',
  },
  {
    title: 'Fina',
    description:
      'Aplicação Full Stack .NET para controle financeiro pessoal, permitindo o gerenciamento de categorias e transações (entradas e saídas), com arquitetura em camadas e foco em boas práticas. Frontend em Blazor WebAssembly e backend em ASP.NET Minimal API.',
    stack: [
      'Blazor WebAssembly',
      'ASP.NET Minimal API',
      'Entity Framework Core',
      'C# 12',
      '.NET 8',
    ],
    github: 'https://github.com/gafanhotoalexandre/finflow',
  },
]

export const SKILLS = [
  {
    category: 'Frontend',
    items: ['ReactJS', 'Angular', 'TypeScript', 'TailwindCSS'],
  },
  {
    category: 'Backend',
    items: [
      'ASP.NET Core',
      'C#',
      'DDD',
      'Minimal APIs',
      'Entity Framework Core',
    ],
  },
  {
    category: 'Ferramentas',
    items: ['Git', 'Docker', 'VS Code', 'Visual Studio'],
  },
]

export const PROFILE = {
  avatarUrl: 'https://github.com/gafanhotoalexandre.png',
  githubUrl: 'https://github.com/gafanhotoalexandre',
  linkedinUrl: 'https://www.linkedin.com/in/alemartins-lima/',
  email: 'hello@alemartins.dev.br',
  emailSubject: 'Contato via portfólio',
} as const

export const CONTACT_CONTENT = {
  eyebrow: 'Contato direto',
  title: 'Canais simples, profissionais e confiaveis.',
  description:
    'Se voce quer falar sobre oportunidade, projeto freelance ou troca tecnica, o caminho mais rapido aqui e usar email, LinkedIn, GitHub ou o curriculo.',
  highlightEyebrow: 'Melhor forma de falar comigo',
  highlightTitle: 'Email e LinkedIn resolvem praticamente tudo aqui.',
  highlightDescription:
    'Neste portfolio, prefiro priorizar canais diretos em vez de depender de um fluxo fragil de envio por terceiros.',
  primaryCta: 'Enviar email',
  secondaryCta: 'Copiar email',
} as const

export type ContactMethodId = 'email' | 'linkedin' | 'github' | 'resume'

export type ContactMethod = {
  id: ContactMethodId
  title: string
  description: string
  cta: string
  download?: boolean
}

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'email',
    title: 'Email direto',
    description: 'Canal mais objetivo para propostas, freelas e oportunidades.',
    cta: 'Abrir email',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Bom para conversas profissionais, networking e vagas.',
    cta: 'Abrir LinkedIn',
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Onde voce pode ver meu codigo, projetos e historico tecnico.',
    cta: 'Ver GitHub',
  },
  {
    id: 'resume',
    title: 'Curriculo',
    description: 'Resumo direto da minha experiencia, stack e trajetoria.',
    cta: 'Baixar curriculo',
    download: true,
  },
] as const
