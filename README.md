# Alexandre Martins | Portfólio

Aplicação de portfólio desenvolvida com React, TypeScript e Vite para apresentar projetos, experiência profissional, habilidades e canais de contato. O foco deste repositório é manter uma base enxuta, estável e fácil de evoluir, adequada para deploy contínuo na Vercel.

## Visão geral

O projeto entrega uma navegação em seções com sidebar fixa, destaque para projetos selecionados, timeline de experiência, resumo técnico, currículo para download e uma seção de contato centrada em canais diretos.

Observação: a rota pessoal ligada à página LiaLetter existe no repositório, mas não faz parte do escopo técnico principal deste portfólio.

## Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS
- React Router 7
- Sonner
- Lucide React

## Funcionalidades

- Apresentação profissional com CTA para projetos e contato
- Navegação lateral fixa entre seções
- Lista de projetos em destaque com detalhes dinâmicos
- Seção de habilidades segmentada por categoria
- Timeline de experiência profissional
- Download direto de currículo
- Seção de contato com canais diretos e confiáveis
- Layout responsivo para desktop e mobile

## Estrutura principal

- `src/pages/Portfolio.tsx`: casca principal do portfólio
- `src/components/Sidebar`: navegação lateral e links externos
- `src/components/Sections`: seções de conteúdo do portfólio
- `src/utils/constants.ts`: dados estáticos de projetos, skills e perfil
- `src/components/Sections/Contact`: canais de contato diretos e CTA profissional

## Requisitos

- Node.js 20 LTS recomendado
- npm 10+ recomendado

Node 18.18+ ainda é compatível com a toolchain atual, mas Node 20 tende a reduzir atrito com dependências modernas de build e lint.

## Instalação

```bash
git clone https://github.com/gafanhotoalexandre/alemartins.dev.git
cd alemartins.dev
npm install
```

## Variáveis de ambiente

No estado atual do projeto, não há variáveis de ambiente obrigatórias para rodar o portfólio localmente.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Desenvolvimento local

Para iniciar em modo desenvolvimento:

```bash
npm run dev
```

O Vite exibirá a URL local no terminal, normalmente `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

Esse script executa primeiro a checagem de TypeScript e depois gera o bundle de produção com Vite.

## Deploy

O projeto está preparado para deploy na Vercel.

- O arquivo `vercel.json` mantém o rewrite necessário para SPA.
- O comando de build esperado é `npm run build`.

## Decisões de implementação

- Estrutura simples por seções para evitar overengineering
- Estado local suficiente para a navegação principal do portfólio
- Dados estáticos centralizados em constantes para manutenção rápida
- Contato centrado em canais diretos, sem dependência de serviços frágeis de envio
- Tema visual fixo escuro, coerente com a identidade atual da interface

## Upgrade de dependências

O projeto foi mantido em versões estáveis e conservadoras.

- React permanece em 18 para priorizar baixo risco
- Vite permanece na linha 6 estável
- Dependências adjacentes de build e lint podem receber updates de patch e minor com validação por lint e build
- Upgrades de major, como React 19, Vite 7+ ou Tailwind 4, devem ser tratados como uma etapa separada

## Contato

- LinkedIn: https://www.linkedin.com/in/alemartins-lima/
- GitHub: https://github.com/gafanhotoalexandre
- Site: https://alemartins.dev.br

## Licença

Este repositório é de uso pessoal como portfólio profissional.
