// source/scripts/render-products.js
var cardTemplate = document.querySelector("#card").content.querySelector(".products__products-list-item");
var cartTemplate = document.querySelector("#card-cart").content.querySelector(".cart__cart-list-item");
var cardsList = document.querySelector(".products__products-list");
var cartList = document.querySelector(".cart__cart-list");
var renderProducts = (products) => {
  const fragment = document.createDocumentFragment();
  products.forEach(({ id, name, price, image }) => {
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(".card__card-image");
    const cardPrice = card.querySelector(".card__card-price");
    const cardTitle = card.querySelector(".card__card-title");
    const sources = card.querySelectorAll("source");
    sources[0].srcset = `./images/mock-item${image}@1x.webp, ./images/mock-item${image}@2x.webp 2x`;
    sources[1].srcset = `./images/mock-item${image}@1x.png, ./images/mock-item${image}@2x.png 2x`;
    sources[2].srcset = `./images/mock-item-mobile${image}@1x.webp, ./images/mock-item-mobile${image}@2x.webp 2x`;
    card.dataset.id = id;
    cardImage.src = `./images/mock-item-mobile${image}@1x.png`;
    cardImage.srcset = `./images/mock-item-mobile${image}@2x.png`;
    cardPrice.textContent = `${price} \u20BD`;
    cardTitle.textContent = name;
    fragment.appendChild(card);
  });
  cardsList.appendChild(fragment);
};
var renderToCart = ({ id, name, price, image }) => {
  const fragment = document.createDocumentFragment();
  const card = cartTemplate.cloneNode(true);
  const cardImage = card.querySelector(".cart-product__image");
  const cardPrice = card.querySelector(".cart-product__price");
  const cardTitle = card.querySelector(".cart-product__title");
  const source = card.querySelector("source");
  const counter = card.querySelector(".cart-product__product-counter");
  source.srcset = `./images/mock-item-cart${image}@1x.webp, ./images/mock-item-cart${image}@2x.webp 2x`;
  card.dataset.id = id;
  cardImage.src = `./images/mock-item-cart${image}@1x.png`;
  cardImage.srcset = `./images/mock-item-cart${image}@2x.png`;
  cardPrice.textContent = `${price} \u20BD`;
  cardTitle.textContent = name;
  counter.textContent = 1;
  counter.dataset.counter = id;
  fragment.appendChild(card);
  cartList.appendChild(fragment);
};
var removeProducts = () => {
  const elements = cardsList.querySelectorAll(".card");
  elements.forEach((element) => element.remove());
};
export {
  removeProducts,
  renderProducts,
  renderToCart
};
//# sourceMappingURL=render-products.js.map
