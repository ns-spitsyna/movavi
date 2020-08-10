'use strict';
import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
const products = [
  {
    id: 1,
    name: "Video Suite",
    discountPrice: 1990,
    price: 3770
  },    
   {
    id: 2,
    name: "Video Suite + Photo Editor",
    discountPrice: 2490,
    price: 5060
  }
];


let timeSale = 900000;
let timer = +localStorage.getItem('timer') ? +localStorage.getItem('timer') : 0;
let sale = (timeSale-timer) > 0;

var totalSum = getTotalSum(sale);

// Таймер с подменой цен
if (sale) { 
  let timerId = setInterval(()=> {
    timer +=1000;
    localStorage.setItem('timer', timer)
  }, 1000);

  let discount = document.querySelectorAll('.hide');
  for(let i = 0; i < discount.length; i++){
    discount[i].classList.remove('hide');
  }

  let fullSale = document.querySelectorAll('.full-sale');
  for(let i = 0; i < fullSale.length; i++){
    fullSale[i].classList.remove('full-sale');
    fullSale[i].classList.add('full');
  }

  setTimeout( () => {
      sale = false;
      clearTimeout(timerId);
      localStorage.setItem('timer', timeSale);
      let hide = document.querySelectorAll('.discount');
      for(let i = 0; i < hide.length; i++) {
        hide[i].style.display = 'none';
      }

      let full = document.querySelectorAll('.full');
      for(let i = 0; i < full.length; i++) {
        full[i].classList.add('discount');
        full[i].classList.remove('full');
      }

      let totalSum = getTotalSum(sale);
      let show = document.querySelector('.modal').style.display;

      if (show == 'flex') { 
        hideCart();
        showWindowCart(totalSum);
      }

      totalHeader(totalSum);
      showMessage();
    }, timeSale - timer );
} 


totalHeader(totalSum);

let itemsArray = getListProducts();
localStorage.setItem('items', JSON.stringify(itemsArray));

document.addEventListener('click', function(event) {
  let totalSum;
 
  let idLink = event.target.dataset.id;
  if (idLink) { 
    let itemsArray = getListProducts();
    let idx = itemsArray.findIndex(item => item.id == idLink);
    if (idx != -1) {
      itemsArray[idx].count += 1;
    } else { 
      itemsArray.push({id: idLink, count: 1});
    }
    localStorage.setItem('items', JSON.stringify(itemsArray));
    
    totalSum = getTotalSum(sale);
    totalHeader(totalSum);
    showWindowCart(totalSum);
  } else if(event.target && event.target.classList.contains('cart-link__price')) {
    totalSum = getTotalSum(sale);
    toogleCart(totalSum)
  } else if(event.target && event.target.classList.contains('modal__link--delete')) {
    deleteProduct(event.target.dataset.id_del);
  } else if(event.target && event.target.classList.contains('modal__link--delall')) {
    deleteAll();
  } else if(event.target && event.target.classList.contains('end-sale')) {
    hideMessage();
  }

});

// Скрыть окно корзины
function hideCart() {
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none'; 
}

let linkBack = document.querySelector('.link--back');
let overlay = document.querySelector('.overlay');


linkBack.addEventListener('click', hideCart);
overlay.addEventListener('click', hideCart);


// Показать окно корзины
function showWindowCart(totalSum) {
  document.querySelector('.modal').style.display = 'flex';
  document.querySelector('.overlay').style.display = 'block';

  let listData = getListProducts();
  let itemsList = '';

  if(listData.length == 0) {
    itemsList = 'Shopping cart is empty';
  }

  let form = document.querySelector('.modal__content');
  
  for(let i = 0; i < listData.length; i++) {
  const findItem = products.find(item => item.id == listData[i].id);
  let sumProducts = getActualPrice(findItem, sale);
    
  itemsList += `
      <div class="modal__product">
        <img src="./images/products/pic.png" alt="" class="modal__img">
        <div class="modal__wrap">
          <div class="modal__name">${findItem.name}</div>
          <div class="modal__price bold">${sumProducts*listData[i].count}<span class="ml-5">руб.</span></div>
          <a href="#"  data-id_del ='${findItem.id}' class="modal__link link--grey modal__link--delete">Delete</a>
        </div>
        
      </div>
    `;
  }
  form.innerHTML =`<div class="modal__title">Shopping Cart</div>
  <div class="modal-cart"> ${itemsList}</div>
  <div class="modal__total bold">Total: <div><span class="clear-sum">${totalSum}</span><span class="ml-5">руб.</span></div></div>    
  <button class="button button--blue modal__button">Check out</button>
  <a href="#" class="modal__link modal__link--delall link--grey">Delete All</a></div>`
}

// Удалить товар из корзины
function deleteProduct(id) {
  let itemsList = getListProducts();
  itemsList = itemsList.filter(item => item.id != id);
  localStorage.setItem('items', JSON.stringify(itemsList));
  hideCart();

  let totalSum = getTotalSum(sale)
  showWindowCart(totalSum);
  totalHeader(totalSum);
}

// Получить список товаров в корзине
function getListProducts() {
  return localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
}

// Рассчитать общую сумму товаров в корзине
function getTotalSum(sale) { 
  let itemsArray = getListProducts();
  let total = 0;
  for (let i = 0; i < itemsArray.length; i ++) {
    const findItem = products.find(item => item.id == itemsArray[i].id);
    total += getActualPrice(findItem, sale) * itemsArray[i].count;
  }
  return total;
}

// Удалить все товары из корзины
function deleteAll() {
  localStorage.removeItem('items');
  let totalSum = getTotalSum(sale);
  hideCart();
  showWindowCart(totalSum);
  totalHeader(totalSum);
}

// Обновить общую сумму товаров на странице
function totalHeader(totalSum) {  
  const demoClasses = document.querySelectorAll('.clear-sum');
  demoClasses.forEach(element => {
  element.innerHTML = (totalSum);
  });
}

// Получить актуальную стоимость товара
function getActualPrice(product, sale) {
  return sale ? product.discountPrice : product.price;  
}

// Показать/скрыть корзину
function toogleCart(totalSum) {
  let show = document.querySelector('.modal').style.display;
    if (show == 'flex') { 
      hideCart();
    } else {
      showWindowCart(totalSum);
    }
}

// Показать окно с сообщением что акция закончилась
function showMessage() {
  document.querySelector('.end-sale').style.display = "flex";
}

// Скрыть окно с сообщением что акция закончилась
function hideMessage() {
  document.querySelector('.end-sale').style.display = "none";
}
