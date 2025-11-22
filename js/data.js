import { CONFIG } from './config.js';

export async function fetchDictionaryData() {
    try {
        const response = await fetch(CONFIG.DATA_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
        throw error;
    }
}

export async function fetchArticles() {
    try {
        const res = await fetch(CONFIG.ARTICLES_API_URL);
        if (!res.ok) throw new Error('Failed to fetch articles');
        return await res.json();
    } catch (error) {
        console.error("Erro ao carregar artigos:", error);
        throw error;
    }
}
