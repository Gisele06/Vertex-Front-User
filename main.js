'use strict'

console.log("Main carregado com a estrutura correta do Postman!");

const url = "http://localhost:8080/v1/senai/pizzaria/pizza";

let pizzas = [];

// Busca pizzas na API mapeando a estrutura correta
async function getPizzas() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro ao buscar pizzas no servidor.");
        }
        const dados = await response.json();

        // MAPEAMENTO DO POSTMAN: O array de pizzas está dentro de dados.response.pizza
        if (dados.response && dados.response.pizza && Array.isArray(dados.response.pizza)) {
            return dados.response.pizza;
        }
        
        return [];
    } catch (erro) {
        console.error("Erro ao conectar com a API:", erro);
        return []; 
    }
}

// Cria o card da pizza usando o padrão createElement / appendChild
function criarCardPizza(pizza) {
    const card = document.createElement('div');
    card.classList.add('pizza-card');

    const img = document.createElement('img');
    // Caso a imagem seja apenas o nome do ficheiro (ex: "sensacao.png"), apontamos para a sua pasta ./img/
    img.src = pizza.imagem.startsWith('http') || pizza.imagem.startsWith('./') ? pizza.imagem : `./img/${pizza.imagem}`;
    img.alt = pizza.nome;

    const titulo = document.createElement('h3');
    titulo.textContent = pizza.nome;

    const descricao = document.createElement('p');
    descricao.textContent = pizza.descricao;

    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(descricao);

    return card;
}

// Filtra e renderiza as pizzas com base no clique
function processarPizzas(listaPizzas, tipoSelecionado, grid, menuSection) {
    if (!listaPizzas || listaPizzas.length === 0) {
        console.warn("Nenhuma pizza encontrada.");
        return;
    }

    for (let i = 0; i < listaPizzas.length; i++) {
        const pizza = listaPizzas[i];

        // MAPEAMENTO DO POSTMAN: Acedemos a pizza.tipo[0].nome para comparar o texto ("Doce" ou "Salgada")
        const temTipo = pizza.tipo && pizza.tipo[0] && pizza.tipo[0].nome;
        const tipoPizzaTexto = temTipo ? pizza.tipo[0].nome.toLowerCase() : "";

        if (tipoSelecionado === "Todos" || tipoPizzaTexto === tipoSelecionado.toLowerCase()) {
            const cardNovo = criarCardPizza(pizza);
            grid.appendChild(cardNovo);
        }
    }
    menuSection.classList.remove('hidden');
}

// Comanda a atualização da tela
async function carregarCardapio(tipoSelecionado) {
    pizzas = await getPizzas();

    const grid = document.getElementById('pizza-grid');
    const titleBanner = document.getElementById('menu-title');
    const menuSection = document.getElementById('menu-view');

    grid.replaceChildren();

    if (tipoSelecionado === "Todos") {
        titleBanner.textContent = "Todos os Sabores";
    } else if (tipoSelecionado.toLowerCase() === "salgada") {
        titleBanner.textContent = "Pizzas Salgadas";
    } else if (tipoSelecionado.toLowerCase() === "doce") {
        titleBanner.textContent = "Pizzas Doces";
    }

    processarPizzas(pizzas, tipoSelecionado, grid, menuSection);
}

// Configura os botões de clique das categorias
function inicializarBotoes() {
    const botoesCategoria = document.querySelectorAll('.category-btn');

    for (let i = 0; i < botoesCategoria.length; i++) {
        const botao = botoesCategoria[i];

        botao.addEventListener('click', (evento) => {
            evento.preventDefault();

            // Pega o valor do data-type ("Todos", "Salgada" ou "Doce")
            const tipoTexto = botao.getAttribute('data-type');
            carregarCardapio(tipoTexto);
        });
    }
}

// Inicialização automática do site
async function inicializar() {
    inicializarBotoes();
    await carregarCardapio("Todos"); 
}

window.onload = inicializar;