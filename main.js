// URL base que você vai usar quando a API estiver pronta
const url = 'http://localhost:8080/v1/senai/pizzaria/pizza';

// Função para criar o card da pizza 
function criarCardPizza(pizza) {
    const card = document.createElement('div');
    card.classList.add('pizza-card');

    const img = document.createElement('img');
    img.src = pizza.imagem;
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

const dadosProvisorios = [
    {
        id: 1,
        nome: "Calabresa",
        descricao: "Molho de tomate especial, muçarela premium, calabresa defumada fatiada e cebola roxa.",
        imagem: "./img/pizza_home.svg",
        tipo: ["Salgada"]
    },
    {
        id: 2,
        nome: "Brigadeiro Gourmet",
        descricao: "Chocolate ao leite artesanal coberto com granulado belga e morangos frescos.",
        imagem: "./img/pizza_home.svg",
        tipo: ["Doce"]
    },
    {
        id: 3,
        nome: "Reprovados",
        descricao: "Leandro dos Reis, Gabriel, Enzzo, Gisele e Evelyn reprovados",
        imagem: "./img/sabor_manoel.png",
        tipo: ["Salgada"]
    }
];

function carregarCardapio(tipoSelecionado) {
    const grid = document.getElementById('pizza-grid');
    const titleBanner = document.getElementById('menu-title');
    const menuSection = document.getElementById('menu-view');


    grid.replaceChildren()

    if (tipoSelecionado === "Todos") {
        titleBanner.textContent = "Todos os Sabores";
    } else {
        titleBanner.textContent = "Pizzas " + tipoSelecionado + "s";
    }

  
    function processarPizzas(listaPizzas) {


        for (let i = 0; i < listaPizzas.length; i++) {
            const pizza = listaPizzas[i];

            if (tipoSelecionado === "Todos" || pizza.tipo[0] === tipoSelecionado) {
                const cardNovo = criarCardPizza(pizza);
                grid.appendChild(cardNovo);
            }
        }
        menuSection.classList.remove('hidden');
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            processarPizzas(data);
        })
        .catch(() => {
            processarPizzas(dadosProvisorios);
        });
}

function inicializarBotoes() {
    const botoesCategoria = document.querySelectorAll('.category-btn');
    
    for (let i = 0; i < botoesCategoria.length; i++) {
        const botao = botoesCategoria[i];
        
        botao.addEventListener('click', (evento) => {
            evento.preventDefault();
            const tipo = botao.getAttribute('data-type');
            carregarCardapio(tipo);
        });
    }

    carregarCardapio('Todos'); 
}

window.onload = inicializarBotoes;