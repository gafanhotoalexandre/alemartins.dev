# Alexandre Martins — portfólio

Site estático para `https://alemartins.dev.br/`, baseado na direção visual aprovada da POC v4. HTML5, Vite Vanilla TypeScript e Tailwind CSS v4; sem backend, framework de componentes ou variáveis de ambiente.

## Estrutura do projeto

```text
novo_portfolio/
├── index.html
├── assets/
│   └── alexandre-martins.png
├── src/
│   ├── styles.css
│   └── main.ts
├── public/
│   ├── favicon.svg
│   ├── social-card.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── font-licenses/
├── scripts/
│   ├── social-card.mjs
│   └── lighthouse.mjs
├── tests/
│   └── portfolio.spec.ts
├── docs/
│   └── publication.md
├── vite.config.ts
├── tsconfig.json
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .node-version
├── .gitignore
└── README.md
```

### A página: HTML, CSS e TypeScript

`index.html` é a página inteira: cabeçalho, hero, sobre, experiência, projetos, tecnologias, contato e rodapé. Contém os textos, links, marcação acessível, ícones SVG e mockups dos projetos. Esses mockups são construídos com HTML/CSS e dados fictícios; não são capturas dos aplicativos nem aplicações funcionando dentro do portfólio. O `<head>` reúne título, descrição, canonical, metadados de compartilhamento e preload das fontes principais.

`src/styles.css` reúne a identidade visual. Começa pela integração Tailwind e declarações `@font-face`; em seguida vêm a paleta clara/escura, estilos das seções e controles, regras responsivas e de movimento reduzido. As classes utilitárias do Tailwind no HTML cuidam de ajustes pontuais, como `flex`, margens e alinhamentos. Classes próprias, como `hero-layout`, `project-card` e `portrait-composition`, preservam as composições da v4. `@source` limita a geração do Tailwind ao HTML de produção.

`src/main.ts` contém somente interações no navegador: alternância e persistência do tema, acompanhamento da preferência do sistema, abertura/fechamento do menu móvel, gestão de foco, cópia do e-mail, ano do rodapé e revelação de seções ao entrar na tela. Não monta a página nem carrega conteúdo de APIs. Os elementos são buscados por seus IDs/classes; ao renomeá-los no HTML, conferir os seletores deste arquivo e os testes.

Há um pequeno JavaScript no `<head>` do HTML de propósito: ele escolhe o tema antes de a página aparecer e informa ao CSS que JavaScript está disponível. Deixar essa preparação somente no módulo TypeScript poderia causar uma breve troca de tema ou deslocamento da navegação durante o carregamento. O módulo configura os botões depois. Sem JavaScript, o conteúdo continua presente, a navegação fica visível e os controles que dependem dele ficam ocultos.

### Imagens, fontes e arquivos públicos

`assets/alexandre-martins.png` é a fotografia. Como é referenciada pelo HTML, o Vite a inclui no build com um nome contendo hash. O hash permite distinguir versões do arquivo em cache. Não há dependência de hospedagem externa para a fotografia.

`public/` contém arquivos copiados sem transformação para a raiz de `dist/`:

| Arquivo | Função |
| --- | --- |
| `favicon.svg` | Ícone da aba do navegador. |
| `social-card.png` | Imagem 1200 × 630 usada ao compartilhar o link. É um ativo de produção, mesmo tendo um gerador. |
| `robots.txt` | Informa as regras para robôs e a localização do sitemap. |
| `sitemap.xml` | Lista a URL canônica do site; âncoras das seções não são páginas separadas. |
| `font-licenses/` | Licenças de redistribuição das fontes usadas no site. |

Os WOFF2 das fontes vêm dos pacotes Fontsource instalados pelo npm. O CSS aponta para esses arquivos, e o Vite os coloca em `dist/assets/`. O visitante baixa as fontes da própria hospedagem do portfólio; não acessa Google Fonts ou npm.

### Ferramentas e configurações

| Arquivo | Função |
| --- | --- |
| `package.json` | Nome do projeto, requisitos de Node/npm, comandos e dependências de desenvolvimento. `private: true` evita publicar acidentalmente um pacote no npm; não impede publicar o código no GitHub. |
| `package-lock.json` | Registra as versões exatas e integridade das dependências. Deve acompanhar o código no GitHub; `npm ci` o utiliza para instalações reproduzíveis. |
| `.node-version` | Indica Node 24 para ferramentas que reconhecem esse arquivo. |
| `vite.config.ts` | Ativa o plugin Tailwind v4 e define `dist/` como saída do build. |
| `tsconfig.json` | Define verificação estrita de tipos, recursos do navegador e módulos. `noEmit` deixa a geração do JavaScript a cargo do Vite. Cobre `src/` e a configuração Vite. |
| `playwright.config.ts` | Configura o navegador, a pasta de testes, relatórios, traces de falhas e o preview na porta 4173. |
| `.gitignore` | Exclui dependências locais, builds, caches, resultados de testes, logs e possíveis arquivos de ambiente do versionamento. |

As dependências ficam em `devDependencies` porque servem à compilação, fontes, formatação e verificações. Não há servidor Node ou biblioteca de aplicação a instalar na hospedagem após o build. Prettier apenas formata arquivos; não substitui TypeScript, testes ou uma análise de código.

### Scripts auxiliares e testes

`scripts/` contém ferramentas executadas por Node na sua máquina. Elas não são carregadas pelo visitante:

- `social-card.mjs` abre o preview com Playwright, usa o CSS e fontes carregados pelo site, monta a composição de compartilhamento em uma página temporária e salva `public/social-card.png`. O texto dessa composição está no próprio script: se mudar o título, atualize-o também. Não altera o conteúdo do portfólio aberto aos visitantes.
- `lighthouse.mjs` abre um navegador, mede a versão servida em `http://127.0.0.1:4173/` nos perfis móvel e desktop e grava relatórios HTML/JSON. Não publica o site nem envia mensagens.

`tests/portfolio.spec.ts` é a suíte Playwright. Executa 19 cenários sobre o build: dez combinações de largura/tema com axe e verificações de layout/recursos, além de testes de tema, menu, e-mail, armazenamento bloqueado, movimento reduzido, teclado, ausência de JavaScript, metadados e reflow equivalente a 200%. Os testes simulam sucesso/falha da área de transferência; não enviam e-mail e não executam os projetos apresentados no portfólio. Playwright transpila o TypeScript da suíte ao executá-la; o `typecheck` do projeto não abrange esse arquivo.

`docs/publication.md` registra as fontes das descrições dos projetos, decisões editoriais, validações executadas, resultados e limitações. É documentação de referência, não configuração nem conteúdo servido pelo site.

## Como o código vira o site publicado

1. `npm ci` instala em `node_modules/` as versões do lockfile.
2. `npm run dev` inicia o servidor Vite, que processa TypeScript/CSS e atualiza a página durante a edição. Use a URL impressa no terminal; abrir o HTML diretamente pelo explorador não equivale a executar o projeto.
3. `npm run build` verifica os tipos, compila TypeScript para JavaScript, gera/minifica o CSS Tailwind e customizado, trata os ativos e escreve o resultado em `dist/`.
4. `npm run preview` permite conferir esse resultado localmente. Editar o código-fonte não atualiza o preview até um novo build.
5. A hospedagem recebe apenas o conteúdo de `dist/`. O navegador lê o HTML, aplica o CSS e executa o pequeno JavaScript de interações. Não há React, Angular, SSR, banco de dados ou geração de conteúdo em runtime.

## Executar

Requisitos: Node 24 LTS e npm 11 ou superior.

```sh
npm ci
npm run dev
```

Para verificar e visualizar a versão publicável:

```sh
npm run typecheck
npm run build
npm run preview
```

O preview usa `http://127.0.0.1:4173/`. O build produz `dist/`, que é o único diretório a publicar. `vite preview` serve para verificação local, não como servidor de produção.

## Atualizar o site

- **Conteúdo:** editar `index.html`. Textos, contatos e projetos são HTML estático e não dependem de JavaScript. A cópia do e-mail lê o próprio `mailto:`.
- **Visual:** editar `src/styles.css`. A paleta está nas variáveis CSS no início do arquivo; regras específicas do site ficam depois dos imports e fontes. O Tailwind examina somente o HTML de produção, excluindo testes e ferramentas.
- **Interações:** editar `src/main.ts`. O pequeno script no `<head>` aplica o tema antes da pintura e prepara o layout com JavaScript disponível; mantenha as cores e a chave `am-theme` consistentes nos dois lugares.
- **Imagem:** `assets/alexandre-martins.png` é importada pelo Vite, que gera o nome com hash. Fontes WOFF2 são fornecidas pelos pacotes Fontsource e servidas localmente; licenças ficam em `public/font-licenses/`.
- **SEO:** editar os metadados no HTML e os arquivos de `public/`. Se o domínio mudar, atualizar canonical, URLs sociais, robots e sitemap juntos.

`npm run format` formata o código da versão de produção e suas verificações.

## O que acompanhará o código no GitHub

Versionar os arquivos da árvore acima, incluindo fotografia, imagem social, licenças, documentação e `package-lock.json`. Não é necessário manter cópias compiladas, POCs antigas ou capturas de revisão junto ao código-fonte.

`node_modules/` pode permanecer na sua máquina: contém as dependências instaladas e está ignorado pelo Git. `dist/`, `.cache/`, `test-results/` e `playwright-report/` são gerados localmente e também estão ignorados. Eles foram removidos na organização da pasta e serão recriados pelos comandos correspondentes. Quando testar uma alteração, gere o build antes de rodar a suíte.

O `.gitignore` será aplicado quando você criar o repositório Git. Se enviar arquivos manualmente pelo navegador do GitHub, escolha somente os arquivos de fonte listados acima; o upload manual não usa o `.gitignore` da pasta local. Esta organização não cria repositório ou deploy.

## Verificações de navegador

Depois do build:

```sh
npm run test:install
npm test
```

O Playwright inicia o preview automaticamente se a porta 4173 estiver livre. Os testes cobrem responsividade, recursos, axe, temas, navegação, teclado, cópia, falhas de armazenamento, redução de movimento e uso sem JavaScript. Relatórios e screenshots ficam em `test-results/` e `playwright-report/`, ignorados pelo Git.

É possível usar um navegador instalado. No PowerShell, para o Edge:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm test
```

Para medir com Lighthouse, mantenha `npm run preview` em outro terminal e execute `npm run audit:performance`. O script usa Chromium do Playwright, ou o navegador indicado por `PLAYWRIGHT_CHANNEL`/`CHROME_PATH`, e salva HTML e JSON em `test-results/lighthouse/`. As medições locais não representam dados de visitantes reais.

A imagem social já está pronta em `public/social-card.png`. Se o título ou a identidade mudar, execute `node scripts/social-card.mjs` com o preview ativo e depois repita o build. O gerador usa as fontes e o CSS do site.

## Publicação

Configuração da hospedagem estática:

| Campo | Valor |
| --- | --- |
| Comando de instalação | `npm ci` |
| Comando de build | `npm run build` |
| Diretório publicado | `dist` |
| Node | 24 LTS |
| Variáveis de ambiente | Nenhuma |

Não é necessário fallback de SPA ou execução de Node na hospedagem. Não publicar a pasta inteira do projeto, POCs, dependências ou relatórios de teste. Em previews públicos, configurar `X-Robots-Tag: noindex` na hospedagem para evitar indexação de cópias; o robots entregue é para o domínio de produção.

Antes do deploy, escolher a hospedagem, confirmar a configuração de domínio/HTTPS e autorizar a substituição do site atual. Após publicar, conferir URLs, canonical, imagem social e contato no domínio real. Nenhum deploy ou alteração de DNS foi feito nesta entrega.

O resultado da validação e as fontes das descrições estão em [docs/publication.md](docs/publication.md). O futuro site `io.alemartins.dev.br` pertence a outro projeto.
