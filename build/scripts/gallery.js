// source/scripts/utils.js
var isEscapeKey = (evt) => evt.key === "Escape";
var increase = (el) => {
  let currentCount = parseInt(el.textContent, 10);
  currentCount += 1;
  el.textContent = currentCount;
};
var decrease = (el) => {
  let currentCount = parseInt(el.textContent, 10);
  if (currentCount > 0) {
    currentCount -= 1;
    el.textContent = currentCount;
  }
};
var declension = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} \u0442\u043E\u0432\u0430\u0440`;
  }
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) {
    return `${count} \u0442\u043E\u0432\u0430\u0440\u0430`;
  }
  return `${count} \u0442\u043E\u0432\u0430\u0440\u043E\u0432`;
};

// source/scripts/render-products.js
var cardTemplate = document.querySelector("#card").content.querySelector(".products__products-list-item");
var cartTemplate = document.querySelector("#card-cart").content.querySelector(".cart__cart-list-item");
var cardsList = document.querySelector(".products__products-list");
var cartList = document.querySelector(".cart__cart-list");
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

// source/scripts/cart.js
var cartOpenButton = document.querySelector(".header-menu__button--cart");
var cartWrapper = document.querySelector(".cart__cart-background");
var cartList2 = cartWrapper.querySelector(".cart__cart-list");
var cartCloseButton = cartWrapper.querySelector(".cart__cart-close");
var cartClearAllButton = cartWrapper.querySelector(".cart__cart-clear");
var cartTotal = cartWrapper.querySelector(".cart__cart-total-price");
var productsTotalCart = cartWrapper.querySelector(".cart__cart-count-number");
var productsTotal = document.querySelector(".header-menu__button-text");
var onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeCart();
  }
};
var recalculate = (property) => {
  const cartItems = cartWrapper.querySelectorAll(".cart__cart-list-item");
  let total = 0;
  cartItems.forEach((item) => {
    if (property === "quantity") {
      const counter = parseInt(item.querySelector(".cart-product__product-counter").textContent, 10);
      total += counter;
    } else if (property === "price") {
      const price = parseFloat(item.querySelector(".cart-product__price").textContent.replace(" \u20BD", "")) || 0;
      const counter = parseInt(item.querySelector(".cart-product__product-counter").textContent, 10) || 0;
      total += price * counter;
    }
  });
  if (property === "quantity") {
    productsTotalCart.textContent = declension(total);
    productsTotal.textContent = total;
  } else if (property === "price") {
    cartTotal.textContent = `${total} \u20BD`;
  }
};
recalculate("quantity");
var onCartCloseButtonClick = () => {
  closeCart();
  document.removeEventListener("keydown", onDocumentKeydown);
};
var onCounterClick = (evt) => {
  if (evt.target.classList.contains("cart-product__decrease")) {
    decrease(evt.target.nextElementSibling);
    if (parseInt(evt.target.nextElementSibling.textContent, 10) === 0) {
      evt.target.closest(".cart__cart-list-item").remove();
    }
  }
  if (evt.target.classList.contains("cart-product__increase")) {
    increase(evt.target.previousElementSibling);
  }
  recalculate("price");
  recalculate("quantity");
};
var onCartActionButtonClick = (evt) => {
  if (evt.target.classList.contains("cart-product__action")) {
    evt.target.closest(".cart__cart-list-item").remove();
    recalculate("price");
    recalculate("quantity");
  }
};
var onCartClearAllButtonClick = () => {
  cartList2.innerHTML = "";
  recalculate("price");
  recalculate("quantity");
};
var removeEventListeners = () => {
  document.removeEventListener("keydown", onDocumentKeydown);
  cartCloseButton.addEventListener("click", onCartCloseButtonClick);
  cartClearAllButton.removeEventListener("click", onCartClearAllButtonClick);
  cartList2.removeEventListener("click", onCounterClick);
  cartWrapper.removeEventListener("click", onCartActionButtonClick);
};
var addEventListeners = () => {
  document.addEventListener("keydown", onDocumentKeydown);
  cartCloseButton.addEventListener("click", onCartCloseButtonClick);
  cartClearAllButton.addEventListener("click", onCartClearAllButtonClick);
  cartList2.addEventListener("click", onCounterClick);
  cartWrapper.addEventListener("click", onCartActionButtonClick);
};
function closeCart() {
  cartWrapper.classList.add("cart__cart-background--hidden");
  removeEventListeners();
}
var onCartOpenButtonClick = () => {
  cartWrapper.classList.remove("cart__cart-background--hidden");
  addEventListeners();
  recalculate("price");
  recalculate("quantity");
};
cartOpenButton.addEventListener("click", onCartOpenButtonClick);
var increaseCounter = (id) => {
  const cartCards = [...cartWrapper.querySelectorAll(".cart__cart-list-item")];
  const item = cartCards.find((product) => product.getAttribute("data-id") === id.toString());
  if (item) {
    const cardCounter = item.querySelector(".cart-product__product-counter");
    increase(cardCounter);
  }
};
var addToCart = (product) => {
  const cartCards = [...cartWrapper.querySelectorAll(".cart__cart-list-item")];
  const existingProduct = cartCards.find((item) => item.getAttribute("data-id") === product.id.toString());
  if (existingProduct) {
    increaseCounter(product.id);
  } else {
    renderToCart(product);
  }
  recalculate("price");
  recalculate("quantity");
};

// source/scripts/gallery.js
var productsContainer = document.querySelector(".products__products-list");
var addGalleryListener = (products) => {
  productsContainer.addEventListener("click", (evt) => {
    const product = evt.target.closest(".card");
    if (product) {
      const selectedProduct = products.find((item) => item.id === Number(product.dataset.id));
      addToCart(selectedProduct);
    }
  });
};
export {
  addGalleryListener
};
//# sourceMappingURL=gallery.js.map
