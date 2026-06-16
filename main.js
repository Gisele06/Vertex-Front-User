'use strict'

console.log("Main carregado");

// URL da API que será utilizada quando o back-end estiver disponível
const url = 'http://localhost:8080/v1/senai/pizzaria/pizza';

// Cria e retorna um card de pizza
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

    // Adiciona todos os elementos dentro do card
    card.append(img, titulo, descricao);

    // Retorna o card pronto
    return card;
}

// Lista provisória utilizada caso a API esteja desligada
const dadosProvisorios = [
    {
        id: 1,
        nome: "Calabresa",
        descricao: "Molho de tomate especial, muçarela premium, calabresa defumada fatiada e cebola roxa.",
        imagem: "./img/pizza_home.png",
        tipo: ["Salgada"]
    },
    {
        id: 2,
        nome: "Brigadeiro Gourmet",
        descricao: "Chocolate ao leite artesanal coberto com granulado belga e morangos frescos.",
        imagem: "./img/pizza_home.png",
        tipo: ["Doce"]
    }
];

// Percorre a lista de pizzas e adiciona os cards na tela
function processarPizzas(listaPizzas, tipoSelecionado, grid, menuSection) {

    // Percorre todas as pizzas recebidas
    for (let i = 0; i < listaPizzas.length; i++) {

        const pizza = listaPizzas[i];

        // Exibe todas as pizzas ou apenas as do tipo selecionado
        if (tipoSelecionado === "Todos" || pizza.tipo[0] === tipoSelecionado) {

            // Cria o card da pizza
            const cardNovo = criarCardPizza(pizza);

            // Adiciona o card dentro do grid
            grid.append(cardNovo);
        }
    }

    // Exibe a seção do cardápio
    menuSection.classList.remove('hidden');
}

// Carrega o cardápio conforme a categoria escolhida
function carregarCardapio(tipoSelecionado) {

    // Seleciona os elementos da página
    const grid = document.getElementById('pizza-grid');
    const titleBanner = document.getElementById('menu-title');
    const menuSection = document.getElementById('menu-view');

    // Limpa os cards exibidos anteriormente
    grid.replaceChildren()

    // Atualiza o título conforme a categoria escolhida
    if (tipoSelecionado === "Todos") {
        titleBanner.textContent = "Todos os Sabores";
    } else {
        titleBanner.textContent = "Pizzas " + tipoSelecionado + "s";
    }

    // Busca os dados da API
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Processa os dados recebidos da API
            processarPizzas(data, tipoSelecionado, grid, menuSection);

        })
        .catch((erro) => {

            // Caso a API esteja indisponível, utiliza os dados locais
            console.log(erro);

            processarPizzas(
                dadosProvisorios,
                tipoSelecionado,
                grid,
                menuSection
            );
        });
}

// Configura os eventos dos botões de categoria
function inicializarBotoes() {

    // Seleciona todos os botões de categoria
    const botoesCategoria = document.querySelectorAll('.category-btn');

    const grid = document.getElementById('pizza-grid')

    // Percorre todos os botões encontrados
    for (let i = 0; i < botoesCategoria.length; i++) {

        const botao = botoesCategoria[i];

        // Adiciona o evento de clique
        botao.addEventListener('click', (evento) => {
            grid.replaceChildren()
            // Impede o comportamento padrão do botão/link
            evento.preventDefault();

            // Obtém a categoria do atributo data-type
            const tipo = botao.getAttribute('data-type');

            // Atualiza o cardápio
            carregarCardapio(tipo);
        });
    }

    // Carrega todas as pizzas ao abrir a página
    carregarCardapio('Todos');
}

// Aguarda o carregamento completo da página antes de executar o script
window.onload = inicializarBotoes;