export let cart;

loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveToStorage(){
   localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId,selected){
  let matchingItem;
  cart.forEach((cartItem) =>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });
   
  if(matchingItem){
     matchingItem.quantity += selected 
  }else{
    cart.push({
      productId: productId,
      quantity: selected,
    });
  }
  saveToStorage();
  updateCartNumber()
}

export function removeFromCart(productId){
  let newCart = [];

  cart.forEach((cartItem) =>{
      if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
     cart = newCart;
     saveToStorage();
     updateCartNumber();
}

export function updateCartNumber(){
  let totalQuantity = 0;
  cart.forEach((cartItem) =>{
    totalQuantity += cartItem.quantity; 
  });

  document.querySelector('.cart-quantity').innerHTML = totalQuantity;
  return totalQuantity;
}

export function decreaseCart(productId){
  cart.forEach((cartItem) =>{
    if(cartItem.productId === productId){
        if(cartItem.quantity > 1){
           cartItem.quantity -= 1;
        }
        document.querySelector(`.quantity-${productId}`).innerHTML = cartItem.quantity;
        document.querySelector('.cart-total').innerHTML = updateCartNumber();
    }
  });
  saveToStorage(); 
  updateCartNumber();
}

export function increaseCart(productId){
  cart.forEach((cartItem) =>{
    if(cartItem.productId === productId){
        cartItem.quantity += 1;
        document.querySelector(`.quantity-${productId}`).innerHTML = cartItem.quantity;
        document.querySelector('.cart-total').innerHTML = updateCartNumber();
    }
  });
  saveToStorage(); 
  updateCartNumber();
}
updateCartNumber(); 



