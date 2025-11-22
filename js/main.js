import { initTheme } from './theme.js';
import { initCanvas } from './canvas.js';
import { initUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCanvas();
    initUI();
});
