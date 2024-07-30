import { isEscapeKey } from './utils.js';

const cartTemplate = document.querySelector('#card-cart').content.querySelector('.cart__cart-list-item');
const cartOpenButton = document.querySelector('.header-menu__button--cart');
const cartWrapper = document.querySelector('.cart__cart-background');
const cartList = cartWrapper.querySelector('.cart__cart-list');
const cartCloseButton = cartWrapper.querySelector('.cart__cart-close');
const cart = cartWrapper.querySelector('.cart__cart-wrapper');
const cartOpenButtonText = document.querySelector('.header-menu__button-text');
// console.log(cartCards)
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeCart();
  }
};

const onDocumentClick = (evt) => {
  if (!cart.contains(evt.target) && evt.target !== cartOpenButton && evt.target !== cartOpenButtonText) {
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
  document.removeEventListener('click', onDocumentClick);
  cartCloseButton.removeEventListener('click', onCartCloseButtonClick);
}

const onCartOpenButtonClick = () => {
  cartWrapper.classList.remove('cart__cart-background--hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  cartCloseButton.addEventListener('click', onCartCloseButtonClick);
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

  fragment.appendChild(card);

  cartList.appendChild(fragment);
};

const increaseCounter = (id) => {
  const cartCards = [...cartWrapper.querySelectorAll('.cart__cart-list-item')];
  const item = cartCards.find((product) => product.getAttribute('data-id') === id.toString());
  console.log(item)
  if (item) {
    let counter = 1; // Инициализируем счётчик с 1

    const increase = () => {
      counter += 1; // Увеличиваем счётчик на 1
      return counter; // Возвращаем текущее значение счётчика
    };
    // item.setAttribute('data-counter', counter + 1);

    const cardCounter = cart.querySelector('.cart-product__product-counter');
    const result = counter + 1;
    console.log(counter)
    cardCounter.textContent = increase();
  }
};

const addToCart = (product) => {
  const cartCards = [...cartWrapper.querySelectorAll('.cart__cart-list-item')];
  const existingProduct = cartCards.find((item) => item.getAttribute('data-id') === product.id.toString());
  if (existingProduct) {
    increaseCounter(product.id);
  } else {
    // Если товара нет, добавляем его в корзину с начальным счетчиком 1
    renderToCart(product);
  }
};


export { addToCart };
