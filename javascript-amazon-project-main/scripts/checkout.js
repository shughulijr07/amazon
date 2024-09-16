import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { products, loadProducts } from '../data/products.js';
import { cart } from '../data/cart.js';

loadProducts(displayCart);

function displayCart(){
    renderOrderSummary();
    renderPaymentSummary();
}


