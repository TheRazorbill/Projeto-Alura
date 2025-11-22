// ui.js - Handles UI initialization and search functionality
import { CONFIG } from './config.js';
import { fetchDictionaryData, fetchArticles } from './data.js';

let visibleCards = CONFIG.VISIBLE_CARDS_INITIAL;
let allData = [];

export async function initUI() {
    try {
        allData = await fetchDictionaryData();
        renderCards(allData);
        loadMarquee(allData);
    } catch (error) {
        const container = document.querySelector('.card-container');
        if (container) {
            container.innerHTML = "<p style='color: var(--text-muted); grid-column: 1/-1; text-align: center;'>Erro ao carregar dados. Tente recarregar a página.</p>";
        }
    }
    initSearch();
    initCategories();
    initArticlesUI();
}

function loadMarquee(dados) {
    const marqueeContainer = document.querySelector('.marquee-container');
    if (!marqueeContainer) return;
    const contentHTML = dados.map(item => `<span>${item.termo.toUpperCase()}</span>`).join('');
    const div1 = document.createElement('div');
    div1.className = 'marquee-content';
    div1.innerHTML = contentHTML;
    const div2 = document.createElement('div');
    div2.className = 'marquee-content';
    div2.setAttribute('aria-hidden', 'true');
    div2.innerHTML = contentHTML;
    marqueeContainer.innerHTML = '';
    marqueeContainer.appendChild(div1);
    marqueeContainer.appendChild(div2);
}

function renderCards(dados) {
    const container = document.querySelector('.card-container');
    if (!container) return;
    container.innerHTML = '';
    if (dados.length === 0) {
        container.innerHTML = "<p style='color: var(--text-muted); grid-column: 1/-1; text-align: center;'>Nenhum termo encontrado.</p>";
        return;
    }
    const dadosParaMostrar = dados.slice(0, visibleCards);
    dadosParaMostrar.forEach(dado => {
        const article = document.createElement('article');
        article.classList.add('card');
        let tagClass = 'tag-js';
        if (dado.categoria === 'Verbo') tagClass = 'tag-html';
        if (dado.categoria === 'Substantivo') tagClass = 'tag-css';
        if (dado.categoria === 'Conceito') tagClass = 'tag-a11y';
        if (dado.categoria === 'Infra') tagClass = 'tag-css';
        article.innerHTML = `
            <div class="card-content">
                <div class="card-header-top">
                    <span class="tag ${tagClass}">${dado.categoria}</span>
                    <span class="icon-arrow">↗</span>
                </div>
                <h3 style="font-size: 2rem; margin-bottom: 0.2rem;">${dado.termo}</h3>
                <div style="margin-bottom: 1rem;">
                    <span style="color: var(--text-muted); font-size: 0.8rem;">Literalmente:</span>
                    <span style="color: var(--accent-pink); font-weight: 600; font-size: 1.1rem;">${dado.traducaoLiteral}</span>
                </div>
                <p style="line-height: 1.5;">${dado.explicacaoTecnica}</p>
                <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
                    <p style="font-size: 0.8rem; color: var(--text-dim); margin: 0;">English for Devs</p>
                    <span style="font-size: 0.85rem; color: var(--primary); font-weight: 500;">Ver definição</span>
                </div>
                <a href="${dado.link}" target="_blank" style="position:absolute; inset:0; z-index:10;" aria-label="Saiba mais sobre ${dado.termo}"></a>
            </div>
            <div class="card-glow"></div>
        `;
        container.appendChild(article);
    });
    updateShowMoreButton(dados.length);
}

function updateShowMoreButton(totalItems) {
    const container = document.querySelector('.card-container');
    let showMoreBtn = document.getElementById('btn-show-more-cards');
    if (!showMoreBtn) {
        showMoreBtn = document.createElement('button');
        showMoreBtn.id = 'btn-show-more-cards';
        showMoreBtn.className = 'btn-secondary btn-sm';
        showMoreBtn.style.display = 'block';
        showMoreBtn.style.margin = '2rem auto 0';
        showMoreBtn.textContent = 'Carregar mais termos';
        showMoreBtn.onclick = () => {
            visibleCards += CONFIG.VISIBLE_CARDS_INCREMENT;
            renderCards(allData);
        };
        container.parentNode.insertBefore(showMoreBtn, container.nextSibling);
    }
    showMoreBtn.style.display = (visibleCards >= totalItems) ? 'none' : 'block';
}

function initSearch() {
    const campoBusca = document.querySelector('#campo-busca');
    const botaoBusca = document.querySelector('#botao-busca');
    if (!campoBusca) return;
    // Handle Enter key without causing page scroll or form submission
    campoBusca.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(campoBusca.value);
        }
    });
    // Click on search button triggers the same search
    if (botaoBusca) {
        botaoBusca.addEventListener('click', () => {
            performSearch(campoBusca.value);
        });
    }
    // Expose for category clicks
    window.performSearch = performSearch;
}

function performSearch(termo) {
    // Remove all whitespace characters from the search term and convert to lower case
    const cleanedTerm = termo.replace(/\s+/g, '').toLowerCase();
    // If the term is empty after cleaning, show all data
    if (cleanedTerm.length === 0) {
        renderCards(allData);
        return;
    }
    let dadosFiltrados;
    if (cleanedTerm.length === 1) {
        dadosFiltrados = allData.filter(dado => dado.termo.toLowerCase().startsWith(cleanedTerm));
    } else {
        dadosFiltrados = allData.filter(dado =>
            dado.termo.toLowerCase().includes(cleanedTerm) ||
            dado.traducaoLiteral.toLowerCase().includes(cleanedTerm) ||
            dado.explicacaoTecnica.toLowerCase().includes(cleanedTerm)
        );
    }
    renderCards(dadosFiltrados);
    const resultsSection = document.getElementById('bento-grid');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function initCategories() {
    const container = document.getElementById('categories-container');
    const showMoreBtn = document.getElementById('btn-show-more-categories');
    const campoBusca = document.querySelector('#campo-busca');
    if (!container || !showMoreBtn) return;
    let isExpanded = false;
    const initialCount = 8;
    const categories = CONFIG.CATEGORIES;
    function renderCategories() {
        container.innerHTML = '';
        const count = isExpanded ? categories.length : initialCount;
        categories.slice(0, count).forEach(cat => {
            const pill = document.createElement('a');
            pill.className = 'category-pill';
            pill.textContent = cat;
            pill.href = '#';
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                if (campoBusca) {
                    campoBusca.value = cat;
                    performSearch(cat);
                }
            });
            container.appendChild(pill);
        });
        showMoreBtn.textContent = isExpanded ? 'Mostrar menos' : 'Saiba mais';
    }
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        renderCategories();
    });
    renderCategories();
}

async function initArticlesUI() {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;
    try {
        const articles = await fetchArticles();
        articlesGrid.innerHTML = articles.map(article => `
            <article class="article-card">
                <div class="article-tags">
                    ${article.tag_list.slice(0, 3).map(tag => `<span class="article-tag">#${tag}</span>`).join('')}
                </div>
                <h3 class="article-title">
                    <a href="${article.url}" target="_blank" class="article-link">${article.title}</a>
                </h3>
                <div class="article-meta">
                    <img src="${article.user.profile_image_90}" alt="${article.user.name}" class="article-author-img">
                    <span>${article.user.name}</span>
                    <span style="margin-left: auto;">${new Date(article.published_at).toLocaleDateString()}</span>
                </div>
            </article>
        `).join('');
    } catch (error) {
        articlesGrid.innerHTML = "<p style='color: var(--text-muted);'>Não foi possível carregar os artigos no momento.</p>";
    }
}
