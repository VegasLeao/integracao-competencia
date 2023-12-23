// main.js

function adicionar() {
    var nomeBanda = document.getElementById("nome").value;
    var generoBanda = document.getElementById("banda").value;

    if (nomeBanda && generoBanda) {
        fetch('http://localhost:3000/bandas', {
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
