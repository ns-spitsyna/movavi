!function(e){var t={};function l(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,l),o.l=!0,o.exports}l.m=e,l.c=t,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(n,o,function(t){return e[t]}.bind(null,o));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/dist",l(l.s=0)}([function(e,t,l){"use strict";const n=[{id:1,name:"Video Suite",discountPrice:1990,price:3770},{id:2,name:"Video Suite + Photo Editor",discountPrice:2490,price:5060}];let o=+localStorage.getItem("timer")?+localStorage.getItem("timer"):0,r=1e4-o>0;if(r){let e=setInterval(()=>{o+=1e3,localStorage.setItem("timer",o)},1e3),t=document.querySelectorAll(".hide");for(let e=0;e<t.length;e++)t[e].classList.remove("hide");let l=document.querySelectorAll(".full-sale");for(let e=0;e<l.length;e++)l[e].classList.remove("full-sale"),l[e].classList.add("full");setTimeout(()=>{r=!1,clearTimeout(e);let t=document.querySelectorAll(".discount");for(let e=0;e<t.length;e++)t[e].style.display="none";let l=document.querySelectorAll(".full");for(let e=0;e<l.length;e++)l[e].classList.add("discount"),l[e].classList.remove("full");let n=m(r);"flex"==document.querySelector(".modal").style.display&&(c(),s(n)),f(n),document.querySelector(".end-sale").style.display="flex"},1e4-o)}f(m(r));let i=u();function c(){document.querySelector(".modal").style.display="none",document.querySelector(".overlay").style.display="none"}localStorage.setItem("items",JSON.stringify(i)),document.addEventListener("click",(function(e){let t=e.target.dataset.id;if(!t)return;let l=u(),n=l.findIndex(e=>e.id==t);-1!=n?l[n].count+=1:l.push({id:t,count:1}),localStorage.setItem("items",JSON.stringify(l));let o=m(r);f(o),s(o)}));let a=document.querySelector(".link--back"),d=document.querySelector(".overlay");function s(e){document.querySelector(".modal").style.display="flex",document.querySelector(".overlay").style.display="block";let t=u(),l="";0==t.length&&(l="Shopping cart is empty");let o=document.querySelector(".modal__content");for(let e=0;e<t.length;e++){const o=n.find(l=>l.id==t[e].id);let i=y(o,r);l+=`\n      <div class="modal__product">\n        <img src="/images/products/pic.png" alt="" class="modal__img">\n        <div class="modal__wrap">\n          <div class="modal__name">${o.name}</div>\n          <div class="modal__price bold">${i*t[e].count}<span class="ml-5">руб.</span></div>\n          <a href="#"  class="modal__link link--grey modal__link--delete" onclick= "deleteProduct(${o.id})">Delete</a>\n        </div>\n        \n      </div>\n    `}o.innerHTML=`<div class="modal__title">Shopping Cart</div>\n  <div class="modal-cart"> ${l}</div>\n  <div class="modal__total bold">Total: <div><span class="clear-sum">${e}</span><span class="ml-5">руб.</span></div></div>    \n  <button class="button button--blue modal__button">Check out</button>\n  <a href="#" class="modal__link link--grey" onclick = "deleteAll()">Delete All</a></div>`}function u(){return localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):[]}function m(e){let t=u(),l=0;for(let o=0;o<t.length;o++){l+=y(n.find(e=>e.id==t[o].id),e)*t[o].count}return l}function f(e){document.querySelectorAll(".clear-sum").forEach(t=>{t.innerHTML=e})}function y(e,t){return t?e.discountPrice:e.price}a.addEventListener("click",c),d.addEventListener("click",c)}]);