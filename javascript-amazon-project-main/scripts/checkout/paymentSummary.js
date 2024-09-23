import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { getproduct } from "../../data/products.js";

export function renderPaymentSummary() {
  let totalProductPrice = 0;
  let totalDeliveryCost = 0;
  cart.forEach((cartItem) => {
    let product = getproduct(cartItem.productId);

    totalProductPrice += product.price * cartItem.quantity;
    //This is the code to get total Cost of delivery for all products in the cart
    let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    totalDeliveryCost += deliveryOption.price;
  });
  let totalBeforeTax = totalProductPrice + totalDeliveryCost;
  let tax = totalBeforeTax * 0.1 ; //0.1 comes from 10% of tax
  let totalCost = totalBeforeTax + tax;

  let paymentSummaryHtml = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">Tsh ${totalProductPrice.toLocaleString()}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">Tsh ${totalDeliveryCost.toLocaleString()}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">Tsh ${totalBeforeTax.toLocaleString()}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">Tsh ${tax.toLocaleString()}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">Tsh ${totalCost.toLocaleString()}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
      `;

      document.querySelector('.payment-summary').innerHTML = paymentSummaryHtml;
}
