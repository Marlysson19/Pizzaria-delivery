
let pizzaArea = document.querySelector('.pizza-area');
let pizzaWindowArea = document.querySelector('.pizzaWindowArea');
let pizzaWindowClose = document.querySelector('.pizzaWindowClose');

let pizzaJsonIndex = 0;
let selectedSize = 1;
let quantity = 1;

// Array que guarda as pizzas escolhidas
let cart = [];


// =====================================
// CRIAR A VITRINE DE PIZZAS
// =====================================

pizzaJson.forEach((pizza, index) => {
    let pizzaElement = document.createElement('div');

    pizzaElement.classList.add('pizza');

    pizzaElement.innerHTML = `
        <img src="${pizza.img}" alt="${pizza.name}">
        <h3>${pizza.name}</h3>
        <p>${pizza.description}</p>
        <strong>
            A partir de R$ ${formatarPreco(pizza.price[0])}
        </strong>
    `;

    pizzaElement.addEventListener('click', () => {
        pizzaJsonIndex = index;
        abrirPizza();
    });

    pizzaArea.appendChild(pizzaElement);
});


// =====================================
// FORMATAR PREÇO EM REAIS
// =====================================

function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}


// =====================================
// ABRIR DETALHES DA PIZZA
// =====================================

function abrirPizza() {
    let pizza = pizzaJson[pizzaJsonIndex];

    selectedSize = 1;
    quantity = 1;

    document.querySelector('.pizzaBig img').src = pizza.img;
    document.querySelector('.pizzaInfo h1').textContent = pizza.name;
    document.querySelector('.pizzaInfo--desc').textContent =
        pizza.description;

    document.querySelector('.pizzaInfo--quantity').textContent = quantity;

    let sizesArea = document.querySelector('.pizzaInfo--sizes');
    sizesArea.innerHTML = '';

    pizza.sizes.forEach((size, index) => {
        let sizeElement = document.createElement('div');

        sizeElement.textContent = size;

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

    pizzaWindowArea.style.display = 'flex';
}


// =====================================
// ATUALIZAR TAMANHO SELECIONADO
// =====================================

function atualizarTamanho() {
    let sizes = document.querySelectorAll('.pizzaInfo--sizes div');

    sizes.forEach((size, index) => {
        size.classList.toggle('selected', index === selectedSize);
    });
}


// =====================================
// ATUALIZAR PREÇO
// =====================================

function atualizarPreco() {
    let pizza = pizzaJson[pizzaJsonIndex];
    let total = pizza.price[selectedSize] * quantity;

    document.querySelector('.pizzaInfo--price').textContent =
        `R$ ${formatarPreco(total)}`;
}


// =====================================
// BOTÕES DE QUANTIDADE
// =====================================

let quantityButtons = document.querySelectorAll(
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

function atualizarQuantidade() {
    document.querySelector('.pizzaInfo--quantity').textContent = quantity;
    atualizarPreco();
}


// =====================================
// ADICIONAR PIZZA AO CARRINHO
// =====================================

document.querySelector('.pizzaInfo--addButton')
    .addEventListener('click', () => {

        let pizza = pizzaJson[pizzaJsonIndex];

        let item = {
            id: pizza.id,
            name: pizza.name,
            img: pizza.img,
            size: pizza.sizes[selectedSize],
            sizeIndex: selectedSize,
            quantity: quantity,
            price: pizza.price[selectedSize]
        };

        cart.push(item);

        atualizarCarrinho();

        pizzaWindowArea.style.display = 'none';
    });


// =====================================
// MOSTRAR ITENS DO CARRINHO
// =====================================

function atualizarCarrinho() {
    let cartItems = document.querySelector('.cart-items');

    cartItems.innerHTML = '';

    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        let cartElement = document.createElement('div');

        cartElement.classList.add('cart-item');

        cartElement.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>Tamanho: ${item.size}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p>Valor: R$ ${formatarPreco(itemTotal)}</p>
            </div>

            <button class="remove-item">
                Remover
            </button>
        `;

        cartElement.querySelector('.remove-item')
            .addEventListener('click', () => {
                cart.splice(index, 1);
                atualizarCarrinho();
            });

        cartItems.appendChild(cartElement);
    });

    document.querySelector('.cart-subtotal').textContent =
        `R$ ${formatarPreco(subtotal)}`;
}


// =====================================
// LIMPAR CARRINHO
// =====================================

document.querySelector('.cart-clear')
    .addEventListener('click', () => {
        cart = [];
        atualizarCarrinho();
    });


// =====================================
// FECHAR A JANELA
// =====================================

pizzaWindowClose.addEventListener('click', () => {
    pizzaWindowArea.style.display = 'none';
});

pizzaWindowArea.addEventListener('click', (event) => {
    if (event.target === pizzaWindowArea) {
        pizzaWindowArea.style.display = 'none';
    }
});


// Mostrar carrinho vazio ao iniciar

function atualizarCarrinho() {
    let cartItems = document.querySelector('.cart-items');

    cartItems.innerHTML = '';

    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        let cartElement = document.createElement('div');

        cartElement.classList.add('cart-item');

        cartElement.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>Tamanho: ${item.size}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p>Valor: R$ ${formatarPreco(itemTotal)}</p>
            </div>

            <button class="remove-item">Remover</button>
        `;

        cartElement.querySelector('.remove-item')
            .addEventListener('click', () => {
                cart.splice(index, 1);
                atualizarCarrinho();
            });

        cartItems.appendChild(cartElement);
    });

    // Calcula desconto de 10%
    let desconto = subtotal * 0.10;

    // Calcula o total final
    let total = subtotal - desconto;

    // Atualiza os valores na tela
    document.querySelector('.cart-subtotal').textContent =
        `R$ ${formatarPreco(subtotal)}`;

    document.querySelector('.cart-discount').textContent =
        `R$ ${formatarPreco(desconto)}`;

    document.querySelector('.cart-total').textContent =
        `R$ ${formatarPreco(total)}`;
}

// =====================================
// FINALIZAR PEDIDO PELO WHATSAPP
// =====================================

// Troque pelo número da sua pizzaria.
// Use código do país + DDD + número, somente dígitos.
const telefonePizzaria = '86988131899';


// FINALIZAR PEDIDO COM DADOS DO CLIENTE

document.querySelector('.cart-finish')
    .addEventListener('click', () => {

        if (cart.length === 0) {
            alert('Adicione uma pizza ao carrinho!');
            return;
        }

        const nome = document.querySelector('#customer-name').value.trim();
        const telefone = document.querySelector('#customer-phone').value.trim();
        const endereco = document.querySelector('#customer-address').value.trim();
        const referencia = document.querySelector('#customer-reference').value.trim();
        const pagamento = document.querySelector('#payment-method').value;
        const trocoInput = document.querySelector('#customer-change').value;

        if (!nome || !telefone || !endereco || !pagamento) {
            alert('Preencha seu nome, telefone, endereço e forma de pagamento.');
            return;
        }

        let subtotal = 0;
        let mensagem = '🍕 *NOVO PEDIDO - MINHA PIZZARIA*\n\n';

        mensagem += `*CLIENTE:* ${nome}\n`;
        mensagem += `*TELEFONE:* ${telefone}\n`;
        mensagem += `*ENDEREÇO:* ${endereco}\n`;

        if (referencia) {
            mensagem += `*REFERÊNCIA:* ${referencia}\n`;
        }

        mensagem += '\n*ITENS DO PEDIDO*\n\n';

        cart.forEach((item) => {
            const valorItem = item.price * item.quantity;
            subtotal += valorItem;

            mensagem +=
                `🍕 ${item.name}\n` +
                `Tamanho: ${item.size}\n` +
                `Quantidade: ${item.quantity}\n` +
                `Valor: R$ ${formatarPreco(valorItem)}\n\n`;
        });

        const desconto = subtotal * 0.10;
        const total = subtotal - desconto;

        if (pagamento === 'Dinheiro') {
            if (trocoInput === '') {
                alert('Informe o valor para o qual precisa de troco. Se não precisar, informe o valor exato do pedido.');
                return;
            }

            const trocoPara = Number(trocoInput);

            if (!Number.isFinite(trocoPara) || trocoPara < total) {
                alert('O valor informado para troco precisa ser igual ou maior que o total do pedido.');
                return;
            }

            mensagem += `*TROCO PARA:* R$ ${formatarPreco(trocoPara)}\n`;
        }

        mensagem +=
            '------------------------\n' +
            `Subtotal: R$ ${formatarPreco(subtotal)}\n` +
            `Desconto (10%): R$ ${formatarPreco(desconto)}\n` +
            `*TOTAL: R$ ${formatarPreco(total)}*\n` +
            `*PAGAMENTO:* ${pagamento}\n\n` +
            'Olá! Gostaria de confirmar este pedido.';

        // Substitua pelo WhatsApp da pizzaria:
        // código do país + DDD + número, somente dígitos.
        const telefonePizzaria = '86988131899';

        const url = `https://wa.me/${telefonePizzaria}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, '_blank');
    });

// Mostrar troco somente para pagamento em dinheiro

const paymentMethod = document.querySelector('#payment-method');
const changeArea = document.querySelector('#change-area');

paymentMethod.addEventListener('change', () => {
    if (paymentMethod.value === 'Dinheiro') {
        changeArea.style.display = 'flex';
    } else {
        changeArea.style.display = 'none';
    }
});

    


