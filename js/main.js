import { initTheme } from './theme.js';
import { initCanvas } from './canvas.js';
import { initUI } from './ui.js';

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navActions = document.querySelector('.nav-actions');
    const navCenter = document.querySelector('.nav-center');

    if (!mobileMenuBtn || !mobileMenu || !navCenter) {
        console.error('Elementos essenciais do menu não foram encontrados.');
        return;
    }

    const originalNavParent = navCenter.parentNode;

    const toggleMenu = () => {
        const isMenuOpen = mobileMenu.classList.contains('is-open');

        mobileMenu.classList.toggle('is-open');
        document.body.classList.toggle('no-scroll');

        if (!isMenuOpen) {
            // Menu está sendo aberto: mover elementos para dentro dele
            mobileMenu.prepend(navCenter);
        } else {
            // Menu está sendo fechado: mover elementos de volta
            originalNavParent.insertBefore(navCenter, navActions);
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    mobileMenu.addEventListener('click', (event) => {
        if (event.target.classList.contains('nav-link')) {
            toggleMenu();
        }
    });

    // Opcional: Fechar o menu se a tela for redimensionada para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && mobileMenu.classList.contains('is-open')) {
            toggleMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCanvas();
    initUI();
    initMobileMenu();
});
