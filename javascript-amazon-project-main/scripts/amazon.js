import {products} from "../data/products.js";
import { addToCart, updateQuantity } from "../data/cart.js";

// The code below is for search engine
// let displayProducts = [];
// document.querySelector('.search-button').addEventListener('click', ()=>{
//     let queryElement = document.querySelector('.search-bar');
//     let query = queryElement.value.toLowerCase();
//     const results = products.filter(product => {    
//     if(product.name.toLowerCase().includes(query)){
//       displayProducts.push(product);
//     }
//     });
//     queryElement.value = '';
// });
// End of search engine code
  
function renderProductList(){
let productHtmlList = '';
products.forEach((product) =>{
    let html = `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container-${product.id}" id="selected">
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <!-- ${product.extraInfoHtml()} This is for extra info--!>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
     productHtmlList += html;
});
    document.querySelector('.products-grid').innerHTML = productHtmlList;

    document.querySelectorAll('.add-to-cart-button').forEach((button) =>{
        button.addEventListener('click', ()=>{
           let productId = button.dataset.productId;
           let quantityElement = document.querySelector(`.product-quantity-container-${productId}`);
           let quantityValue = Number(quantityElement.firstElementChild.value);
           addToCart(productId,quantityValue);
           renderProductList();
           updateQuantity();
        });
    });

    let cartHtml = `
        <span>${updateQuantity()}</span>
    `;

    document.querySelector('.cart-quantity').innerHTML = cartHtml;
  
}

renderProductList();

// The code is for back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

document.querySelectorAll('.product-container').forEach((container) =>{
  container.addEventListener('click', ()=>{
    
  })
}) 

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

//End of back to top button code



