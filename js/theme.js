export function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (!htmlElement.getAttribute('data-theme')) {
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    } else {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            themeToggleBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';

            // Dispatch a custom event so other modules (like canvas) can react
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
        });
    }
}

export function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}
