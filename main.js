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

// Lista local provisória com a estrutura exata do Schema para testar sem a API ligada
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
    }
];

// Função para filtrar e mostrar as pizzas na tela usando
function carregarCardapio(tipoSelecionado) {
    const grid = document.getElementById('pizza-grid');
    const titleBanner = document.getElementById('menu-title');
    const menuSection = document.getElementById('menu-view');

    // Limpa o grid antes de colocar os novos cards
    grid.innerHTML = '';

    // Ajustas o título do banner de forma simples
    if (tipoSelecionado === "Todos") {
        titleBanner.textContent = "Todos os Sabores";
    } else {
        titleBanner.textContent = "Pizzas " + tipoSelecionado + "s";
    }

    // Função interna para processar a lista e colocar na tela
    function processarPizzas(listaPizzas) {
        for (let i = 0; i < listaPizzas.length; i++) {
            const pizza = listaPizzas[i];

            // Verifica o tipo baseado no array do OpenAPI (tipo[0]) ou se foi pedido "Todos"
            if (tipoSelecionado === "Todos" || pizza.tipo[0] === tipoSelecionado) {
                const cardNovo = criarCardPizza(pizza);
                grid.appendChild(cardNovo);
            }
        }
        menuSection.classList.remove('hidden');
    }

    // Tenta carregar da API. Se der erro (porque ela está desligada), usa os dados provisórios
    fetch(url)
        .then(response => response.json())
        .then(data => {
            processarPizzas(data);
        })
        .catch(() => {
            // Se a API não responder ou estiver offline, usa a lista provisória local
            processarPizzas(dadosProvisorios);
        });
}

// Função simples para configurar os botões após a página carregar
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

    // Já carrega "Todos" ao abrir a página para vermos a estrutura funcionando
    carregarCardapio('Todos'); 
}

// Garante que o HTML já existe antes de caçar os botões
window.onload = inicializarBotoes;