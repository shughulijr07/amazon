import {products,} from "../data/products.js";
import { addToCart, updateQuantity } from "../data/cart.js";

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

          ${product.extraInfoHtml()}

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
