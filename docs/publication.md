# Preparação para publicação

## Conteúdo e fontes — 12/10/2026

A pós-graduação está em andamento, conforme confirmação de Alexandre. O contato principal escolhido é `alexandrevmartinsdelima@gmail.com`. Não foi enviado e-mail de teste.

A experiência usa exclusivamente responsabilidades gerais autorizadas no briefing: trabalho em equipe, funcionalidades entre interface e API, integrações/processamento, persistência e manutenção/revisão. Não identifica empresa, produto interno ou módulo; não reproduz código proprietário, métricas, estruturas de dados ou fluxos internos.

Os repositórios foram consultados pela conexão GitHub, incluindo árvore, README e arquivos de implementação. Esta foi uma inspeção estática: não executamos os projetos, suas bases ou seus serviços, nem afirmamos validar seu comportamento em produção.

| Projeto | Evidência examinada | Resultado no portfólio |
| --- | --- | --- |
| CustomersHub | [Controller](https://github.com/gafanhotoalexandre/customers-hub/blob/master/src/CustomersHub.API/Controllers/CustomerController.cs), projeto `net8.0`, registro de MediatR/FluentValidation, repositório EF Core e configuração SQLite | Cadastro, consulta, atualização e exclusão presentes no código. Mockup corrigido para `/api/Customer`, lista e ID numérico; removidas paginação e resposta inventada com `data`/`total`. Não alegamos autenticação ou testes automatizados. |
| Project Finance | [Rotas](https://github.com/gafanhotoalexandre/finances/blob/main/src/routes/index.tsx), [serviços financeiros](https://github.com/gafanhotoalexandre/finances/blob/main/src/lib/finance.ts), autenticação/store, migrations de foundation e reservas | Dashboard mensal, convites e reservas têm implementação; React, Supabase e Zustand confirmados. As migrations incluem regras por workspace. Não alegamos auditoria de segurança, aplicação das migrations a uma base ativa ou validação funcional da instância. |
| RecoveryFit | [Store](https://github.com/gafanhotoalexandre/recovery-fit/blob/main/src/features/recovery-fit/store.ts), [gerador Markdown](https://github.com/gafanhotoalexandre/recovery-fit/blob/main/src/features/recovery-fit/lib/export-report.ts), drawer do relatório e dependências | Persistência via Zustand/localStorage, registro de séries e geração/cópia Markdown da sessão atual confirmados. O texto não promete histórico, backend ou sincronização. |

Identificadores das árvores examinadas (não são SHAs de commit): CustomersHub `678c4b1b1a5bef20e2ef2ed682472538a007c60b`; Finance `710501fc55f438d60c24c5de8f7297dea4c13872`; RecoveryFit `f9eca2c37392ecf92f6aed7705ead114be54b0f9`.

As ilustrações seguem sendo conceituais, com dados fictícios e identificação visível. Repositórios e perfil GitHub foram acessados. O LinkedIn não pôde ser carregado pela ferramenta web; a URL coincide com o currículo e com o link exposto no perfil GitHub, mas a página ainda requer conferência no navegador do proprietário.

## Implementação

- Vite, TypeScript estrito e Tailwind v4 compilado; conteúdo estático, estilos e interações separados.
- Identidade da v4 mantida, com CSS duplicado consolidado, alvos de toque ampliados e contraste dos textos dos mockups corrigido.
- Fontes locais com licenças, favicon, canonical, metadados sociais, imagem 1200 × 630, robots e sitemap.
- Fotografia PNG mantida: 36.808 bytes. WebP sem perdas mediu 194.576 bytes e preservou os pixels; não trouxe benefício. Não se afirma uma comparação com todos os níveis de compressão com perdas.
- Navegação acessível sem JavaScript e controles expostos somente após inicialização. Tema aplicado antes da pintura, evitando que a navegação de fallback provoque deslocamento durante a inicialização normal.

## Validações

Executadas em 12/10/2026, no Windows, com Node 24.14.0/npm 11.11.1 e Microsoft Edge 155.0.4283.45 em modo headless. Ferramentas: Playwright 1.64.0, axe-core 4.13.0 e Lighthouse 13.5.0. O lockfile registra as versões exatas das dependências.

| Verificação | Resultado |
| --- | --- |
| Instalação limpa | `npm ci --offline --no-audit --no-fund --cache .cache/npm` passou usando o cache populado na instalação inicial pelo registro npm. Não é necessário usar essas opções para instalar normalmente. |
| Tipos e build | `npm run build`, incluindo `tsc --noEmit`, passou. Saída somente estática em `dist/`, sem POCs, fontes remotas, Play CDN ou dependências de runtime. |
| Servidor de desenvolvimento | `npm run dev -- --port 5173 --strictPort` iniciou; página retornou HTTP 200, fontes carregaram e não houve erro de console/página no smoke test. |
| Navegador | 19 testes passaram sobre o build de produção. Incluem os dois temas nas larguras 320, 375, 768, 1024 e 1440 px; ausência de overflow e títulos cortados; recursos e metadados; persistência/preferência do tema; menu, Escape, clique externo, âncoras e resize; cópia com sucesso/rejeição; armazenamento bloqueado; mudança para movimento reduzido; teclado e JavaScript desativado. |
| Acessibilidade automatizada | Nenhuma violação do axe nas regras WCAG 2 A/AA, 2.1 AA e 2.2 AA incluídas nos testes das dez combinações de largura/tema. Isso não equivale a certificação ou teste com leitor de tela. |
| Revisão visual e teclado | Inspecionadas capturas das cinco larguras nos dois temas, incluindo hero, experiência, projetos e contato. Inspecionado foco da navegação por teclado e do skip link; corrigidos contraste dos mockups e alinhamento da hero sob o header após o salto para o conteúdo. |
| Reflow de 200% | Testado equivalente de viewport física 1440px a 200%: layout de 720 CSS px, escala de dispositivo 2. Navegação e contato permaneceram utilizáveis, sem overflow. Não foi usado o controle nativo de zoom do navegador. |
| Recursos e links | Recursos locais carregaram sem HTTP 4xx/5xx ou erros de console nas dez combinações. Repositórios e perfil GitHub acessíveis; LinkedIn com limitação de acesso descrita acima. |

Última medição Lighthouse, em 12/10/2026 às 13h58 (Fortaleza), contra `http://127.0.0.1:4173/`:

| Perfil | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Móvel | 99 | 100 | 100 | 100 | 1,8 s | 0 | 0 ms |
| Desktop | 100 | 100 | 100 | 100 | 0,4 s | 0 | 0 ms |

O perfil móvel usou a simulação padrão do Lighthouse (CPU 4×, RTT 150 ms, throughput 1.638,4 Kbps). O desktop usou viewport 1350 × 940, CPU 1×, RTT 40 ms e throughput 10.240 Kbps. São medições locais com throttling simulado, não dados de campo, testes de todos os navegadores ou garantia de notas após publicação. A prévia não contém scripts de analytics ou serviços externos.

Na validação, os relatórios HTML/JSON foram gerados em `test-results/lighthouse/`, o relatório Playwright em `playwright-report/` e capturas de referência em `previews/`. Esses artefatos foram removidos na organização da pasta para o futuro repositório. Os resultados históricos acima foram preservados; novos relatórios podem ser gerados pelos comandos documentados no README. Não integram `dist/`.

Na saída validada em 12/10/2026, o JavaScript mede 3,43 KB (1,59 KB gzip) e o CSS 22,92 KB (6,38 KB gzip), conforme o build Vite. A imagem social tem 1200 × 630. O projeto está tecnicamente preparado para hospedagem estática; a configuração e verificação do domínio real permanecem para a etapa de publicação.

## Pendências para publicação

- Escolher hospedagem e autorizar deploy/substituição do site atual e eventuais alterações de DNS.
- Configurar e conferir HTTPS, redirecionamento para o domínio canônico e compressão/cache de recursos na hospedagem.
- Conferir acesso ao LinkedIn. O recebimento de e-mail não foi testado; nenhum contato foi disparado.
- Repetir a conferência de links, metadados e recursos no domínio real depois do deploy.

Não foi criado um repositório Git, realizado commit, feito deploy ou alterado DNS. O domínio principal e o subdomínio de escrita não foram modificados.

## Organização para o futuro repositório — 12/10/2026

Removidos os HTMLs de POC v2/v3/v4, capturas da pasta `previews/`, especificação antiga em `docs/superpowers/`, cache npm, build e relatórios gerados. Mantidos o código de produção, fotografia, imagem social, licenças, ferramentas, testes e documentação. `node_modules/` permanece apenas como instalação local e é ignorado pelo Git. Um novo `npm run build` após a remoção das referências antigas passou; sua saída foi removida novamente para deixar a pasta sem o build gerado. Não foi repetida a suíte de navegador, pois essa organização não alterou o comportamento do site.

## Paralelo e consistência da marca — 16/10/2026

Paralelo substituiu RecoveryFit no terceiro cartão, conforme solicitação de Alexandre. As referências a RecoveryFit acima documentam a versão de 12/10; não representam a seleção atual. Mantidos CustomersHub e Project Finance, a composição, a paleta e o conteúdo profissional.

### Fontes e conteúdo

Inspecionados [README](https://github.com/gafanhotoalexandre/paralelo-app/blob/main/README.md), [dependências](https://github.com/gafanhotoalexandre/paralelo-app/blob/main/package.json), [motor de comparação](https://github.com/gafanhotoalexandre/paralelo-app/blob/main/src/core/comparison.ts), [Worker](https://github.com/gafanhotoalexandre/paralelo-app/blob/main/src/workers/comparison.worker.ts), [cliente do Worker](https://github.com/gafanhotoalexandre/paralelo-app/blob/main/src/workers/client.ts), [editor](https://github.com/gafanhotoalexandre/paralelo-app/blob/main/src/components/JsonEditor.tsx) e [inspector](https://github.com/gafanhotoalexandre/paralelo-app/blob/main/src/components/Inspector.tsx). Árvore examinada: `65a9ff10c78d0bba766784c90583032c2d2bcdc3` (identificador de árvore, não de commit).

Confirmados React, TypeScript e CodeMirror, modos estrutural/conteúdo, processamento em Web Worker e navegação pelos trechos alterados. O cartão usa a descrição proposta, links para aplicação/código-fonte e ilustração conceitual de dois JSONs fictícios. Removidos o mockup e os estilos exclusivos do RecoveryFit. Não se afirma backend, auditoria de segurança ou validação integral do Paralelo.

O favicon anterior usava Georgia em negrito. Agora contém curvas dos glifos de DM Sans no peso 800, a mesma família/peso da marca no cabeçalho, com ajuste de tamanho e espaçamento para o ícone. O cabeçalho mantém sua tipografia e composição. FontTools foi usado temporariamente para extrair as curvas do WOFF2 existente; não foi adicionado às dependências do projeto. A licença de DM Sans permanece em `public/font-licenses/DM-Sans.txt`.

### Verificações desta alteração

- `npm run build` passou, incluindo TypeScript estrito. JavaScript: 3,43 KB (1,59 KB gzip); CSS: 23,22 KB (6,44 KB gzip).
- Os 19 cenários Playwright passaram com Edge 155.0.4283.45, em modo headless. Nenhuma violação do axe nas dez combinações já descritas. Foi corrigida uma expectativa antiga do teste de título: o HTML atual usa hífen; a página foi preservada.
- Inspecionadas visualmente as capturas do cartão em 1440 e 320 px e a renderização do SVG. Conferidos os destinos dos links e a ausência de RecoveryFit no HTML publicado. As dez combinações de tema/largura também verificaram recursos e layout.
- A aplicação pública retornou HTTP 200. Conferência limitada com o exemplo fictício: cinco diferenças estruturais, sete ao comparar conteúdo e abertura do detalhe de `/ativo`. Não foram executadas as suítes do repositório Paralelo nem auditados todos os fluxos. Nenhum dado privado foi usado.
- Lighthouse não foi repetido; as notas de 12/10 acima são históricas. Não houve deploy do portfólio, criação de repositório ou alteração de DNS.
