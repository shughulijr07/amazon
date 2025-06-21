import { addToCart, cart, updateCartNumber } from "../data/cart.js";
import { products } from "../data/products.js";

  let searchBar = document.querySelector('.search-bar');

  searchBar.addEventListener('input', function(){
    let query = searchBar.value;
    let filtered = filterProduct(query);
    displayResults(filtered);
  });

  function filterProduct(query){
    return products.filter(product =>{
      let lowerQuery = query.toLowerCase();
      let nameMatch = product.name.toLowerCase().includes(lowerQuery);
      let keywordMatch = product.keywords.some(keyword =>
        keyword.toLowerCase().includes(lowerQuery)
        );

      return nameMatch || keywordMatch;  
    });
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
    
            <div class="added-to-cart message-${product.id}">
              <img src="images/icons/checkmark.png">
              Added Successful
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

  // Badala ya kuweka event moja moja kwenye kila button, tumeweka listener moja kwenye mzazi (.products-grid), then tumeangalia kama kilichobonyezwa kina class ya "Add to Cart"
  document.querySelector('.products-grid').addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart-button')) {
      const productId = event.target.dataset.productId;
      const selectedQuantity = parseInt(
        document.querySelector(`.selected-${productId}`).value
      );
      addToCart(productId, selectedQuantity);

      let messageElement = document.querySelector(`.message-${productId}`);
      messageElement.classList.add('show-message');

      setTimeout(()=>{
        messageElement.classList.remove('show-message');
      },1000)
    }
  }); 

  