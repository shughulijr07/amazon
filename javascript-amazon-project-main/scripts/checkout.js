import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { products } from '../data/products.js';
import { cart } from '../data/cart.js';

renderOrderSummary();
renderPaymentSummary();


// loadProducts(displayCart);

// function displayCart(){
//     renderOrderSummary();
//     renderPaymentSummary();
// }

/* If solution above fail try this one below
new Promise((resolve) =>{
    loadProducts(() =>{
        resolve();
    })
}).then(() =>{
   renderOrderSummary();
   renderPaymentSummary();
});

*/



