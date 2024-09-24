import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { products } from '../data/products.js';
import { cart } from '../data/cart.js';

renderOrderSummary();
renderPaymentSummary();