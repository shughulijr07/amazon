import { cart,increaseCart,removeFromCart, updateCartNumber,decreaseCart } from "../../data/cart.js";
import { products, } from "../../data/products.js";
import { renderPaymentSummary } from "./paymentSummary.js";

renderOrderDetail()
export function renderOrderDetail(){
  let cartListHtml = '';
  cart.forEach(cartItem => {
    let matchingItem;

    products.forEach(product =>{
      if(product.id === cartItem.productId){
        matchingItem = product;
      }
    });
    // console.log(cartItem.quantity);
    let html = `
      <div class="cart-item-container cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">
              ${(matchingItem.priceCents).toLocaleString()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label quantity-${matchingItem.id}">${cartItem.quantity}</span>
              </span>
              <button class="link-primary decrease-cart" data-product-id=${matchingItem.id}>
                -
              </button>
              <button class="link-primary increase-cart" data-product-id=${matchingItem.id}>
              +
            </button>
              <span class="delete-quantity-link delete-quantity-link-${matchingItem.id} link-primary" data-product-id=${matchingItem.id}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div> 
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    cartListHtml += html;
  });

  document.querySelector('.order-summary').innerHTML = cartListHtml;

  document.querySelectorAll('.delete-quantity-link').forEach((deleteLink) =>{
    deleteLink.addEventListener('click', ()=>{
      let productId = deleteLink.dataset.productId;
      let cartContainer = document.querySelector(`.cart-item-container-${productId}`);
      removeFromCart(productId);
      cartContainer.remove(); 
      document.querySelector('.cart-total').innerHTML = updateCartNumber();
      renderPaymentSummary();
    })
  });

  document.querySelectorAll('.decrease-cart').forEach((button)=>{
    button.addEventListener('click', ()=>{
      let productId = button.dataset.productId;
      decreaseCart(productId);
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.increase-cart').forEach((button)=>{
    button.addEventListener('click', ()=>{
      let productId = button.dataset.productId;
      increaseCart(productId);
      renderPaymentSummary();
    });
  });
 }

 