const Sort = {
  EXPENSIVE: 'Сначала дорогие',
  CHEAP: 'Сначала недорогие',
  POPULAR: 'Сначала популярные',
  NEW: 'Сначала новые',
};

const selectValue = document.querySelector('.select__value');
const selectBackground = document.querySelector('.cards-header__select-background');
const selectOptions = document.querySelector('.select__dropdown');
console.log(selectValue.textContent === selectOptions.querySelector('#cheap').textContent)

// Открытие и закрытие
const onSelectClick = (evt) => {
  const option = evt.target.closest('.select__option');

  if (option) {
    selectValue.textContent = option.textContent;
    evt.target.closest('.select').blur();
    selectBackground.classList.add('cards-header__select-background--hidden');
    return;
  }

  if (evt.target === selectValue) {
    selectBackground.classList.remove('cards-header__select-background--hidden');
  } else {
    selectBackground.classList.add('cards-header__select-background--hidden');
  }
};
// Функционал сортировки

const compareHighestToLowest = (prodA, prodB) => parseInt(prodB.price, 10) - parseInt(prodA.price, 10);

const sortByHighesPrice = (products) => [...products].sort(compareHighestToLowest);

const compareLowestToHighest = (prodA, prodB) => parseInt(prodA.price, 10) - parseInt(prodB.price, 10);

const sortByLowestPrice = (products) => [...products].sort(compareLowestToHighest);

const comparepopularity = (prodA, prodB) => prodB.views - prodA.views;

const sortBypopularity = (products) => [...products].sort(comparepopularity);

const compareAge = (prodA, prodB) => prodA.age - prodB.age;

const sortByAge = (products) => [...products].sort(compareAge);

const getFilteredProducts = (products, filter) => {
  switch(filter) {
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

const initSort = (products) => {
  const result = getFilteredProducts(products, selectValue.textContent);
  return result;
};

export { onSelectClick, initSort };
