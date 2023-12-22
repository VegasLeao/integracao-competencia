import {
    tratarErro
} from "./exception.js"; 
// URL da sua API
const apiUrl = 'https://sua-api.com/bandas';

// Função para obter bandas da API
export async function obterBandas() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

// Função para adicionar uma banda à API
export async function adicionarBanda(banda) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(banda),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

// Função para remover uma banda da API
export async function removerBanda(index) {
    const response = await fetch(`${apiUrl}/${index}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
