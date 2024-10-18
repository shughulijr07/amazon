import { updateQuantity } from "../data/cart.js";
import { orders } from "../data/order.js";
import { orderItems } from "../data/orderItems.js";
import { getproduct, products } from "../data/products.js";


let orderList;
orders.forEach((order) => {
      let orderId = order.orderId;

      // Filter to get all items that belong to the current order - Code start here
      let matchingOrderItems = orderItems.filter((orderItem) => orderItem.orderId === orderId);

      // Initialize a variable to hold the HTML for the current order
      let orderItemsHtml = '';

      matchingOrderItems.forEach((orderItem) => {
        let product = getproduct(orderItem.productId); // Get the product details

        orderItemsHtml += `
          <div class="order-details-grid">
              <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
              </div>

              <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-delivery-date">Arriving on: August 15</div>
                <div class="product-quantity">Quantity: ${orderItem.quantity}</div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html">
                  <button class="track-package-button button-secondary">Track package</button>
                </a>
              </div>
            </div>
          `;
        });

        // Now create the order container that includes all the items for the order
        let orderListHtml = `
          <div class="order-container">
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${order.orderDate}</div>
                </div>

                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>Tsh ${order.totalPrice}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.orderId}</div>
              </div>
            </div>

            ${orderItemsHtml} <!-- Insert all items for the current order here -->
          </div>
       `;

        // Append the order HTML to the orderList
        orderList += orderListHtml;
});
document.querySelector('.orders-grid').innerHTML = orderList;

let html = `
   <span>${updateQuantity()}</span>
`;

document.querySelector('.cart-quantity').innerHTML = html;
