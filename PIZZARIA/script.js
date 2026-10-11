let pizzaArea = document.querySelector('.pizza-area');

let pizzaWindowArea = document.querySelector('.pizzaWindowArea');

let pizzaWindowClose = document.querySelector('.pizzaWindowClose');

let pizzaJsonIndex = 0;

let selectedSize = 1;

let quantity = 1;


// =====================================
// CRIAR AS PIZZAS
// =====================================

pizzaJson.forEach((pizza, index) => {

    let pizzaElement = document.createElement('div');

    pizzaElement.classList.add('pizza');

    pizzaElement.innerHTML = `
        <img src="${pizza.img}" alt="${pizza.name}">

        <h3>${pizza.name}</h3>

        <p>${pizza.description}</p>

        <strong>
            A partir de
            R$ ${pizza.price[0].toFixed(2).replace('.', ',')}
        </strong>
    `;


    // =====================================
    // CLIQUE NA PIZZA
    // =====================================

    pizzaElement.addEventListener('click', () => {

        pizzaJsonIndex = index;

        abrirPizza();

    });


    pizzaArea.appendChild(pizzaElement);

});


// =====================================
// ABRIR A JANELA
// =====================================

function abrirPizza() {

    let pizza = pizzaJson[pizzaJsonIndex];


    // começa com tamanho médio

    selectedSize = 1;


    // começa com quantidade 1

    quantity = 1;


    // imagem

    document.querySelector('.pizzaBig img').src =
        pizza.img;


    // nome

    document.querySelector('.pizzaInfo h1').innerHTML =
        pizza.name;


    // descrição

    document.querySelector('.pizzaInfo--desc').innerHTML =
        pizza.description;


    // quantidade

    document.querySelector('.pizzaInfo--quantity').innerHTML =
        quantity;


    // criar tamanhos

    let sizesArea =
        document.querySelector('.pizzaInfo--sizes');


    sizesArea.innerHTML = '';


    pizza.sizes.forEach((size, index) => {

        let sizeElement =
            document.createElement('div');


        sizeElement.innerHTML = size;


        if (index === selectedSize) {

            sizeElement.classList.add('selected');

        }


        sizeElement.addEventListener('click', () => {

            selectedSize = index;


            atualizarTamanho();

            atualizarPreco();

        });


        sizesArea.appendChild(sizeElement);

    });


    atualizarPreco();


    // mostrar janela

    pizzaWindowArea.style.display = 'flex';

}


// =====================================
// ATUALIZAR TAMANHO
// =====================================

function atualizarTamanho() {

    let sizes =
        document.querySelectorAll(
            '.pizzaInfo--sizes div'
        );


    sizes.forEach((size, index) => {

        if (index === selectedSize) {

            size.classList.add('selected');

        } else {

            size.classList.remove('selected');

        }

    });

}


// =====================================
// ATUALIZAR PREÇO
// =====================================

function atualizarPreco() {

    let pizza = pizzaJson[pizzaJsonIndex];


    let price =
        pizza.price[selectedSize];


    let total =
        price * quantity;


    document.querySelector('.pizzaInfo--price').innerHTML =
        `R$ ${total.toFixed(2).replace('.', ',')}`;

}


// =====================================
// BOTÕES DE QUANTIDADE
// =====================================

let quantityButtons =
    document.querySelectorAll(
        '.pizzaInfo--quantityButton'
    );


quantityButtons[0].addEventListener('click', () => {

    if (quantity > 1) {

        quantity--;

        atualizarQuantidade();

    }

});


quantityButtons[1].addEventListener('click', () => {

    quantity++;

    atualizarQuantidade();

});


// =====================================
// ATUALIZAR QUANTIDADE
// =====================================

function atualizarQuantidade() {

    document.querySelector('.pizzaInfo--quantity').innerHTML =
        quantity;


    atualizarPreco();

}


// =====================================
// FECHAR A JANELA
// =====================================

pizzaWindowClose.addEventListener('click', () => {

    pizzaWindowArea.style.display = 'none';

});


// =====================================
// FECHAR CLICANDO FORA
// =====================================

pizzaWindowArea.addEventListener('click', (event) => {

    if (event.target === pizzaWindowArea) {

        pizzaWindowArea.style.display = 'none';

    }

});