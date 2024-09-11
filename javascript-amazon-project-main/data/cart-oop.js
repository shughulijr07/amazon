
let cart = {
    cartItems : undefined,

    loadFromStorage: function(){ // Make sure u use regural function instead of arrow function =>{} when creating a function inside an object
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop')); // this stands for cart, we use this so that even if u decide to change the object name from let's say cart to anything else,no problem can occur
        if(!this.cartItems){
        this.cartItems =  [
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
        }},

          saveToStorage: function(){
            localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
        },

         addToCart: function(productId){
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
        } ,

        removeToCart(productId){ //this is called shorthand method, the same as writing removeToCart: (productid){
            let newCart = [];
            this.cartItems.forEach((cartItem) =>{
              if(cartItem.productId !== productId){
                newCart.push(cartItem);
              }
            });
              this.cartItems = newCart;
              this.saveToStorage()
        },
        
        updateDeliveryOption(productId,deliveryOptionId){

            let matchingOption;
            this.cartItems.forEach((cartItem) =>{
                if(cartItem.productId == productId){
                    matchingOption = cartItem;
                }
            });
        
            matchingOption.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        },

        updateQuantity(){
            let totalQuantity = 0;
            this.cartItems.forEach((cartItem) =>{
                totalQuantity += cartItem.quantity;
            });
            document.querySelector('.cart-quantity').innerHTML = totalQuantity;
        }
};

cart.loadFromStorage();
console.log(cart)