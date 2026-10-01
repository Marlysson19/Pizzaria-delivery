let pizzaArea = document.querySelector('.pizza-area');

pizzaJson.forEach((pizza) => {


let pizzaElement = document.createElement('div');

pizzaElement.classList.add('pizza');

pizzaElement.innerHTML = `
    <img src="${pizza.img}" alt="${pizza.name}">
    <h3>${pizza.name}</h3>
    <p>${pizza.description}</p>
    <strong>R$ ${pizza.price.toFixed(2).replace('.', ',')}</strong>
`;

pizzaArea.appendChild(pizzaElement);


});
