import {pizzaJson} from '../products/pizzas.js'

//funcòes que selecionam os elementos do HTML
const selectElement = (el) => document.querySelector(el);
const SelectAll = (el) => document.querySelectorAll(el);

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
        console.log(pizzaJson[itemKey]);

        // Populando o modal com as informações do item clicado
        selectElement('.pizzaBig img').src = pizzaJson[itemKey].img;
        selectElement('.pizzaInfo h1').innerHTML = pizzaJson[itemKey].name;
        selectElement('.pizzaInfo--desc').innerHTML = pizzaJson[itemKey].description;
        selectElement('.pizzaInfo--actualPrice').innerHTML =  `R$ ${pizzaJson[itemKey].price.toFixed(2)}`;
        
        // ?Inserindo os tamanhos e quantidade de cada pizza
        SelectAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            size.querySelector('span').innerHTML = pizzaJson[itemKey].sizes[sizeIndex];
        })


        //Exebindo o modal com animação
        selectElement('.pizzaWindowArea').style.opacity = 0;
        selectElement('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            selectElement('.pizzaWindowArea').style.opacity = 1;
        }, 300)
   })


   // Adcionar os itens de cada pizza na tela
   selectElement('.pizza-area').appendChild(pizzaItem)  ; 
})