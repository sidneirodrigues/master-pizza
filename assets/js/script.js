import {pizzaJson} from '../products/pizzas.js'

// Variavel de itens no carrinho
let cart = [];
// Variavel com a quantidade de pizza
let modalQtdPizza = 0;
let modalKey = 0;

//funcòes que selecionam os elementos do HTML
const selectElement = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

// Mapeamento de cada item do array produtos pizzas.js
pizzaJson.map((item, index)=> {
    //Clonando modelo html no jS
   let pizzaItem = selectElement('.models .pizza-item').cloneNode(true);

   // Setando atributo para identificar o item clicado.
   pizzaItem.setAttribute('data-key', index);

   // Preencher as informações em pizza item.
   pizzaItem.querySelector('.pizza-item--img img').src = item.img;   
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

   // Adcionando evento de Click em cada pizza para abrir e fechar o modal o modal 
   pizzaItem.querySelector('a').addEventListener('click', (e)=> {
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
        selectAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[itemKey].sizes[sizeIndex];
        });

        selectElement('.pizzaInfo--qt').innerHTML = modalQtdPizza;


        //Exebindo o modal com animação
        selectElement('.pizzaWindowArea').style.opacity = 0;
        selectElement('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            selectElement('.pizzaWindowArea').style.opacity = 1;
        }, 300);
   })


   // Adcionar os itens de cada pizza na tela
   selectElement('.pizza-area').appendChild(pizzaItem)  ; 
});


function exibirPrice(size) {
    let price = pizzaJson[modalKey].price

    if(size == 0){
       price = 22.90;
       return pizzaJson[modalKey].price = price;
    }
    else if(size == 1){
       price = 35.00;
       return pizzaJson[modalKey].price = price;
    }
    else if(size == 2){
      price = 47.90;
      return pizzaJson[modalKey].price = price;
    }   
}


// Eventos do modal
function closeModal() {
    selectElement('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        selectElement('.pizzaWindowArea').style.display = 'none';
    }, 500);    
}


window.document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('pizzaInfo--cancelButton') || el.classList.contains('pizzaInfo--cancelMobileButton')){
        closeModal();
    }
    else if(el.classList.contains('pizzaInfo--qtmenos')){    
        if(modalQtdPizza > 1){
            modalQtdPizza--;
            selectElement('.pizzaInfo--qt').innerHTML = modalQtdPizza;
        }
    }
    else if(el.classList.contains('pizzaInfo--qtmais')){        
       modalQtdPizza++;
       selectElement('.pizzaInfo--qt').innerHTML = modalQtdPizza;        
    }
    else if(el.classList.contains('pizzaInfo--addButton')){
        //Qual a pizza?
        console.log("pizza: "+modalKey)
        //qual o tamanho?
        let size = parseInt(selectElement('.pizzaInfo--size.selected').getAttribute('data-key'))
        console.log("Tamanho: "+size)
        //qual a quantidade
        console.log("Quantidade: "+modalQtdPizza)

        cart.push({
            id: pizzaJson[modalKey].id,
            size:size,
            qt: modalQtdPizza

        })

        console.log(cart)
        closeModal();
    }   
});

selectAll('.pizzaInfo--size').forEach((size)=> {   
    size.addEventListener('click', ()=>{
        selectElement('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');

        let sizeItem = selectElement('.pizzaInfo--size.selected').getAttribute('data-key')
        selectElement('.pizzaInfo--actualPrice').innerHTML = (exibirPrice(sizeItem).toFixed(2))
    })                             
});

console.log(navigator.appName)
console.log(browser.name)

