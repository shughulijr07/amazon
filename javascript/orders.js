import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let orderListHtml = '';

 let list = products.filter(product => product.keywords.find(keyword => keyword.includes('shi')
 ));

 console.log(list)
