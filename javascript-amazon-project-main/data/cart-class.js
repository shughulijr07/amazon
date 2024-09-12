class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){ // Make sure u use regural function instead of arrow function =>{} when creating a function inside an object
            this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)); // this stands for cart, we use this so that even if u decide to change the object name from let's say cart to anything else,no problem can occur
            if(!this.cartItems){
            this.cartItems =  [
                    {
                        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
                        quantity: 3,
                        deliveryOptionId:'1'
                    },
                    {
                        productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
                        quantity:2,
                        deliveryOptionId: '3'
                    },
                    {
                        productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
                        quantity:1,
                        deliveryOptionId: '2'
                    }
                ];
            }}

            
            saveToStorage(){
                localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
            }
    
             addToCart(productId){
                let matchingItem;
                this.cartItems.forEach((cartItem) => {
                    if(cartItem.productId === productId){
                        matchingItem = cartItem;
                    }
                });
                if(matchingItem){
                    matchingItem.quantity += 1;
                }
                else{
                     this.cartItems.push({productId: productId, quantity: 1, deliveryOptionId: '1'});
                }
            
                this.saveToStorage();
            } 
    
            removeToCart(productId){ //this is called shorthand method, the same as writing removeToCart: (productid){
                let newCart = [];
                this.cartItems.forEach((cartItem) =>{
                  if(cartItem.productId !== productId){
                    newCart.push(cartItem);
                  }
                });
                  this.cartItems = newCart;
                  this.saveToStorage()
            }
            
            updateDeliveryOption(productId,deliveryOptionId){
    
                let matchingOption;
                this.cartItems.forEach((cartItem) =>{
                    if(cartItem.productId == productId){
                        matchingOption = cartItem;
                    }
                });
            
                matchingOption.deliveryOptionId = deliveryOptionId;
                this.saveToStorage();
            }
    
            updateQuantity(){
                let totalQuantity = 0;
                this.cartItems.forEach((cartItem) =>{
                    totalQuantity += cartItem.quantity;
                });
                document.querySelector('.cart-quantity').innerHTML = totalQuantity;
            }
}


let cart = new Cart('cart-oop');
let businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);


