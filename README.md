#  English for Devs - Dicionário Tech

<img width="1897" height="1095" alt="image" src="https://github.com/user-attachments/assets/df3d6026-d087-4d02-96e4-071be24c38b2" />

> **"Não decore comandos. Entenda o significado literal por trás do código."**

O **English for Devs** é uma base de conhecimento interativa focada em descomplicar o "tech-speak". Conectamos o significado literal de termos técnicos em inglês (ex: *Fetch* = "Ir buscar") à sua função real no código, tornando o aprendizado de programação mais intuitivo para brasileiros.

 **Projeto desenvolvido durante a Imersão Dev com Google Gemini e Alura.**

---

## O que ele resolve?

Muitos iniciantes travam na programação porque os termos parecem abstratos. Nesta aplicação, você busca um termo e descobre:
1. **Tradução Literal:** A origem da palavra no inglês cotidiano.
2. **Explicação Técnica:** O que ela faz no código, sem "tiopês".
3. **Contextualização:** Categoria gramatical e técnica.
4. **Aprofundamento:** Link direto para documentações oficiais (MDN, Git-scm, etc.).

---

## Funcionalidades & Diferenciais

* **Busca Inteligente:** Filtragem em tempo real por termo, tradução ou explicação.
* **UI/UX Imersiva:** Design moderno com efeito *glassmorphism*, animações de partículas em Canvas e transições suaves.
* **Filtros Dinâmicos:** Navegação por categorias (Verbos, Infra, Front-end, etc.).
* **Dark/Light Mode:** Alternância de tema persistente e adaptável.
* **Integração com API:** Seção "Artigos" que consome conteúdo real do Dev.to.
* **Conteúdo via IA:** Base de dados inicial gerada e estruturada com auxílio do **Google Gemini**.

---

##  Tecnologias Utilizadas

Este projeto foi construído focando nos fundamentos da web moderna, sem uso de frameworks JS (como React ou Vue), garantindo performance e leveza.

* **HTML5 Semântico:** Estrutura acessível e organizada.
* **CSS3 Moderno:** Uso de CSS Variables, Grid, Flexbox e animações keyframe.
* **JavaScript (Vanilla):** Lógica de busca, manipulação do DOM, consumo de APIs e renderização do Canvas.
* **Google Gemini + Node.js (Automação):** Script auxiliar (`gerador.js`) criado para expandir a base de dados (`data.json`) de forma automatizada antes do deploy.

---

##  Como Rodar Localmente

O projeto é estático e não requer instalação de dependências para rodar no navegador.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/TheRazorbill/Projeto-Alura](https://github.com/TheRazorbill/Projeto-Alura)
    ```
2.  **Abra a pasta** no VS Code.
3.  **Execute:** Utilize a extensão "Live Server" para abrir o `index.html` ou abra o arquivo diretamente no navegador.

> *Nota: O arquivo `package.json` e os scripts Node servem apenas para a automação de geração de dados via IA, não sendo necessários para visualizar o site.*

---

##  Link do Projeto

Acesse a aplicação online:
 **[English for Devs - Live Demo](https://therazorbill.github.io/Projeto-Alura/)**

![Preview do Projeto](assets/gif.gif)

---

##  Créditos

Desenvolvido por **RazorBill** como projeto final da **Imersão Dev Alura + Google**.

* Design Concept: Inspirado no React Bits e Material Design.
* Dados: Gerados com Google Gemini 2.5.
* Apoio Educacional: Alura.

---
