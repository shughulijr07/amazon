const relatedProducts = [
      { name: 'Related Product 1', price: 79.99, image: './images/products/blackout-curtain-set-beige.webp' },
      { name: 'Related Product 2', price: 89.99, image: './images/products/coffeemaker-with-glass-carafe-black.jpg' },
      { name: 'Related Product 3', price: 12.99, image: './images/products/6-piece-non-stick-baking-set.webp'},
      { name: 'Related Product 1', price: 79.99, image: './images/products/blackout-curtain-set-beige.webp' },
      { name: 'Related Product 2', price: 89.99, image: './images/products/coffeemaker-with-glass-carafe-black.jpg' },
      { name: 'Related Product 3', price: 12.99, image: './images/products/6-piece-non-stick-baking-set.webp'}
  ];
  
  const productGrid = document.querySelector('.product-grid');
  
  // Generate related products dynamically
  relatedProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
  
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <p class="product-name">${product.name}</p>
      <p class="product-price">$${product.price}</p>
    `;
    
    productGrid.appendChild(productCard);
  });
  