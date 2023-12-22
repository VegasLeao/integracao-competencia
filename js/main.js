// Importando o módulo de serviço e tratamento de exceções
import * as service from './service.js';
import * as exception from './exception.js';

// Função para carregar os dados da API na tabela
async function carregarDados() {
    try {
        const bandas = await service.obterBandas();

        // Restante do código para preencher a tabela como antes
        // ...

    } catch (error) {
        exception.tratarErro('Erro ao carregar dados da API:', error);
    }
}

// Função para adicionar uma banda
async function adicionar() {
    let nomeBanda = document.getElementById("nome").value;
    let genero = document.getElementById("banda").value;

    if (nomeBanda && genero) {
        try {
            await service.adicionarBanda({
                nomeBanda: nomeBanda,
                genero: genero,
            });

            // Atualizar a tabela após a adição bem-sucedida
            carregarDados();
        } catch (error) {
            exception.tratarErro('Erro ao adicionar banda:', error);
        }
    } else {
        alert("Preencha todos os campos do formulário!");
    }
}

// Função para remover uma banda
async function remover(index) {
    try {
        await service.removerBanda(index);

        // Atualizar a tabela após a remoção bem-sucedida
        carregarDados();
    } catch (error) {
        exception.tratarErro('Erro ao remover banda:', error);
    }
}

// Função para atualizar uma banda (adicionar funcionalidade conforme necessário)
function atualizar() {
    // Adicione lógica para atualizar uma banda
}

// Função para remover a banda selecionada (adicionar funcionalidade conforme necessário)
function removerSelecionado() {
    // Adicione lógica para remover a banda selecionada
}


// Carregar os dados na tabela ao carregar a página
window.onload = () => {
    carregarDados();
};
