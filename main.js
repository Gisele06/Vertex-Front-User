'use strict'

console.log("Main carregado");

//Pesquisar 
async function getPersonagens(personagem) {
    const url = ``
    const response = await fetch(url)
    const data = await response.json()
     return data.data
}

// Função para criar o card da pizza 
function criarCardPizza(pizza) {

    // Cria a div principal do card
    const card = document.createElement('div');
    card.classList.add('pizza-card');

    // Cria a imagem da pizza
    const img = document.createElement('img');
    img.src = pizza.imagem;
    img.alt = pizza.nome;

    // Cria o título com o nome da pizza
    const titulo = document.createElement('h3');
    titulo.textContent = pizza.nome;

    // Cria o parágrafo com a descrição
    const descricao = document.createElement('p');
    descricao.textContent = pizza.descricao;

    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(descricao);

    // Retorna o card pronto
    return card;
}

const dadosProvisorios = [
    {
        id: 1,
        nome: "Calabresa",
        descricao: "Molho de tomate especial, muçarela premium, calabresa defumada fatiada e cebola roxa.",
        imagem: "./img/pizza_home.png",
        tipo: [2]
    },
    {
        id: 2,
        nome: "Brigadeiro Gourmet",
        descricao: "Chocolate ao leite artesanal coberto com granulado belga e morangos frescos.",
        imagem: "./img/pizza_home.png",
        tipo: [1]
    },
    {
        id: 3,
        nome: "Reprovados",
        descricao: "Leandro dos Reis, Gabriel, Enzzo, Gisele e Evelyn reprovados",
        imagem: "./img/sabor_manoel.png",
        tipo: [2]
    }
];

const TIPOS = {
    Todos: "Todos",
    Salgada: 2,
    Doce: 1
};

function processarPizzas(listaPizzas, tipoSelecionado, grid, menuSection) {

    for (let i = 0; i < listaPizzas.length; i++) {
        const pizza = listaPizzas[i];

        const tipoPizza = pizza.tipo[0];

        if (tipoSelecionado === "Todos" || tipoPizza == tipoSelecionado) {
            const cardNovo = criarCardPizza(pizza);
            grid.appendChild(cardNovo);
        }
    }

    menuSection.classList.remove('hidden');
}

function carregarCardapio(tipoSelecionado) {

    // Seleciona os elementos da página
    const grid = document.getElementById('pizza-grid');
    const titleBanner = document.getElementById('menu-title');
    const menuSection = document.getElementById('menu-view');

    grid.replaceChildren();

    if (tipoSelecionado === "Todos") {
        titleBanner.textContent = "Todos os Sabores";
    } else if (tipoSelecionado == 2) {
        titleBanner.textContent = "Pizzas Salgadas";
    } else if (tipoSelecionado == 1) {
        titleBanner.textContent = "Pizzas Doces";
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Processa os dados recebidos da API
            processarPizzas(data, tipoSelecionado, grid, menuSection);

        })
        .catch(() => {
            processarPizzas(dadosProvisorios, tipoSelecionado, grid, menuSection);
        });
}

function inicializarBotoes() {

    // Seleciona todos os botões de categoria
    const botoesCategoria = document.querySelectorAll('.category-btn');

    const grid = document.getElementById('pizza-grid');

    // Percorre todos os botões encontrados
    for (let i = 0; i < botoesCategoria.length; i++) {

        const botao = botoesCategoria[i];

        // Adiciona o evento de clique
        botao.addEventListener('click', (evento) => {
            grid.replaceChildren();

            // Impede o comportamento padrão do botão/link
            evento.preventDefault();

            // Obtém a categoria do atributo data-type
            const tipoTexto = botao.getAttribute('data-type');

            // converte para ID do backend
            const tipo = TIPOS[tipoTexto];

            // Atualiza o cardápio
            carregarCardapio(tipo);
        });
    }

    carregarCardapio('Todos');
}

window.onload = inicializarBotoes;