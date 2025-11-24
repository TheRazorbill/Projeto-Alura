import { initTheme } from './theme.js';
import { initCanvas } from './canvas.js';
import { initUI } from './ui.js';
import { getCurrentTheme } from './theme.js';
import { initFlashcards } from './flashcards.js';

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navCenter = document.querySelector('.nav-center');
    const themeToggleBtn = document.getElementById('theme-toggle'); // Pega o botão de tema original

    if (!mobileMenuBtn || !mobileMenu || !navCenter) {
        console.error('Elementos essenciais do menu não foram encontrados.');
        return;
    }

    const toggleMenu = () => {
        const isMenuOpen = mobileMenu.classList.contains('is-open');

        // Preenche o menu mobile apenas na primeira vez que é aberto
        if (!isMenuOpen && mobileMenu.innerHTML === '') {
            // 1. Clona os links de navegação
            const navLinks = navCenter.cloneNode(true);
            mobileMenu.appendChild(navLinks);

            // 2. Clona o botão de tema
            const themeToggleClone = themeToggleBtn.cloneNode(true);
            themeToggleClone.id = 'theme-toggle-mobile'; // Adiciona um ID específico para o clone
            themeToggleClone.classList.add('nav-link'); // Adiciona a classe para se parecer com os outros links
            themeToggleClone.textContent = getCurrentTheme() === 'dark' ? 'Tema Claro' : 'Tema Escuro';

            // 3. Adiciona o mesmo evento de clique do botão original ao clone
            themeToggleClone.addEventListener('click', (e) => {
                e.preventDefault(); // Previne comportamento padrão do link
                themeToggleBtn.click();
            });

            // 4. Adiciona o clone ao menu mobile
            navLinks.appendChild(themeToggleClone);
        }

        // Adiciona/remove as classes para mostrar/esconder o menu
        mobileMenu.classList.toggle('is-open');
        document.body.classList.toggle('no-scroll');
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Adiciona funcionalidade para fechar o menu ao clicar em um link
    mobileMenu.addEventListener('click', (event) => {
        // Verifica se o clique foi em um link ou no botão de tema
        if (event.target.classList.contains('nav-link')) {
            toggleMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCanvas();
    initUI();
    initMobileMenu();
    initFlashcards();

    // Ouve o evento de mudança de tema para atualizar o texto do botão mobile
    window.addEventListener('themeChanged', (e) => {
        const mobileThemeBtn = document.getElementById('theme-toggle-mobile');
        if (mobileThemeBtn) {
            mobileThemeBtn.textContent = e.detail.theme === 'dark' ? 'Tema Claro' : 'Tema Escuro';
        }
    });
});
