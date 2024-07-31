// source/scripts/select.js
var Sort = {
  EXPENSIVE: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0440\u043E\u0433\u0438\u0435",
  CHEAP: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0435\u0434\u043E\u0440\u043E\u0433\u0438\u0435",
  POPULAR: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435",
  NEW: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u043E\u0432\u044B\u0435"
};
var selectValue = document.querySelector(".select__value");
var selectBackground = document.querySelector(".cards-header__select-background");
var onSelectClick = (evt) => {
  const option = evt.target.closest(".select__option");
  if (option) {
    selectValue.textContent = option.textContent;
    evt.target.closest(".select").blur();
    selectBackground.classList.add("cards-header__select-background--hidden");
    return;
  }
  if (evt.target === selectValue) {
    selectBackground.classList.remove("cards-header__select-background--hidden");
  } else {
    selectBackground.classList.add("cards-header__select-background--hidden");
  }
};
var compareHighestToLowest = (prodA, prodB) => parseInt(prodB.price, 10) - parseInt(prodA.price, 10);
var sortByHighesPrice = (products) => [...products].sort(compareHighestToLowest);
var compareLowestToHighest = (prodA, prodB) => parseInt(prodA.price, 10) - parseInt(prodB.price, 10);
var sortByLowestPrice = (products) => [...products].sort(compareLowestToHighest);
var comparepopularity = (prodA, prodB) => prodB.views - prodA.views;
var sortBypopularity = (products) => [...products].sort(comparepopularity);
var compareAge = (prodA, prodB) => prodA.age - prodB.age;
var sortByAge = (products) => [...products].sort(compareAge);
var getFilteredProducts = (products, filter) => {
  switch (filter) {
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
export {
  initSort,
  onSelectClick
};
//# sourceMappingURL=select.js.map
