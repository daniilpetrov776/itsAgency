import { addToCart } from './cart.js';

const productsContainer = document.querySelector('.products__products-list');

const addGalleryListener = (products) => {
  productsContainer.addEventListener('click', (evt) => {
    const product = evt.target.closest('.card');

    if (product) {
      const selectedProduct = products.find((item) => item.id === Number(product.dataset.id));
      addToCart(selectedProduct);
    }
  });
};

export { addGalleryListener };
