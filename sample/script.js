const relatedProducts = [
    { name: 'Related Product 1', price: 79.99, image: 'images/2.webp' },
    { name: 'Related Product 2', price: 89.99, image: 'images/2.webp' },
    { name: 'Related Product 3', price: 59.99, image: 'images/2.webp' }
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
  