let pizzaArea = document.querySelector('.pizza-area');

let pizzaWindowArea = document.querySelector('.pizzaWindowArea');

let pizzaWindowClose = document.querySelector('.pizzaWindowClose');

let pizzaJsonIndex = 0;

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
        R$ ${pizza.price.toFixed(2).replace('.', ',')}
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


document.querySelector('.pizzaBig img').src =
    pizza.img;


document.querySelector('.pizzaInfo h1').innerHTML =
    pizza.name;


document.querySelector('.pizzaInfo--desc').innerHTML =
    pizza.description;


document.querySelector('.pizzaInfo--price').innerHTML =
    `R$ ${pizza.price.toFixed(2).replace('.', ',')}`;


pizzaWindowArea.style.display = 'flex';


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
