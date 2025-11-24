<div align="center">
  <img width="150" height="150" alt="Logo English for Devs" src="https://github.com/user-attachments/assets/3058b82d-ef2a-4d24-bff4-4912d9c5cd19" />
  <h1>English for Devs | Dicionário Técnico</h1>
  <p>
    <strong>Base de conhecimento interativa para desmistificar a terminologia técnica em inglês.</strong>
  </p>
  <p>
    <a href="https://therazorbill.github.io/Projeto-Alura/">Demonstração Online</a> &mdash;
    <a href="#instalação-e-execução">Instalação</a> &mdash;
    <a href="#tecnologias">Tecnologias</a> &mdash;
    <a href="https://www.linkedin.com/posts/rahian_imersaodev-alura-google-activity-7397683441284227072-mKPO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF1UHTwBdBvj9-F35R6dEvdyWwvHntOgPIk
">Post no LinkedIn</a>

  </p>
</div>

<br />

> **"Não decore comandos. Entenda o significado literal por trás do código."**

---

## Sobre o Projeto

O **English for Devs** é uma ferramenta educacional desenvolvida para reduzir a barreira linguística na programação. O projeto conecta o significado literal de termos técnicos (ex: *Fetch* = "Ir buscar") à sua função lógica no código, tornando o aprendizado mais intuitivo para desenvolvedores brasileiros.

Este projeto foi submetido como parte da **Imersão Dev com Google Gemini e Alura**, focado no uso eficiente de tecnologias web fundamentais e Inteligência Artificial.

<img width="100%" alt="Interface da Aplicação" src="https://github.com/user-attachments/assets/df3d6026-d087-4d02-96e4-071be24c38b2" />

---

## O Problema e a Solução

Muitos iniciantes enfrentam dificuldades pois os termos técnicos parecem abstratos. Esta aplicação resolve isso fornecendo três camadas de entendimento para cada termo:

1.  **Tradução Literal:** A origem semântica da palavra no inglês cotidiano.
2.  **Explicação Técnica:** A função prática no desenvolvimento de software.
3.  **Contextualização:** Classificação gramatical e links para documentações oficiais (MDN, Git-scm, W3C).

---

## Funcionalidades
 
A aplicação foi construída com foco em performance, acessibilidade e design de interface.
 
*   **Gamificação dos Flashcards:** Modo de treino interativo com sistema de pontos, streaks (sequências de acertos), melhor streak salvo localmente, barra de progresso e feedback visual para acertos/erros. Inclui um "Nível 2" estético.
*   **Busca Inteligente:** Algoritmo de filtragem em tempo real (pesquisa por termo, tradução ou conceito).
*   **Interface Reativa:** Design fluido com efeito *glassmorphism* e transições suaves.
*   **Categorização Dinâmica:** Organização por domínios (Infraestrutura, Front-end, Verbos, Dados).
*   **Gerenciamento de Tema:** Alternância entre modo claro/escuro com persistência local (LocalStorage).
*   **Integração de Conteúdo:** Seção de artigos técnicos consumindo dados externos.
*   **Base de Dados via IA:** Estruturação inicial dos termos técnicos gerada com auxílio do Google Gemini.

---

## Tecnologias

O projeto respeita estritamente as diretrizes da Imersão, priorizando os fundamentos da web sem o uso de frameworks de alta complexidade.

| Categoria | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Estrutura** | **HTML5** | Semântica e acessibilidade. |
| **Estilo** | **CSS3** | CSS Variables, Flexbox, Grid Layout e animações (Keyframes). |
| **Lógica** | **JavaScript** | ES6+, Manipulação do DOM e consumo de APIs (Vanilla). |
| **Automação** | **Node.js + Gemini** | Scripts auxiliares para expansão da base de dados (`gerador.js`). |

---

## Instalação e Execução

Como este é um projeto estático focado em tecnologias nativas do navegador, não há necessidade de compilação complexa.

### Pré-requisitos

* Navegador moderno (Chrome, Firefox, Edge).
* Editor de código (VS Code recomendado).

### Passo a passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/TheRazorbill/Projeto-Alura.git](https://github.com/TheRazorbill/Projeto-Alura.git)
    ```

2.  **Acesse o diretório:**
    Abra a pasta do projeto no seu editor de preferência.

3.  **Execute a aplicação:**
    * Utilize a extensão **Live Server** (VS Code) no arquivo `index.html`.
    * Ou abra o arquivo `index.html` diretamente no seu navegador.

> **Nota:** Os arquivos `.js` relacionados ao Node.js (`package.json`, `gerador.js`) são scripts de apoio para a geração de conteúdo via IA e não são necessários para a execução da interface web.

---

## Créditos e Licença

Desenvolvido por **RazorBill** (Github: [TheRazorbill](https://github.com/TheRazorbill)).

* **Evento:** Imersão Dev Alura + Google.
* **Design:** Inspirado em conceitos de Material Design.
* **IA Generativa:** Google Gemini 3.0.

---

<div align="center">
  <img width="100%" alt="Demonstração em GIF" src="assets/gif.gif" />
</div>
