import { pizzaJson } from '../products/pizzas.js';

// Variavel de itens no carrinho
let cart = [];
// Variavel com a quantidade de pizza
let modalQtdPizza = 0;
let modalKey = 0;

//funcòes que selecionam os elementos do HTML
const selectElement = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

// Mapeamento de cada item do array produtos pizzas.js
pizzaJson.map((item, index) => {
    //Clonando modelo html no jS
    let pizzaItem = selectElement('.models .pizza-item').cloneNode(true);

    // Setando atributo para identificar o item clicado.
    pizzaItem.setAttribute('data-key', index);

    // Preencher as informações em pizza item.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `A partir de R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // Adcionando evento de Click em cada pizza para abrir e fechar o modal o modal 
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        // Bloquando ação padrao ao clicar em um link(não atualizar)
        e.preventDefault();

        // recuperando e dentificando o elemento clicado para exibicão no modal
        /* closest() procura o elemento mais proximo e que tem o paramentro epecificado*/
        let itemKey = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQtdPizza = 1;
        modalKey = itemKey;

        // Populando o modal com as informações do item clicado
        selectElement('.pizzaBig img').src = pizzaJson[itemKey].img;
        selectElement('.pizzaInfo h1').innerHTML = pizzaJson[itemKey].name;
        selectElement('.pizzaInfo--desc').innerHTML = pizzaJson[itemKey].description;
        selectElement('.pizzaInfo--actualPrice').innerHTML = exibirPrice(2).toFixed(2);

        //Tirando a seleçao padrao do tamanho das pizzas
        selectElement('.pizzaInfo--size.selected').classList.remove('selected')

        // Inserindo os tamanhos e quantidade de cada pizza
        selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[itemKey].sizes[sizeIndex];
        });

        selectElement('.pizzaInfo--qt').innerHTML = modalQtdPizza;


        //Exebindo o modal com animação
        selectElement('.pizzaWindowArea').style.opacity = 0;
        selectElement('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            selectElement('.pizzaWindowArea').style.opacity = 1;
        }, 300);
    })


    // Adcionar os itens de cada pizza na tela
    selectElement('.pizza-area').appendChild(pizzaItem);
});


function exibirPrice(size) {
    let price = pizzaJson[modalKey].price

    if (size == 0) {
        price = 22.90;
        return pizzaJson[modalKey].price = price;
    }
    else if (size == 1) {
        price = 35.00;
        return pizzaJson[modalKey].price = price;
    }
    else if (size == 2) {
        price = 47.90;
        return pizzaJson[modalKey].price = price;
    }
}


// Eventos do modal
function closeModal() {
    selectElement('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        selectElement('.pizzaWindowArea').style.display = 'none';
    }, 500);
}


window.document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('pizzaInfo--cancelButton') || el.classList.contains('pizzaInfo--cancelMobileButton')) {
        closeModal();
    }
    else if (el.classList.contains('pizzaInfo--qtmenos')) {
        if (modalQtdPizza > 1) {
            modalQtdPizza--;
            selectElement('.pizzaInfo--qt').innerHTML = modalQtdPizza;
        }
    }
    else if (el.classList.contains('pizzaInfo--qtmais')) {
        modalQtdPizza++;
        selectElement('.pizzaInfo--qt').innerHTML = modalQtdPizza;
    }
    else if (el.classList.contains('pizzaInfo--addButton')) {
        //Qual a pizza?
        // console.log("pizza: "+modalKey)
        //qual o tamanho?
        let size = parseInt(selectElement('.pizzaInfo--size.selected').getAttribute('data-key'));
        // console.log("Tamanho: "+size)
        //qual a quantidade
        // console.log("Quantidade: "+modalQtdPizza);

        let identifier = pizzaJson[modalKey].id + '@' + size;
        let key = cart.findIndex((item) => item.identifier == identifier);
        if (key > -1) {
            cart[key].qt += modalQtdPizza;

        } else {
            cart.push({
                identifier,
                id: pizzaJson[modalKey].id,
                size,
                qt: modalQtdPizza,
                price: pizzaJson[modalKey].price
            })
        }
        // console.log(cart)
        updateCart();
        closeModal();
    }
});

selectAll('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', () => {
        selectElement('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');

        let sizeItem = selectElement('.pizzaInfo--size.selected').getAttribute('data-key')
        selectElement('.pizzaInfo--actualPrice').innerHTML = (exibirPrice(sizeItem).toFixed(2))
    })
});

// funções de click mobile

selectElement('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        selectElement('aside').style.left = 0;
    }

})

selectElement('.menu-closer').addEventListener('click', () => {
    selectElement('aside').style.left = '100vw';
})

function updateCart() {
    selectElement('.menu-openner span').innerHTML = cart.length;


    if (cart.length != 0) {
        selectElement('aside').classList.add('show');
        selectElement('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            //mapeando o cart
            let cartItem = selectElement('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break
            };

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName}) ${cart[i].price.toFixed(2)}`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            selectElement('.cart').append(cartItem)
            // console.log(pizzaItem)
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        selectElement('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        selectElement('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        selectElement('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        selectElement('aside').classList.remove('show');
        selectElement('aside').style.left = '100vw';
    }
};
