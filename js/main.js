// main.js

// Função para carregar os dados da API JSON na tabela
const carregarBandasDaAPI = async () => {
    try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) {
            throw new Error(`Erro ao obter dados da API. Status: ${response.status} ${response.statusText}`);
        }
        const bandas = await response.json();
        bandas.forEach(banda => adicionarLinhaTabela(banda.id, banda.author, banda.title));
    } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
    }
};

// Carregar os dados da API na tabela quando a janela é carregada
window.onload = async () => {
    // Outras inicializações que você já tinha
    initPieChart();

    // Carregar os dados da API
    await carregarBandasDaAPI();
};

function adicionar() {
    var nomeBanda = document.getElementById("nome").value;
    var generoBanda = document.getElementById("banda").value;

    if (nomeBanda && generoBanda) {
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: nomeBanda,
                author: generoBanda,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Atualizar a tabela ou fazer outras ações necessárias após o sucesso
            adicionarLinhaTabela(data.id, generoBanda, nomeBanda);

            // Reexibir os elementos após adicionar a banda
            document.getElementById("generoBandaContainer").style.display = "block";
            document.getElementById("nomeBandaContainer").style.display = "block";
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao adicionar banda. Por favor, tente novamente.');
        });

        limparFormulario();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}


function adicionarLinhaTabela(id, generoBanda, nomeBanda) {
    var table = document.getElementById("myTable");
    var newRow = table.insertRow();
    newRow.id = "banda" + id;

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = generoBanda;
    cell2.innerHTML = nomeBanda;

    // Atualize o gráfico
    updateChart();
}

function updateChart() {
    // Recupere os dados da tabela
    var table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tr");

    var data = [0, 0, 0]; // Inicialize os dados do gráfico

    for (var i = 1; i < rows.length; i++) { // Comece de 1 para evitar o cabeçalho da tabela
        var genre = rows[i].cells[0].innerHTML;
        switch (genre) {
            case 'Rock':
                data[0]++;
                break;
            case 'MPB':
                data[1]++;
                break;
            case 'Pop':
                data[2]++;
                break;
        }
    }

    // Atualize os dados do gráfico
    var chart = Chart.getChart('myChart');
    chart.data.datasets[0].data = data;
    chart.update();
}

function atualizar() {
    var table = document.getElementById("myTable");
    var selectedRow = table.getElementsByClassName("selected")[0];

    if (selectedRow) {
        var id = selectedRow.id.substring(5); // Remove o "banda" do ID

        var nomeBanda = document.getElementById("nome").value;
        var generoBanda = document.getElementById("banda").value;

        if (nomeBanda && generoBanda) {
            fetch(`http://localhost:3000/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: nomeBanda,
                    author: generoBanda,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Atualizar a tabela ou fazer outras ações necessárias após o sucesso
                selectedRow.cells[0].innerHTML = generoBanda;
                selectedRow.cells[1].innerHTML = nomeBanda;
                // Atualizar o gráfico
                updateChart();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao atualizar banda. Por favor, tente novamente.');
            });

            limparFormulario();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    } else {
        alert("Selecione uma banda para atualizar.");
    }
}

function removerSelecionado() {
    var table = document.getElementById("myTable");
    var selectedRow = table.getElementsByClassName("selected")[0];

    if (selectedRow) {
        var id = selectedRow.id.substring(5); // Remove o "banda" do ID

        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Atualizar a tabela ou fazer outras ações necessárias após o sucesso
            // Atualizar o gráfico
            updateChart();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao excluir banda. Por favor, tente novamente.');
        });

        table.deleteRow(selectedRow.rowIndex);
        limparFormulario();
    } else {
        alert("Selecione uma banda para remover.");
    }
}


function removerSelecionado() {
    var table = document.getElementById("myTable");
    var selectedRow = table.getElementsByClassName("selected")[0];

    if (selectedRow) {
        var id = selectedRow.id.substring(5); // Remove o "banda" do ID

        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Atualizar a tabela ou fazer outras ações necessárias após o sucesso
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao excluir banda. Por favor, tente novamente.');
        });

        table.deleteRow(selectedRow.rowIndex);
        limparFormulario();
    } else {
        alert("Selecione uma banda para remover.");
    }
}

function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("banda").value = "";
    document.getElementById("nome").focus();
}

document.getElementById("myTable").addEventListener("click", function (event) {
    var table = event.target.closest("table");
    if (table && table.id === "myTable") {
        var rows = table.getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
            rows[i].classList.remove("selected");
        }

        event.target.parentNode.classList.add("selected");

        var selectedRow = event.target.parentNode;
        document.getElementById("nome").value = selectedRow.cells[1].innerHTML;
        document.getElementById("banda").value = selectedRow.cells[0].innerHTML;
    }
});

