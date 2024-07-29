import { isEscapeKey } from './utils.js';

const cartOpenButton = document.querySelector('.header-menu__button--cart');
const cartWrapper = document.querySelector('.cart__cart-background');
const cartCloseButton = cartWrapper.querySelector('.cart__cart-close');

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

function closeCart () {
  cartWrapper.classList.add('cart__cart-background--hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  cartCloseButton.removeEventListener('click', onCartCloseButtonClick);
}

const onCartOpenButtonClick = () => {
  cartWrapper.classList.remove('cart__cart-background--hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cartCloseButton.addEventListener('click', onCartCloseButtonClick);
};

cartOpenButton.addEventListener('click', onCartOpenButtonClick);
