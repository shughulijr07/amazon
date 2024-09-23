export let cart;

loadFromStorage();

export function loadFromStorage(){
cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
   cart =  [
        {
            productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
            quantity: 2,
            deliveryOptionId:'1'
        },
        {
            productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
            quantity:1,
            deliveryOptionId: '3'
        },
        {
            productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
            quantity:3,
            deliveryOptionId: '2'
        }
    ];
}
}

export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCart(productsId, newCartQuantity){
   let matchingCart;
   cart.forEach((cartItem) =>{
    if(cartItem.productId === productsId){
        matchingCart = cartItem;

    } 
   }); 
   if(matchingCart){
    matchingCart.quantity = Number(newCartQuantity);
   }
   saveToStorage();

}

export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    });
    if(matchingItem){
        matchingItem.quantity += 1;
    }
    else{
         cart.push({productId: productId, quantity: 1, deliveryOptionId: '1'});
    }

    saveToStorage();
} 

export function updateQuantity(){
    let totalQuantity = 0;
    cart.forEach((cartItem) =>{
        totalQuantity += cartItem.quantity;
    });
    
    saveToStorage();
    return totalQuantity;
}

export function removeToCart(productId){
    let newCart = [];
    cart.forEach((cartItem) =>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
      cart = newCart;
      saveToStorage()
}

export function updateDeliveryOption(productId,deliveryOptionId){

    let matchingOption;
    cart.forEach((cartItem) =>{
        if(cartItem.productId == productId){
            matchingOption = cartItem;
        }
    });

    matchingOption.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}