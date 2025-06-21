import { addToCart, cart, updateCartNumber } from "../data/cart.js";
import { products } from "../data/products.js";

  let searchInput = document.querySelector('.search-bar');
  searchInput.addEventListener('input', function(){
    let query = this.value;
    let filtered = filterProducts(query); //filter products first
    displayResults(filtered); //Take product filtered and display to the screen
  });

  function filterProducts(query){
    let lowerQuery = query.toLowerCase();

    return products.filter(product =>{
      let nameMatch = product.name.toLowerCase().includes(lowerQuery);
      let keywordMatch = product.keywords.some(keyword =>  keyword.toLowerCase().includes(lowerQuery)
      );
      return nameMatch || keywordMatch;
    })
  }

  function displayResults(products){
    let resultContainer = document.querySelector('.products-grid');
    resultContainer.innerHTML = ''; //Clear previous result
    
    if(products.length === 0){
      resultContainer.innerHTML = '<p>No Product found</p>';
      return;
    }
    let productHtmlList = '';
    products.forEach((product) =>{
      let html = `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
    
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
    
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
    
            <div>
              <span class="product-price">${(product.priceCents).toLocaleString()} </span>Tsh
            </div>
    
            <div class="product-quantity-container">
              <select class="selected-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
    
            <div class="product-spacer"></div>
    
            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>
    
            <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
    
       productHtmlList += html; 
    });
    resultContainer.innerHTML = productHtmlList;
  }
  
  displayResults(products);

  document.querySelectorAll('.add-to-cart-button').forEach((addButton)=>{
    addButton.addEventListener('click', ()=>{
    let productId = addButton.dataset.productId;
    let selectedValue = document.querySelector(`.selected-${productId}`).value;
    let selected = Number(selectedValue);  
    addToCart(productId,selected); 
    })
  })