import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { updateCartNumber } from "../../data/cart.js";
 
renderPaymentSummary();
export function renderPaymentSummary(){
  let totalCost = 0; 
  let matchingItem;
    cart.forEach(cartItem => { 
      products.forEach(product =>{
        if(product.id === cartItem.productId){
          matchingItem = product;
        }
      });
      totalCost += matchingItem.priceCents * cartItem.quantity; 
      
    });

    let shippingCost = 0;
    let totalBeforeTax = totalCost + shippingCost;
    let estimatedTax = 0;
    let totalOrder = totalBeforeTax + estimatedTax;
    let html = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (<span class="cart-total"></span>):</div>
        <div class="payment-summary-money">${totalCost.toLocaleString()}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${shippingCost.toLocaleString()}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${totalBeforeTax.toLocaleString()}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${estimatedTax}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${totalOrder.toLocaleString()}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button> 
      `;

      document.querySelector('.payment-summary').innerHTML = html;
      document.querySelector('.cart-total').innerHTML = updateCartNumber();

      document.querySelector('.place-order-button').addEventListener('click', ()=>{
        window.location = '/orders.html';
      })
}