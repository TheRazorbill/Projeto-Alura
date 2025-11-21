import * as fs from 'fs/promises';

// --- CONFIGURAÇÃO DA GEMINI API ---
// Pega a chave do arquivo .env
const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

// ATENÇÃO: Alterado para data.json para conectar direto com seu Front-end
const KNOWLEDGE_FILE = 'data/data.json';

// --- CONFIGURAÇÃO DE GERAÇÃO ---
const TOTAL_ITEMS = 50;

// Estrutura JSON adaptada para "English for Devs"
const responseSchema = {
    type: "ARRAY",
    items: {
        type: "OBJECT",
        properties: {
            "termo": { "type": "STRING", "description": "Termo técnico em inglês (ex: Merge, Fetch, Thread)." },
            "traducaoLiteral": { "type": "STRING", "description": "A tradução literal da palavra fora do contexto de TI (ex: Fundir, Ir buscar, Fio)." },
            "explicacaoTecnica": { "type": "STRING", "description": "Explicação curta e didática da função técnica em português." },
            "categoria": {
                "type": "STRING",
                "enum": ["Verbo", "Substantivo", "Conceito", "Infra", "Banco de Dados", "Front-end", "Metodologia"],
                "description": "Categoria gramatical ou técnica."
            },
            "link": { "type": "STRING", "description": "Link para documentação oficial (MDN, Wiki, Docs oficiais)." }
        },
        "required": ["termo", "traducaoLiteral", "explicacaoTecnica", "categoria", "link"]
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateNewKnowledge(existingKnowledge) {
    // Mudei de item.nome para item.termo para evitar repetições
    const existingNames = existingKnowledge.map(item => item.termo).join(', ');

    // O Prompt do Professor de Inglês
    const systemPrompt = `Você é um professor de inglês técnico especializado em desenvolvimento de software. Sua missão é desmistificar termos técnicos para brasileiros, focando no significado LITERAL da palavra em inglês e como isso ajuda a entender a função técnica. Gere ${TOTAL_ITEMS} novas entradas.`;

    const userQuery = `Gere uma lista de ${TOTAL_ITEMS} termos técnicos em inglês (ex: verbos de git, conceitos de API, infraestrutura). Siga estritamente a estrutura JSON. NÃO use estes termos que já existem: ${existingNames}. Tente variar entre verbos (ex: parse, fetch) e substantivos/conceitos (ex: payload, thread, dom).`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        }
    };

    let response;
    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
        try {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

                if (jsonText) {
                    try {
                        const newKnowledge = JSON.parse(jsonText);

                        if (Array.isArray(newKnowledge) && newKnowledge.length === TOTAL_ITEMS) {
                            console.log(`Sucesso! ${TOTAL_ITEMS} novos termos gerados.`);
                            return newKnowledge;
                        } else {
                            throw new Error(`Quantidade incorreta. Esperado: ${TOTAL_ITEMS}, Recebido: ${newKnowledge.length}`);
                        }
                    } catch (parseError) {
                        throw new Error("JSON malformado.");
                    }
                } else {
                    throw new Error("Resposta vazia.");
                }
            } else {
                throw new Error(`Erro API: ${response.status}`);
            }
        } catch (error) {
            retries++;
            console.log(`Tentativa ${retries} falhou... tentando novamente.`);
            if (retries < maxRetries) {
                await delay(2000 * retries);
            } else {
                throw error;
            }
        }
    }
}

async function main() {
    if (!apiKey) {
        console.error("\n❌ ERRO: Crie um arquivo .env com GEMINI_API_KEY=sua_chave");
        return;
    }

    try {
        let existingKnowledge = [];
        try {
            // Agora lê o data.json em vez de baseDeConhecimento.json
            const data = await fs.readFile(KNOWLEDGE_FILE, 'utf-8');
            existingKnowledge = JSON.parse(data);
            console.log(`Base carregada: ${existingKnowledge.length} termos existentes.`);
        } catch (e) {
            console.log(`Arquivo ${KNOWLEDGE_FILE} não encontrado ou vazio. Criando novo.`);
        }

        console.log("🤖 Gemini está escrevendo o dicionário...");
        const newKnowledge = await generateNewKnowledge(existingKnowledge);

        const totalKnowledge = [...existingKnowledge, ...newKnowledge];

        await fs.writeFile(KNOWLEDGE_FILE, JSON.stringify(totalKnowledge, null, 2), 'utf-8');
        console.log(`\n🎉 SUCESSO! Base atualizada em '${KNOWLEDGE_FILE}' com ${totalKnowledge.length} itens.`);

    } catch (error) {
        console.error("\n❌ ERRO FATAL:", error.message);
    }
}

main();