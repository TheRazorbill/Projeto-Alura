import { getCurrentTheme } from './theme.js';

let ctx;
let canvas;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

let heroCanvas, heroCtx;
let particles = [];
const particleCount = 50;

export function initCanvas() {
    // Star Canvas
    canvas = document.getElementById('star-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        ctx.strokeStyle = getCurrentTheme() === 'light' ? '#000000' : '#ffffff';
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

    // Hero Canvas
    initHeroCanvas();

    // Listen for theme changes
    window.addEventListener('themeChanged', (e) => {
        const newTheme = e.detail.theme;
        if (ctx) {
            ctx.strokeStyle = newTheme === 'light' ? '#000000' : '#ffffff';
        }
        // Hero canvas particles check theme on every frame, so no need to update state here explicitly
    });
}

function resizeCanvas() {
    if (!canvas) return;
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

    ctx.strokeStyle = getCurrentTheme() === 'light' ? '#000000' : '#ffffff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    if (heroCanvas) {
        heroCanvas.width = heroCanvas.offsetWidth;
        heroCanvas.height = heroCanvas.offsetHeight;
    }
}

function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

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

    const theme = getCurrentTheme();
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
