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
var removeProducts = () => {
  const elements = cardsList.querySelectorAll(".card");
  elements.forEach((element) => element.remove());
};

// source/scripts/utils.js
var debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(void 0, rest), timeoutDelay);
  };
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

// source/scripts/select.js
var Sort = {
  EXPENSIVE: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0440\u043E\u0433\u0438\u0435",
  CHEAP: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0435\u0434\u043E\u0440\u043E\u0433\u0438\u0435",
  POPULAR: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435",
  NEW: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u043E\u0432\u044B\u0435"
};
var selectValue = document.querySelector(".select__value");
var selectBackground = document.querySelector(".cards-header__select-background");
var compareHighestToLowest = (prodA, prodB) => parseInt(prodB.price, 10) - parseInt(prodA.price, 10);
var sortByHighesPrice = (products) => [...products].sort(compareHighestToLowest);
var compareLowestToHighest = (prodA, prodB) => parseInt(prodA.price, 10) - parseInt(prodB.price, 10);
var sortByLowestPrice = (products) => [...products].sort(compareLowestToHighest);
var comparepopularity = (prodA, prodB) => prodB.views - prodA.views;
var sortBypopularity = (products) => [...products].sort(comparepopularity);
var compareAge = (prodA, prodB) => prodA.age - prodB.age;
var sortByAge = (products) => [...products].sort(compareAge);
var getFilteredProducts = (products, filter2) => {
  switch (filter2) {
    case Sort.EXPENSIVE:
      return sortByHighesPrice(products);
    case Sort.CHEAP:
      return sortByLowestPrice(products);
    case Sort.POPULAR:
      return sortBypopularity(products);
    case Sort.NEW:
      return sortByAge(products);
    default:
      return sortByHighesPrice(products);
  }
};
var initSort = (products) => {
  const result = getFilteredProducts(products, selectValue.textContent);
  return result;
};

// source/scripts/filter.js
var RERENDER_DELAY = 500;
var filterButton = document.querySelector(".cards-header__mobile-sort-button");
var filterWrapper = document.querySelector(".sort__sort-wrapper");
var filter = filterWrapper.querySelector(".sort__sort-list");
var dragButton = filterWrapper.querySelector(".sort__sort-drag-button");
var amountOfProductsText = document.querySelector(".cards-header__amount-text");
var startY;
var currentY;
var isDragging = false;
var setFilterStyles = (styles) => {
  Object.assign(filter.style, styles);
};
var resetFilterStyles = () => {
  setFilterStyles({
    transform: "translateY(0)",
    transition: "",
    display: ""
  });
};
var closeFilter = () => {
  filterWrapper.classList.add("sort__sort-wrapper--hidden");
  resetFilterStyles();
  removeDragButtonHandler();
};
var onDocumentClick = (evt) => {
  if (!filter.contains(evt.target) && evt.target !== filterButton) {
    closeFilter();
    document.removeEventListener("click", onDocumentClick);
  }
};
var onFilterButtonClick = () => {
  filterWrapper.classList.remove("sort__sort-wrapper--hidden");
  document.addEventListener("click", onDocumentClick);
  addDragButtonHandler();
};
filterButton.addEventListener("click", onFilterButtonClick);
var onTouchStart = (evt) => {
  isDragging = true;
  startY = evt.touches[0].clientY;
};
var onTouchMove = (evt) => {
  if (isDragging) {
    currentY = evt.touches[0].clientY;
    const deltaY = currentY - startY;
    if (deltaY > 0) {
      setFilterStyles({ transform: `translateY(${deltaY}px)` });
    }
  }
};
var onTouchEnd = () => {
  if (isDragging) {
    const deltaY = currentY - startY;
    if (deltaY > 50) {
      setFilterStyles({
        transition: "transform 0.3s ease",
        transform: `translateY(${window.innerHeight}px)`
      });
      setTimeout(() => {
        setFilterStyles({ display: "none" });
        resetFilterStyles();
        closeFilter();
      }, 300);
    } else {
      setFilterStyles({
        transition: "transform 0.3s ease",
        transform: "translateY(0)"
      });
    }
    isDragging = false;
  }
};
function addDragButtonHandler() {
  dragButton.addEventListener("touchstart", onTouchStart);
  dragButton.addEventListener("touchmove", onTouchMove);
  dragButton.addEventListener("touchend", onTouchEnd);
}
function removeDragButtonHandler() {
  dragButton.removeEventListener("touchstart", onTouchStart);
  dragButton.removeEventListener("touchmove", onTouchMove);
  dragButton.removeEventListener("touchend", onTouchEnd);
}
var getCheckboxStates = () => ({
  new: document.querySelector("#filter-new")?.checked || false,
  available: document.querySelector("#filter-available")?.checked || false,
  contract: document.querySelector("#filter-contract")?.checked || false,
  exclusive: document.querySelector("#filter-exclusive")?.checked || false,
  onsale: document.querySelector("#filter-onsale")?.checked || false
});
function filterProducts(filterCriteria, products) {
  const allKeysFalse = Object.values(filterCriteria).every((value) => !value);
  if (allKeysFalse) {
    return products;
  }
  return products.filter(
    (product) => Object.keys(filterCriteria).every(
      (key) => !filterCriteria[key] || product[key] === String(filterCriteria[key])
    )
  );
}
var renderFilteredPhotos = debounce((products) => {
  removeProducts();
  renderProducts(products);
}, RERENDER_DELAY);
var updateFilter = (products) => {
  const filteredProducts = filterProducts(getCheckboxStates(), products);
  const sortFilteredProducts = initSort(filteredProducts);
  console.log(sortFilteredProducts);
  renderFilteredPhotos(sortFilteredProducts);
  amountOfProductsText.textContent = declension(sortFilteredProducts.length);
};
var firstLaunch = (products) => {
  const filteredProducts = filterProducts(getCheckboxStates(), products);
  const sortFilteredProducts = initSort(filteredProducts);
  console.log(sortFilteredProducts);
  removeProducts();
  renderProducts(sortFilteredProducts);
  amountOfProductsText.textContent = declension(sortFilteredProducts.length);
};
var initFilters = (products) => {
  firstLaunch(products);
  document.addEventListener("click", (evt) => {
    if (evt.target.matches("input") || evt.target.classList.contains("select__option")) {
      updateFilter(products);
    }
  });
};
export {
  getCheckboxStates,
  initFilters,
  renderFilteredPhotos
};
//# sourceMappingURL=filter.js.map
