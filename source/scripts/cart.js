import { isEscapeKey, increase, decrease } from './utils.js';

const cartTemplate = document.querySelector('#card-cart').content.querySelector('.cart__cart-list-item');
const cartOpenButton = document.querySelector('.header-menu__button--cart');
const cartWrapper = document.querySelector('.cart__cart-background');
const cartList = cartWrapper.querySelector('.cart__cart-list');
const cartCloseButton = cartWrapper.querySelector('.cart__cart-close');
const cartClearAllButton = cartWrapper.querySelector('.cart__cart-clear');
const cartActionButton = cartWrapper.querySelector('.cart-product__action');
// const cart = cartWrapper.querySelector('.cart__cart-wrapper');
// const cartOpenButtonText = document.querySelector('.header-menu__button-text');
// const counterPlus = cartWrapper.querySelector('.cart-product__increase');
// const counterMinus = cartWrapper.querySelector('.cart-product__decrease');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeCart();
  }
};

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
};

const onCartActionButtonClick = (evt) => {
  if (evt.target.classList.contains('cart-product__action')) {
    (evt.target.closest('.cart__cart-list-item')).remove();
  }
};

const onCartClearAllButtonClick = (evt) => {
  if (evt.target.classList.contains('cart__cart-clear')) {
    const cards = cartList.querySelectorAll('.cart__cart-list-item');
    cards.forEach((item) => item.remove());
  }
};

function closeCart () {
  cartWrapper.classList.add('cart__cart-background--hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  cartCloseButton.removeEventListener('click', onCartCloseButtonClick);
  cartList.removeEventListener('click' , onCounterClick);
  cartClearAllButton.removeEventListener('click', onCartClearAllButtonClick);
  if (cartActionButton) {
    cartActionButton.removeEventListener('click', onCartActionButtonClick);
  }
}

const onCartOpenButtonClick = () => {
  cartWrapper.classList.remove('cart__cart-background--hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cartCloseButton.addEventListener('click', onCartCloseButtonClick);
  cartList.addEventListener('click' , onCounterClick);
  cartClearAllButton.addEventListener('click', onCartClearAllButtonClick);
  if (cartActionButton) {
    cartActionButton.addEventListener('click', onCartActionButtonClick);
  }
};

cartOpenButton.addEventListener('click', onCartOpenButtonClick);

const renderToCart = ({id, name, price, image}) => {
  const fragment = document.createDocumentFragment();

  const card = cartTemplate.cloneNode(true);
  const cardImage = card.querySelector('.cart-product__image');
  const cardPrice = card.querySelector('.cart-product__price');
  const cardTitle = card.querySelector('.cart-product__title');
  const source = card.querySelector('source');
  const counter = card.querySelector('.cart-product__product-counter');
  source.srcset = `./images/mock-item-cart${image}@1x.webp, ./images/mock-item-cart${image}@2x.webp 2x`;
  card.dataset.id = id;
  cardImage.src = `./images/mock-item-cart${image}@1x.png`;
  cardImage.srcset = `./images/mock-item-cart${image}@2x.png`;
  cardPrice.textContent = `${price} ₽`;
  cardTitle.textContent = name;
  counter.textContent = 1;
  counter.dataset.counter = id;

  fragment.appendChild(card);

  cartList.appendChild(fragment);
};

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
};

export { addToCart };
