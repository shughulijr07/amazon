import { cart , removeToCart, updateCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js";

let today = dayjs();
let deliveryDate = today.add(1, 'days');
let dateString = deliveryDate.format('dddd, MMMM D');

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
                    Tsh ${matchingItem.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary cart-item"  data-cart-id="${cartItem.productId}">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${matchingItem.id}">
                    Delete
                    </span>
                </div>

               <div class="cart-item mt-10px" >
                    <div id="updateSection-${cartItem.productId}" style="display: none;">
                        <input type="number" class="newQuantity-${cartItem.productId}" min="1" placeholder="New quantity">
                        <button id="confirmButton" class="confirm-button"  data-cart-id="${cartItem.productId}">Confirm</button>
                    </div>
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

let qntyHtml = `
     Checkout (<a class="return-to-home-link cart-quantity"  
            href="amazon.html">${updateQuantity()}</a>) 
`;
document.querySelector('.checkout-header-middle-section').innerHTML = qntyHtml;

document.querySelectorAll(`.update-quantity-link`).forEach((button) =>{
    button.addEventListener('click', ()=>{
        var cartItem = button.closest('.cart-item'); //get properties of an element 
        let productId = cartItem.getAttribute('data-cart-id');
        document.getElementById(`updateSection-${productId}`).style.display = 'block';
    });
});

document.querySelectorAll('.confirm-button').forEach((button)=>{
    button.addEventListener('click', ()=>{
        let cartItemId = button.dataset.cartId;
        let newCartQuantity = document.querySelector(`.newQuantity-${cartItemId}`).value;

        if(newCartQuantity > 0){
        updateCart(cartItemId, newCartQuantity);
        renderOrderSummary();
        }else{
            alert('Please Enter valid quantity');
        }
        // Hide the update section after confirmation
        document.getElementById(`updateSection-${cartItemId}`).style.display = 'none';
        renderPaymentSummary();
    });
});

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

        renderOrderSummary();
        renderPaymentSummary();

     })
});
}

renderOrderSummary();
