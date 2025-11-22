
let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let dados = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    initTheme();
    initCanvas();
    initSearch();
    initCategories();
    initArticles();
});

async function carregarDados() {
    try {
        let resposta = await fetch("data/data.json");
        dados = await resposta.json();
        renderizarCards(dados);
        carregarMarquee(dados);
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
    }
}

function carregarMarquee(dados) {
    const marqueeContainer = document.querySelector(".marquee-container");
    if (!marqueeContainer) return;

    const contentHTML = dados.map(item => `<span>${item.termo.toUpperCase()}</span>`).join('');

    const div1 = document.createElement("div");
    div1.className = "marquee-content";
    div1.innerHTML = contentHTML;

    const div2 = document.createElement("div");
    div2.className = "marquee-content";
    div2.setAttribute("aria-hidden", "true");
    div2.innerHTML = contentHTML;

    marqueeContainer.innerHTML = "";
    marqueeContainer.appendChild(div1);
    marqueeContainer.appendChild(div2);
}

function renderizarCards(dados) {
    const container = document.querySelector(".card-container");
    container.innerHTML = "";

    if (dados.length === 0) {
        container.innerHTML = "<p style='color: var(--text-muted); grid-column: 1/-1; text-align: center;'>Nenhum termo encontrado.</p>";
        return;
    }

    const dadosParaMostrar = dados.slice(0, visibleCards);

    dadosParaMostrar.forEach(dado => {
        let article = document.createElement("article");
        article.classList.add("card");

        let tagClass = "tag-js";
        if (dado.categoria === "Verbo") tagClass = "tag-html";
        if (dado.categoria === "Substantivo") tagClass = "tag-css";
        if (dado.categoria === "Conceito") tagClass = "tag-a11y";
        if (dado.categoria === "Infra") tagClass = "tag-css";

        article.innerHTML = `
            <div class="card-content">
                <div class="card-header-top">
                    <span class="tag ${tagClass}">${dado.categoria}</span>
                    <span class="icon-arrow">↗</span>
                </div>
                
                <h3 style="font-size: 2rem; margin-bottom: 0.2rem;">${dado.termo}</h3>
                
                <div style="margin-bottom: 1rem;">
                    <span style="color: var(--text-muted); font-size: 0.8rem;">Literalmente:</span>
                    <span style="color: var(--accent-pink); font-weight: 600; font-size: 1.1rem;">"${dado.traducaoLiteral}"</span>
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

    let showMoreBtn = document.getElementById('btn-show-more-cards');
    if (!showMoreBtn) {
        showMoreBtn = document.createElement('button');
        showMoreBtn.id = 'btn-show-more-cards';
        showMoreBtn.className = 'btn-secondary btn-sm';
        showMoreBtn.style.display = 'block';
        showMoreBtn.style.margin = '2rem auto 0';
        showMoreBtn.textContent = 'Carregar mais termos';
        showMoreBtn.onclick = () => {
            visibleCards += 6;
            renderizarCards(dados);
        };
        container.parentNode.insertBefore(showMoreBtn, container.nextSibling);
    }

    if (visibleCards >= dados.length) {
        showMoreBtn.style.display = 'none';
    } else {
        showMoreBtn.style.display = 'block';
    }
}

function initSearch() {
    if (!campoBusca) return;

    campoBusca.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            iniciarBusca();
        }
    });
}

async function iniciarBusca() {
    if (dados.length === 0) {
        await carregarDados();
    }

    const termoBusca = campoBusca.value.toLowerCase();

    if (termoBusca.length === 1) {
        dadosFiltrados = dados.filter(dado =>
            dado.termo.toLowerCase().startsWith(termoBusca)
        );
    } else {
        dadosFiltrados = dados.filter(dado =>
            dado.termo.toLowerCase().includes(termoBusca) ||
            dado.traducaoLiteral.toLowerCase().includes(termoBusca) ||
            dado.explicacaoTecnica.toLowerCase().includes(termoBusca)
        );
    }

    renderizarCards(dadosFiltrados);

    const resultsSection = document.getElementById('bento-grid');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

let visibleCards = 9;

const categories = [
    'Verbo', 'Substantivo', 'Conceito', 'Infra',
    'Banco de Dados', 'Front-end', 'Metodologia', 'Back-end',
    'DevOps', 'Cloud', 'Segurança', 'API',
    'Framework', 'Testes', 'Git', 'Mobile'
];

function initCategories() {
    const container = document.getElementById('categories-container');
    const showMoreBtn = document.getElementById('btn-show-more-categories');

    if (!container || !showMoreBtn) return;

    let isExpanded = false;
    const initialCount = 8;

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
                campoBusca.value = cat;
                iniciarBusca();
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

async function initArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;

    try {
        const res = await fetch("https://dev.to/api/articles?per_page=6&tag=programming");
        const articles = await res.json();

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
        console.error("Erro ao carregar artigos:", error);
        articlesGrid.innerHTML = "<p style='color: var(--text-muted);'>Não foi possível carregar os artigos no momento.</p>";
    }
}

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (!htmlElement.getAttribute('data-theme')) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    } else {
        const currentTheme = htmlElement.getAttribute('data-theme');
        themeToggleBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        themeToggleBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';

        if (ctx) {
            ctx.strokeStyle = newTheme === 'light' ? '#000000' : '#ffffff';
        }
    });
}

let ctx;
let canvas;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function initCanvas() {
    canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'light' ? '#000000' : '#ffffff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
}

function resizeCanvas() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (canvas.width > 0 && canvas.height > 0) {
        tempCtx.drawImage(canvas, 0, 0);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.drawImage(tempCanvas, 0, 0);

    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'light' ? '#000000' : '#ffffff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
}

function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

let heroCanvas, heroCtx;
let particles = [];
const particleCount = 50;

function initHeroCanvas() {
    heroCanvas = document.getElementById('hero-canvas');
    if (!heroCanvas) return;

    heroCtx = heroCanvas.getContext('2d');
    heroCanvas.width = heroCanvas.offsetWidth;
    heroCanvas.height = heroCanvas.offsetHeight;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * heroCanvas.width,
            y: Math.random() * heroCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }

    animateHeroParticles();
}

function animateHeroParticles() {
    if (!heroCanvas || !heroCtx) return;

    const theme = document.documentElement.getAttribute('data-theme');
    const isDark = theme !== 'light';

    heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

    particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > heroCanvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > heroCanvas.height) particle.vy *= -1;

        heroCtx.beginPath();
        heroCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        heroCtx.fillStyle = isDark ? 'rgba(168, 85, 247, 0.6)' : 'rgba(147, 51, 234, 0.6)';
        heroCtx.fill();

        particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                heroCtx.beginPath();
                heroCtx.moveTo(particle.x, particle.y);
                heroCtx.lineTo(otherParticle.x, otherParticle.y);
                const opacity = (1 - distance / 120) * 0.3;
                heroCtx.strokeStyle = isDark
                    ? `rgba(168, 85, 247, ${opacity})`
                    : `rgba(147, 51, 234, ${opacity})`;
                heroCtx.lineWidth = 1;
                heroCtx.stroke();
            }
        });
    });

    requestAnimationFrame(animateHeroParticles);
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
});
window.addEventListener('resize', () => {
    if (heroCanvas) {
        heroCanvas.width = heroCanvas.offsetWidth;
        heroCanvas.height = heroCanvas.offsetHeight;
    }
});
