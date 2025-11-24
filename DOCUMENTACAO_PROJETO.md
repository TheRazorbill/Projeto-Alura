# Documentação Completa do Projeto English for Devs | Dicionário Técnico

Este documento tem como objetivo fornecer uma visão didática e aprofundada sobre a estrutura, funcionamento e componentes do Projeto English for Devs. Abordaremos desde a organização dos arquivos até o detalhamento das funções e estilos utilizados, facilitando a compreensão para desenvolvedores de todos os níveis.

## 1. Introdução ao Projeto

O **English for Devs** é uma ferramenta educacional desenvolvida para reduzir a barreira linguística na programação, conectando o significado literal de termos técnicos (ex: *Fetch* = "Ir buscar") à sua função lógica no código, tornando o aprendizado mais intuitivo para desenvolvedores brasileiros. Esta aplicação web interativa demonstra conceitos de desenvolvimento front-end, utilizando HTML, CSS e JavaScript para criar uma experiência rica e dinâmica. Ele foi submetido como parte da **Imersão Dev com Google Gemini e Alura**, focado no uso eficiente de tecnologias web fundamentais e Inteligência Artificial.

A aplicação resolve a dificuldade que muitos iniciantes enfrentam com termos técnicos abstratos, fornecendo três camadas de entendimento para cada termo:
1.  **Tradução Literal:** A origem semântica da palavra no inglês cotidiano.
2.  **Explicação Técnica:** A função prática no desenvolvimento de software.
3.  **Contextualização:** Classificação gramatical e links para documentações oficiais (MDN, Git-scm, W3C).

## 2. Estrutura do Projeto

O projeto está organizado em diretórios para manter o código limpo e modular. Abaixo, detalhamos os principais diretórios e seus conteúdos:

- **assets/**: Contém recursos estáticos como imagens (e.g., [`favicon.png`](assets/favicon.png), [`gif.gif`](assets/gif.gif)) e ícones.
- **css/**: Armazena todos os arquivos de estilo CSS, separados por responsabilidade.
- **data/**: Contém arquivos de dados, como [`data.json`](data/data.json), que são utilizados pela aplicação.
- **js/**: Contém todos os arquivos JavaScript, organizados por funcionalidade.
- **README.md**: Documento de apresentação do projeto, com informações sobre o problema, solução, funcionalidades, tecnologias e instalação.

## 3. Análise Detalhada do HTML (index.html)

O arquivo [`index.html`](index.html) é a espinha dorsal da aplicação, definindo a estrutura e o conteúdo principal da página. Vamos explorar os elementos e sua finalidade.

### 3.1 Estrutura Básica

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Base de conhecimento Alura" />
    <title>English for Devs | Dicionário Tech</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/style.css" />
    <link rel="icon" href="assets/favicon.png" type="image/png" />
  </head>

  <body>
    <!-- ... restante do corpo do documento ... -->
    <script type="module" src="js/main.js"></script>
  </body>
</html>
```

- `<!DOCTYPE html>`: Declara o tipo de documento como HTML5.
- `<html lang="pt-br">`: Define o idioma da página como português do Brasil.
- `<head>`: Contém metadados sobre a página, como codificação de caracteres, viewport, título (`<title>English for Devs | Dicionário Tech</title>`), descrição (`<meta name="description" content="Base de conhecimento Alura" />`), links para folhas de estilo (`<link rel="stylesheet" href="css/style.css" />`) e ícones (`<link rel="icon" href="assets/favicon.png" type="image/png" />`). Também carrega fontes externas do Google Fonts.
- `<body>`: Contém todo o conteúdo visível da página, incluindo elementos de fundo, cabeçalho, conteúdo principal e rodapé.
- `<script type="module" src="js/main.js"></script>`: Importa o arquivo JavaScript principal como um módulo, garantindo que o script seja executado após a renderização do HTML e em um escopo modular.

### 3.2 Principais Seções e Componentes

O `index.html` é dividido em várias seções lógicas para organizar o conteúdo e as funcionalidades:

#### a. Efeitos de Fundo (`.background-effects`)

```html
<div class="background-effects">
  <div class="glow-top"></div>
  <div class="grid-pattern"></div>
  <canvas id="star-canvas"></canvas>
</div>
```
Esta seção cria um fundo dinâmico com efeitos visuais, incluindo um brilho superior, um padrão de grade e um canvas para estrelas interativas, gerenciado por JavaScript.

#### b. Cabeçalho de Navegação (`<header class="navbar">`)

```html
<header class="navbar">
  <div class="navbar-container" id="inicioA">
    <a href="#" class="logo" aria-label="Alura Home">
      <!-- SVG Logo -->
      Project Z<span class="badge">Knowledge</span>
    </a>
    <nav class="nav-center">
      <a href="#" class="nav-link active">Início</a>
      <a href="#categorias" class="nav-link">Categorias</a>
      <a href="#artigos" class="nav-link">Artigos</a>
      <a href="#flash" class="nav-link">Modo Treino</a>
      <a href="#sobre" class="nav-link">Sobre</a>
    </nav>
    <div class="nav-actions">
      <button id="theme-toggle" aria-label="Alternar Tema"></button>
      <div class="search-container">
        <input type="text" placeholder="Busque 'Merge', 'Bug'..." id="campo-busca" />
        <button id="botao-busca" type="button" aria-label="Buscar"><!-- SVG Icon --></button>
      </div>
      <button class="mobile-menu-btn" aria-label="Abrir Menu"><!-- SVG Icon --></button>
      <a href="https://github.com/TheRazorbill" class="btn-github" target="_blank" rel="noopener noreferrer">GitHub</a>
    </div>
  </div>
</header>
<div id="mobile-menu" class="mobile-menu"></div>
```
O cabeçalho (`<header>`) contém a navegação principal da aplicação.
- **Logo**: Um link para a página inicial com um ícone SVG e o texto "Project Z Knowledge".
- **Navegação Central**: Links para as diferentes seções da página (`Início`, `Categorias`, `Artigos`, `Modo Treino`, `Sobre`).
- **Ações de Navegação**:
    - `theme-toggle`: Um botão para alternar entre os temas claro e escuro.
    - `search-container`: Um campo de busca (`<input type="text" id="campo-busca">`) e um botão de busca (`<button id="botao-busca">`) para pesquisar termos.
    - `mobile-menu-btn`: Um botão para abrir o menu em dispositivos móveis.
    - `btn-github`: Um link para o perfil do GitHub do desenvolvedor.
- `mobile-menu`: Um `div` que serve como container para o menu mobile, exibido quando o botão `mobile-menu-btn` é clicado.

#### c. Conteúdo Principal (`<main>`)

A tag `<main>` engloba todas as seções de conteúdo dinâmico da aplicação:

##### i. Seção Hero (`.hero-text`)

```html
<section class="hero-text">
  <canvas id="hero-canvas"></canvas>
  <div class="pill-new"><span>Projeto Imersão Dev</span></div>
  <h1>English for <br /><span class="text-gradient">Developers</span></h1>
  <p>Não decore comandos. Entenda o significado literal por trás do código e aprenda mais rápido.</p>
  <div class="hero-cta">
    <a href="#bento-grid" class="btn-primary">Explorar Termos</a>
    <a href="https://github.com/TheRazorbill" target="_blank" class="btn-secondary">Ver no GitHub</a>
  </div>
</section>
```
Esta é a seção de destaque da página, apresentando o título principal, uma descrição concisa e chamadas para ação. Inclui também um `<canvas id="hero-canvas"></canvas>` para possíveis efeitos visuais na área hero.

##### ii. Seção de Categorias (`#categorias`)

```html
<section id="categorias" class="categories-section">
  <h2 class="section-title">Categorias</h2>
  <div class="categories-container" id="categories-container"></div>
  <button id="btn-show-more-categories" class="btn-secondary btn-sm" style="margin-top: 1rem">
    Saiba mais
  </button>
</section>
```
Exibe diferentes categorias de termos técnicos. O conteúdo dentro de `categories-container` é gerado dinamicamente via JavaScript.

##### iii. Container de Cards (`#bento-grid`)

```html
<section id="bento-grid" class="card-container"></section>
```
Um container vazio que será preenchido com cards de termos técnicos, provavelmente usando um layout de grade responsivo (bento grid).

##### iv. Seção de Artigos (`#artigos`)

```html
<section id="artigos" class="about-section">
  <h2 class="section-title">Artigos</h2>
  <p class="about-desc">Fique por dentro das últimas novidades do mundo dev direto do Dev.to.</p>
  <div class="articles-grid" id="articles-grid"></div>
</section>
```
Esta seção destina-se a exibir artigos técnicos, provavelmente consumindo dados de uma API externa (como Dev.to).

##### v. Seção de Termos Populares (`#flash`)

```html
<section class="partners-section" id="flash">
  <p class="section-label">Termos Populares</p>
  <div class="marquee-container"></div>
</section>
```
Uma seção que exibe termos populares, possivelmente em um formato de "marquee" ou rolagem.

##### vi. Seção de Flashcards (`#flashcard-section`)

```html
<section id="flashcard-section" class="flashcard-section">
  <h2 class="section-title">Modo Treino</h2>
  <div class="flashcard-container" id="flashcard-container"></div>
  <button id="next-flashcard" class="btn-primary btn-sm" style="margin-top: 1rem">
    Próximo
  </button>
</section>
```
Implementa a funcionalidade de flashcards para o modo de treino. O container de flashcards será preenchido via JavaScript, e o botão `Próximo` permite navegar entre os cards.

##### vii. Seção Sobre o Projeto (`#sobre`)

```html
<section id="sobre" class="about-section">
  <h2 class="section-title">Sobre o Projeto</h2>
  <p class="about-desc">
    O Project Z é um dicionário técnico interativo desenvolvido para
    facilitar o aprendizado de programação para desenvolvedores
    brasileiros. (...)
  </p>
  <p class="about-desc">
    Este projeto vai além de um simples glossário. Ele explica a
    etimologia e a lógica por trás de cada termo técnico (...)
  </p>
  <p class="about-desc">
    <strong>Principais características:</strong><br /><br />
    <strong>Integração com Inteligência Artificial:</strong> Utilize a
    API do Google Gemini para gerar definições precisas (...)
    <strong>Design Moderno:</strong> Interface inspirada em conceitos de
    design contemporâneo (...)
    <strong>Tecnologia Pura:</strong> Desenvolvido com HTML5, CSS3 e
    JavaScript vanilla (...)
    <strong>Objetivo:</strong> Criar uma ferramenta educacional útil
    para a comunidade brasileira de desenvolvimento (...)
  </p>
</section>
```
Uma descrição detalhada do projeto, seus objetivos, funcionalidades e tecnologias utilizadas, incluindo a integração com o Google Gemini.

#### d. Rodapé do Site (`<footer class="site-footer">`)

```html
<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-brand">
      <!-- SVG Logo -->
      <span>Project Z</span>
      <p class="footer-desc">Dicionário técnico para desenvolvedores brasileiros. Aprenda programação entendendo o significado real dos termos.</p>
      <p class="footer-copy">© 2025 TheRazorbill. Todos os direitos reservados.</p>
    </div>
    <div class="footer-links-group">
      <div class="footer-column">
        <h4>Produto</h4>
        <a href="#">Início</a>
        <a href="#categorias">Categorias</a>
        <a href="#artigos">Artigos</a>
        <a href="#sobre">Sobre</a>
      </div>
      <div class="footer-column">
        <h4>Recursos</h4>
        <a href="https://www.alura.com.br/" target="_blank" rel="noopener noreferrer">Alura</a>
        <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">MDN Web Docs</a>
        <a href="https://dev.to/" target="_blank" rel="noopener noreferrer">Dev.to</a>
        <a href="https://stackoverflow.com/" target="_blank" rel="noopener noreferrer">Stack Overflow</a>
      </div>
      <div class="footer-column">
        <h4>Comunidade</h4>
        <a href="https://github.com/TheRazorbill" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/rahian/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter (nem tenho)</a>
        <a href="https://discordapp.com/users/415596943444541441" target="_blank" rel="noopener noreferrer">Discord</a>
      </div>
      <div class="footer-column">
        <h4>Tecnologias</h4>
        <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer">Google Gemini</a>
        <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">JavaScript</a>
        <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML" target="_blank" rel="noopener noreferrer">HTML5</a>
        <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS" target="_blank" rel="noopener noreferrer">CSS3</a>
      </div>
    </div>
  </div>
</footer>
```
O rodapé contém informações sobre a marca, descrição do projeto, direitos autorais e links agrupados em colunas para "Produto", "Recursos", "Comunidade" e "Tecnologias".

## 4. Análise Detalhada do CSS

O diretório [`css/`](css/) contém uma série de arquivos CSS, cada um com uma responsabilidade específica, promovendo a modularidade e a manutenibilidade do código.

### 4.1 Arquivos CSS Principais

- [`reset.css`](css/reset.css): Este arquivo ([`css/reset.css`](css/reset.css)) é crucial para garantir a consistência visual entre diferentes navegadores. Ele zera ou normaliza estilos padrão de elementos HTML (como margens, paddings, tamanhos de fonte) para que o projeto comece com uma base limpa e controlada. Por exemplo, ele define `margin: 0; padding: 0;` para todos os elementos, e `box-sizing: border-box;` para facilitar o controle do layout.

- [`variables.css`](css/variables.css): Este arquivo ([`css/variables.css`](css/variables.css)) define variáveis CSS (custom properties) globais, o que é fundamental para a manutenção e a theming da aplicação. Ele centraliza a definição de cores, fontes, tamanhos de espaçamento e propriedades de borda, permitindo que alterações no tema (claro/escuro) sejam aplicadas facilmente através do atributo `data-theme`.

    Exemplo de variáveis de tema:
    ```css
    :root {
        --bg-dark: #060010;
        --text-main: #ffffff;
        --primary: #8a2be2;
        /* ... outras variáveis ... */
    }

    [data-theme="light"] {
        --bg-dark: #f8fafc;
        --text-main: #0f172a;
        /* ... override de variáveis para o tema claro ... */
    }
    ```

- [`style.css`](css/style.css): Atua como o stylesheet principal, importando todos os outros arquivos CSS para um ponto centralizado ([`css/style.css`](css/style.css)). Ele também pode conter estilos globais para o `body` e elementos de texto que não são específicos de componentes ou layout.

    Exemplo de imports:
    ```css
    @import 'variables.css';
    @import 'reset.css';
    /* ... outros imports ... */
    ```

- [`layout.css`](css/layout.css): Responsável por definir a estrutura geral e o posicionamento dos elementos na página ([`css/layout.css`](css/layout.css)). Utiliza `Flexbox` e `Grid Layout` para criar layouts responsivos. Contém estilos para o `navbar`, `main`, `footer` e as seções principais da página, garantindo que o conteúdo se adapte a diferentes tamanhos de tela.

    Exemplo de Grid Layout para `#bento-grid`:
    ```css
    #bento-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
        /* ... */
    }
    @media (max-width: 1024px) {
        #bento-grid {
            grid-template-columns: 1fr 1fr;
        }
    }
    ```

- [`components.css`](css/components.css): Estiliza componentes reutilizáveis da interface do usuário ([`css/components.css`](css/components.css)), como logos, links de navegação, botões (`.btn-primary`, `.btn-secondary`), cards (`.card`), tags (`.tag`) e o campo de busca. Este arquivo promove a consistência visual e a reutilização de estilos em toda a aplicação.

    Exemplo de botão primário:
    ```css
    .btn-primary {
        background: linear-gradient(to bottom, #a855f7, #9333ea);
        color: white;
        box-shadow: 0 10px 20px -5px rgba(147, 51, 234, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px 24px;
        border-radius: 10px;
        font-weight: 600;
        text-decoration: none;
        transition: transform 0.2s;
    }
    ```

- [`animations.css`](css/animations.css): Contém as definições de animações CSS keyframe e transições ([`css/animations.css`](css/animations.css)). Utilizado para criar efeitos visuais como `fadeIn` para elementos que surgem na tela e `scroll` para elementos em movimento contínuo (e.g., o marquee de termos populares).

    Exemplo de animação `fadeIn`:
    ```css
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    ```

- [`flashcards.css`](css/flashcards.css): Contém estilos específicos para a funcionalidade de flashcards ([`css/flashcards.css`](css/flashcards.css)), incluindo a estrutura 3D e a animação de "virar" o card. Define as propriedades para `perspective`, `transform-style`, `backface-visibility` e a transição `transform` para criar o efeito de flip.

    Exemplo de estilos para flashcard:
    ```css
    .flashcard {
        width: 300px;
        height: 200px;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.6s;
        cursor: pointer;
    }

    .flashcard.flip {
        transform: rotateY(180deg);
    }
    ```

### 4.2 Conceitos CSS Abordados

- **Reset CSS**: Por que é importante e como funciona. Garante uma base consistente em todos os navegadores, removendo margens, paddings e outros estilos padrão.
- **Variáveis CSS (Custom Properties)**: Vantagens da utilização para temas e manutenção. Permitem a definição de valores reutilizáveis (cores, fontes) e facilitam a criação de temas (claro/escuro) dinâmicos.
- **Modelo de Caixa**: Explicação de `margin`, `padding`, `border` e `content`. Entendimento fundamental de como os elementos ocupam espaço e como o espaçamento é calculado.
- **Seletores CSS**: Tipos de seletores (classes, IDs, elementos, atributos, pseudo-classes, pseudo-elementos). Demonstra como selecionar elementos de forma precisa para aplicar estilos.
- **Flexbox e Grid Layout**: Como são utilizados para construir layouts responsivos e complexos de forma eficiente e semântica. Vistos em [`layout.css`](css/layout.css) e [`components.css`](css/components.css).
- **Responsividade**: Uso de `media queries` para adaptar o layout a diferentes tamanhos de tela. Exemplos podem ser encontrados em [`layout.css`](css/layout.css) e [`components.css`](css/components.css) para ajustar o navbar, o hero e o grid.
- **Animações e Transições**: Propriedades como `transition`, `animation`, `@keyframes`. Utilizadas para criar movimentos suaves e efeitos visuais, como o `fadeIn` e o scroll do marquee.
- **`backdrop-filter`**: Propriedade CSS utilizada para aplicar efeitos gráficos (como blur) na área atrás de um elemento, dando um efeito de "vidro fosco" (glassmorphism), presente no `navbar` e nas seções como a `about-section`.
- **`mask-image`**: Utilizada para criar efeitos de máscara em elementos, como o gradiente de transparência no `.grid-pattern` e no `.marquee-container`, que faz com que o conteúdo pareça desvanecer nas bordas.
- **`-webkit-text-stroke`**: Propriedade não-padrão (webkit-specific) utilizada para adicionar um contorno ao texto, como visto no `.marquee-content span` para criar um efeito de texto vazado.

## 5. Análise Detalhada do JavaScript

O diretório [`js/`](js/) abriga a lógica interativa da aplicação, com arquivos organizados por funcionalidade.

### 5.1 Arquivos JavaScript Principais

- [`main.js`](js/main.js): Este é o arquivo principal que orquestra a inicialização de outros módulos JavaScript.
    - **Funções**:
        - `initMobileMenu()`: Gerencia a abertura e fechamento do menu mobile, clonando os links de navegação e o botão de tema do desktop para o menu mobile e adicionando os event listeners necessários.
        - `DOMContentLoaded` listener: Garante que o DOM esteja completamente carregado antes de inicializar o tema, os canvas, a UI, o menu mobile e os flashcards.
    - **Conceitos Importantes**: Importação de módulos (`import`), manipulação básica do DOM, event listeners para interatividade.

- [`ui.js`](js/ui.js): Responsável por toda a interação e renderização da interface do usuário, incluindo a busca, exibição de cards, categorias e artigos.
    - **Funções**:
        - `initUI()`: Função assíncrona que inicializa a UI, buscando os dados do dicionário e artigos, e renderizando os componentes iniciais.
        - `loadMarquee(dados)`: Cria e preenche o componente de "marquee" (rolagem infinita) com termos populares.
        - `renderCards(dados)`: Renderiza os cards de termos técnicos no `#bento-grid`, aplicando estilos de tag e links dinâmicos.
        - `updateShowMoreButton(totalItems)`: Gerencia a visibilidade e funcionalidade do botão "Carregar mais termos".
        - `initSearch()`: Configura a funcionalidade de busca em tempo real para o campo de busca (`#campo-busca`).
        - `performSearch(termo)`: Filtra os dados com base no termo de busca (considerando termo, tradução literal e explicação técnica) e re-renderiza os cards.
        - `initCategories()`: Popula o container de categorias com pills clicáveis que ativam a busca por categoria.
        - `initArticlesUI()`: Busca artigos externos (via Dev.to API) e os renderiza em cards na seção de artigos.
    - **Conceitos Importantes**: Manipulação do DOM (criação e inserção de elementos), consumo de APIs (`fetch`), filtragem de dados (`.filter()`, `.map()`, `.slice()`), event listeners, funções assíncronas (`async/await`).

- [`gerador.js`](js/gerador.js): Este arquivo é um script Node.js auxiliar, utilizado para gerar a base de conhecimento (`data/data.json`) através da API do Google Gemini. **Não é executado no navegador.**
    - **Funções**:
        - `generateNewKnowledge(existingKnowledge)`: Faz uma requisição à API do Gemini para gerar novos termos técnicos com base em um prompt e um esquema de resposta JSON. Inclui lógica de retentativa com delay.
        - `main()`: Função principal do script Node.js, responsável por ler o arquivo `data.json` existente, chamar `generateNewKnowledge`, e salvar a base de conhecimento atualizada.
    - **Conceitos Importantes**: Requisições HTTP (`fetch` no Node.js), manipulação de arquivos (`fs/promises`), variáveis de ambiente (`process.env`), JSON Schema, tratamento de erros, prompts para IA.

- [`canvas.js`](js/canvas.js): Gerencia a renderização de elementos gráficos nos elementos `<canvas>` da página, especificamente para o fundo de estrelas e a seção hero.
    - **Funções**:
        - `initCanvas()`: Inicializa o canvas de estrelas de fundo e o canvas da seção hero. Adiciona event listeners para redimensionamento da janela e interação de desenho (no canvas de estrelas).
        - `resizeCanvas()`: Ajusta o tamanho dos canvas ao redimensionar a janela.
        - `draw(e)`: Função para desenhar linhas no canvas de estrelas com base no movimento do mouse.
        - `initHeroCanvas()`: Configura o canvas da seção hero, criando partículas e iniciando a animação.
        - `animateHeroParticles()`: Loop de animação que atualiza a posição e desenha as partículas no canvas da seção hero, criando um efeito de "rede" ou "constelação".
    - **Conceitos Importantes**: APIs Canvas 2D (desenho de formas, linhas, arcos), animações com `requestAnimationFrame`, manipulação de eventos de mouse, controle de temas dinamicamente para o estilo dos desenhos.

- [`theme.js`](js/theme.js): Lógica para alternar e persistir o tema (claro/escuro) da aplicação.
    - **Funções**:
        - `initTheme()`: Inicializa o tema, verificando se há um tema salvo no `localStorage` e aplicando-o. Configura o event listener para o botão de alternância de tema.
        - `getCurrentTheme()`: Retorna o tema atual ativo no elemento `<html>`.
    - **Conceitos Importantes**: `localStorage` para persistência de dados, manipulação de atributos HTML (`data-theme`), `CustomEvent` para notificar outros módulos sobre a mudança de tema.

- [`flashcards.js`](js/flashcards.js): Implementa a funcionalidade do modo de treino de flashcards com gamificação.
    - **Funções**:
        - `fetchFlashcardsData()`: Busca os dados dos flashcards do arquivo `data.json`.
        - `getRandomCardIndex()`: Retorna um índice aleatório de um flashcard, garantindo que não seja o mesmo card anterior.
        - `createFlashcard(cardData)`: Gera o HTML para um flashcard com base nos dados fornecidos.
        - `showRandomFlashcard()`: Exibe um flashcard aleatório no container e adiciona um event listener para virar o card.
        - `updateStats()`: Atualiza a pontuação, sequência, melhor sequência, e a barra de progresso. Controla a exibição da mensagem de "Nível 2 Desbloqueado" e o botão de reiniciar.
        - `showFeedback(type)`: Exibe feedback visual (animações) para respostas corretas ou incorretas.
        - `handleCorrectAnswer()`: Lógica para quando o usuário acerta o flashcard (aumenta pontos e sequência).
        - `handleWrongAnswer()`: Lógica para quando o usuário erra o flashcard (diminui pontos, reseta sequência).
        - `resetGame()`: Reseta todos os estados da gamificação (pontos, sequência, cards respondidos, nível).
        - `initFlashcards()`: Inicializa a seção de flashcards, buscando os dados, mostrando o primeiro card e configurando os event listeners.
    - **Conceitos Importantes**: Manipulação do DOM (innerHTML, classList, style), event listeners, `localStorage` para persistência do melhor streak, arrays (`Math.random()`, `.length`), funções assíncronas (`async/await`), lógica de exibição de conteúdo dinâmico e gamificado.

- [`data.js`](js/data.js): Módulo para abstrair a busca de dados da aplicação.
    - **Funções**:
        - `fetchDictionaryData()`: Função assíncrona para buscar os dados do dicionário (`data/data.json`).
        - `fetchArticles()`: Função assíncrona para buscar artigos de uma API externa (Dev.to).
    - **Conceitos Importantes**: `fetch` API para requisições HTTP, tratamento de erros (`try/catch`), funções assíncronas.

- [`config.js`](js/config.js): Centraliza as configurações globais da aplicação.
    - **Variáveis**:
        - `VISIBLE_CARDS_INITIAL`: Número inicial de cards visíveis na grade principal.
        - `VISIBLE_CARDS_INCREMENT`: Quantidade de cards a serem adicionados ao clicar em "Carregar mais".
        - `DATA_URL`: Caminho para o arquivo JSON de dados.
        - `ARTICLES_API_URL`: URL da API para buscar artigos.
        - `CATEGORIES`: Array de strings com todas as categorias disponíveis.
    - **Conceitos Importantes**: Exportação de constantes (`export`), modularidade para configurações.

### 5.2 Conceitos JavaScript Abordados

- **Manipulação do DOM**: Seleção de elementos (`document.querySelector`, `document.getElementById`), modificação de conteúdo (`.textContent`, `.innerHTML`), atributos (`.setAttribute`) e classes (`.classList`). Essencial para a interatividade da UI.
- **Event Listeners**: Como adicionar e remover ouvintes de eventos (`.addEventListener`) para interagir com o usuário (cliques, digitação, etc.). Fundamental para a reatividade da aplicação.
- **Funções Assíncronas (Async/Await)**: Explicação de como lidar com operações assíncronas, como requisições de dados (`fetch`) e carregamento de conteúdo, de forma mais legível e gerenciável.
- **Módulos ES6**: Uso de `import` e `export` para organizar o código em módulos reutilizáveis, promovendo a modularidade e evitando o escopo global.
- **Estruturas de Controle**: `if/else`, `switch`, `for`, `while` e seus usos. Presentes em diversas lógicas de filtragem, renderização e animação.
- **Manipulação de Arrays e Objetos**: Métodos comuns como `.map()`, `.filter()`, `.slice()` para trabalhar com estruturas de dados de forma eficiente.
- **Escopo e Hoisting**: Como o JavaScript gerencia a visibilidade de variáveis e funções, garantindo que o código funcione como esperado.
- **Programação Orientada a Eventos**: O paradigma por trás das interações do usuário, onde a aplicação reage a eventos disparados por ações do usuário ou pelo sistema.
- **`localStorage` API**: Utilizada para persistir o tema selecionado pelo usuário entre as sessões.
- **Web Canvas API**: Exploração das funcionalidades do `<canvas>` para desenho programático e animações, como as estrelas e partículas na seção hero.

## 6. Conclusão

Este documento serviu como um guia abrangente para entender o Projeto English for Devs. Exploramos a estrutura de arquivos, detalhamos os componentes HTML, analisamos as abordagens de estilização CSS (com destaque para modularidade e responsividade) e dissecamos a lógica JavaScript por trás da interatividade e funcionalidades dinâmicas.

Os principais pontos abordados incluem:
- **HTML Semântico**: Estrutura clara e acessível ([`index.html`](index.html)).
- **CSS Modular e Dinâmico**: Uso de [`reset.css`](css/reset.css), [`variables.css`](css/variables.css) para temas, [`layout.css`](css/layout.css) com Flexbox/Grid, [`components.css`](css/components.css) para reusabilidade, e [`animations.css`](css/animations.css) para uma experiência visual rica.
- **JavaScript Moderno**: Organização em módulos ([`main.js`](js/main.js), [`ui.js`](js/ui.js), [`canvas.js`](js/canvas.js), [`theme.js`](js/theme.js), [`flashcards.js`](js/flashcards.js), [`data.js`](js/data.js), [`config.js`](js/config.js)) utilizando `async/await`, manipulação do DOM e `Event Listeners` para criar uma aplicação altamente interativa.
- **Integração com IA**: O uso de [`gerador.js`](js/gerador.js) para popular a base de dados via Google Gemini demonstra uma abordagem inovadora para a geração de conteúdo didático.

A modularidade e a organização são pilares fundamentais deste projeto, tornando-o escalável, de fácil manutenção e uma excelente base para aprendizado. Esperamos que esta documentação forneça uma base sólida para qualquer pessoa que deseje contribuir ou aprofundar seus conhecimentos em desenvolvimento web front-end.
