import { cart , removeToCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
let cartHtmlList = '';
cart.forEach((cartItem) =>{
    let productId = cartItem.productId;
    let matchingItem;
    products.forEach((product) =>{
        if(product.id === productId){
            matchingItem = product;
        }
    });

    //This code is for add delivery date displayed above the product picture
    let deliveryOptionId = cartItem.deliveryOptionId;

    let matchedOption;
    deliveryOptions.forEach((deliveryOption) =>{
        if(deliveryOption.id === deliveryOptionId){
            matchedOption = deliveryOption;
        }
    }); 

    let today = dayjs();
    let deliveryDate = today.add(matchedOption.deliveryDays, 'days');
    let dateString = deliveryDate.format('dddd, MMMM D');
    //End of code is for add delivery date displayed above the product picture

    let html =  `
        <div class="cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingItem.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingItem.name}
                </div>
                <div class="product-price">
                    ${matchingItem.price}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${matchingItem.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                 ${deliveryOptionsHTML(matchingItem, cartItem)}
           
                </div>
            </div>
        </div>
        `;

    cartHtmlList += html;

});
document.querySelector('.order-summary').innerHTML = cartHtmlList;
    // This is a function to generate the html of delivery options
    //1.First, we loop through delivery options and for each option we generate some html
    //2.Generate the html 
    //3.Combine the html

    function deliveryOptionsHTML(matchingItem,cartItem){
     let deliveryHtmllist = '';
     deliveryOptions.forEach((deliveryOption)=>{
        let today = dayjs();
        let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        let dateString = deliveryDate.format('dddd, MMMM D');
        let priceString = deliveryOption.price === 0 ? 'FREE' : deliveryOption.price;

        let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        let html = `
              <div class="delivery-option" 
              data-product-id="${matchingItem.id}"
              data-delivery-option-id="${deliveryOption.id}"
              >
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                    <div>
                    <div class="delivery-option-date">
                         ${dateString}
                    </div>
                    <div class="delivery-option-price">
                         Tsh ${priceString} - Shipping
                    </div>
                    </div>
                </div>
        `;
        deliveryHtmllist += html; 
     });
        return deliveryHtmllist;
}

document.querySelectorAll('.delivery-option').forEach((option) =>{
    option.addEventListener('click', ()=>{
        let productId = option.dataset.productId;
        let deliveryOptionId = option.dataset.deliveryOptionId;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    });
});

document.querySelectorAll('.delete-quantity-link').forEach((button)=>{
     button.addEventListener('click', ()=>{
        let productId = button.dataset.productId;

        removeToCart(productId);

        let container = document.querySelector(`.cart-item-container-${productId}`);
        container.remove();

        renderPaymentSummary();

     })
});
}

renderOrderSummary();
