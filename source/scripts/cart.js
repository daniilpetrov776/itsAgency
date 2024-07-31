import { isEscapeKey, increase, decrease, declension } from './utils.js';
import { renderToCart } from './render-products.js';

const cartOpenButton = document.querySelector('.header-menu__button--cart');
const cartWrapper = document.querySelector('.cart__cart-background');
const cartList = cartWrapper.querySelector('.cart__cart-list');
const cartCloseButton = cartWrapper.querySelector('.cart__cart-close');
const cartClearAllButton = cartWrapper.querySelector('.cart__cart-clear');
const cartTotal = cartWrapper.querySelector('.cart__cart-total-price');
const productsTotalCart = cartWrapper.querySelector('.cart__cart-count-number');
const productsTotal = document.querySelector('.header-menu__button-text');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeCart();
  }
};

const recalculate = (property) => {
  const cartItems = cartWrapper.querySelectorAll('.cart__cart-list-item');
  let total = 0;

  cartItems.forEach((item) => {
    if (property === 'quantity') {
      const counter = parseInt(item.querySelector('.cart-product__product-counter').textContent, 10);
      total += counter;
    } else if (property === 'price') {
      const price = parseFloat(item.querySelector('.cart-product__price').textContent.replace(' ₽', '')) || 0;
      const counter = parseInt(item.querySelector('.cart-product__product-counter').textContent, 10) || 0;
      total += price * counter;
    }
  });

  if (property === 'quantity') {
    productsTotalCart.textContent = declension(total);
    productsTotal.textContent = total;
  } else if (property === 'price') {
    cartTotal.textContent = `${total} ₽`;
  }
};

recalculate('quantity');

const onCartCloseButtonClick = () => {
  closeCart();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCounterClick = (evt) => {
  if (evt.target.classList.contains('cart-product__decrease')) {
    decrease(evt.target.nextElementSibling);
    if (parseInt(evt.target.nextElementSibling.textContent, 10) === 0) {
      (evt.target.closest('.cart__cart-list-item')).remove();
    }
  }
  if (evt.target.classList.contains('cart-product__increase')) {
    increase(evt.target.previousElementSibling);
  }
  recalculate('price');
  recalculate('quantity');
};

const onCartActionButtonClick = (evt) => {
  if (evt.target.classList.contains('cart-product__action')) {
    (evt.target.closest('.cart__cart-list-item')).remove();
    recalculate('price');
    recalculate('quantity');
  }
};

const onCartClearAllButtonClick = () => {
  cartList.innerHTML = '';
  recalculate('price');
  recalculate('quantity');
};

const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  cartCloseButton.addEventListener('click', onCartCloseButtonClick);
  cartClearAllButton.removeEventListener('click', onCartClearAllButtonClick);
  cartList.removeEventListener('click' , onCounterClick);
  cartWrapper.removeEventListener('click', onCartActionButtonClick);
};

const addEventListeners = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  cartCloseButton.addEventListener('click', onCartCloseButtonClick);
  cartClearAllButton.addEventListener('click', onCartClearAllButtonClick);
  cartList.addEventListener('click' , onCounterClick);
  cartWrapper.addEventListener('click', onCartActionButtonClick);
};

function closeCart () {
  cartWrapper.classList.add('cart__cart-background--hidden');
  removeEventListeners();
}

const onCartOpenButtonClick = () => {
  cartWrapper.classList.remove('cart__cart-background--hidden');
  addEventListeners();
  recalculate('price');
  recalculate('quantity');
};

cartOpenButton.addEventListener('click', onCartOpenButtonClick);

const increaseCounter = (id) => {
  const cartCards = [...cartWrapper.querySelectorAll('.cart__cart-list-item')];
  const item = cartCards.find((product) => product.getAttribute('data-id') === id.toString());
  if (item) {
    const cardCounter = item.querySelector('.cart-product__product-counter');
    increase(cardCounter);
  }
};

const addToCart = (product) => {
  const cartCards = [...cartWrapper.querySelectorAll('.cart__cart-list-item')];
  const existingProduct = cartCards.find((item) => item.getAttribute('data-id') === product.id.toString());
  if (existingProduct) {
    increaseCounter(product.id);
  } else {
    renderToCart(product);
  }
  recalculate('price');
  recalculate('quantity');
};

export { addToCart };
