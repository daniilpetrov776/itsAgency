import { renderProducts, removeProducts } from './render-products.js';
import { debounce, declension } from './utils.js';
import { initSort } from './select.js';

const RERENDER_DELAY = 500;

const filterButton = document.querySelector('.cards-header__mobile-sort-button');
const filterWrapper = document.querySelector('.sort__sort-wrapper');
const filter = filterWrapper.querySelector('.sort__sort-list');
const dragButton = filterWrapper.querySelector('.sort__sort-drag-button');
const amountOfProductsText = document.querySelector('.cards-header__amount-text');

let startY;
let currentY;
let isDragging = false;
// Открытие и закрытие фильтра:

const setFilterStyles = (styles) => {
  Object.assign(filter.style, styles);
};

const resetFilterStyles = () => {
  setFilterStyles({
    transform: 'translateY(0)',
    transition: '',
    display: ''
  });
};

const closeFilter = () => {
  filterWrapper.classList.add('sort__sort-wrapper--hidden');
  resetFilterStyles();
  removeDragButtonHandler();
};

const onDocumentClick = (evt) => {
  if (!filter.contains(evt.target) && evt.target !== filterButton) {
    closeFilter();
    document.removeEventListener('click', onDocumentClick);
  }
};

const onFilterButtonClick = () => {
  filterWrapper.classList.remove('sort__sort-wrapper--hidden');
  document.addEventListener('click', onDocumentClick);
  addDragButtonHandler();
};

filterButton.addEventListener('click', onFilterButtonClick);

const onTouchStart = (evt) => {
  isDragging = true;
  startY = evt.touches[0].clientY;
};

const onTouchMove = (evt) => {
  if (isDragging) {
    currentY = evt.touches[0].clientY;
    const deltaY = currentY - startY;
    if (deltaY > 0) {
      setFilterStyles({ transform: `translateY(${deltaY}px)` });
    }
  }
};

const onTouchEnd = () => {
  if (isDragging) {
    const deltaY = currentY - startY;
    if (deltaY > 50) {
      setFilterStyles({
        transition: 'transform 0.3s ease',
        transform: `translateY(${window.innerHeight}px)`
      });
      setTimeout(() => {
        setFilterStyles({ display: 'none' });
        resetFilterStyles();
        closeFilter();
      }, 300);
    } else {
      setFilterStyles({
        transition: 'transform 0.3s ease',
        transform: 'translateY(0)'
      });
    }
    isDragging = false;
  }
};

function addDragButtonHandler() {
  dragButton.addEventListener('touchstart', onTouchStart);
  dragButton.addEventListener('touchmove', onTouchMove);
  dragButton.addEventListener('touchend', onTouchEnd);
}

function removeDragButtonHandler() {
  dragButton.removeEventListener('touchstart', onTouchStart);
  dragButton.removeEventListener('touchmove', onTouchMove);
  dragButton.removeEventListener('touchend', onTouchEnd);
}
// Дальше функционал самого фильтра;

export const getCheckboxStates = () => ({
  new: document.querySelector('#filter-new')?.checked || false,
  available: document.querySelector('#filter-available')?.checked || false,
  contract: document.querySelector('#filter-contract')?.checked || false,
  exclusive: document.querySelector('#filter-exclusive')?.checked || false,
  onsale: document.querySelector('#filter-onsale')?.checked || false
});

function filterProducts(filterCriteria, products) {
  const allKeysFalse = Object.values(filterCriteria).every((value) => !value);

  if (allKeysFalse) {
    return products;
  }

  return products.filter((product) =>
    Object.keys(filterCriteria).every((key) =>
      !filterCriteria[key] || product[key] === String(filterCriteria[key])
    )
  );
}
const renderFilteredPhotos = debounce((products) => {
  removeProducts();
  renderProducts(products);
}, RERENDER_DELAY);

const updateFilter = (products) => {
  const filteredProducts = filterProducts(getCheckboxStates(), products);
  const sortFilteredProducts = initSort(filteredProducts);
  // eslint-disable-next-line no-console
  console.log(sortFilteredProducts); // Оставил консоль лог, чтобы можно было проверить, что фильтрация действительно работает правильно
  renderFilteredPhotos(sortFilteredProducts);
  amountOfProductsText.textContent = declension(sortFilteredProducts.length);
};
// Чтобы избежать debounce при первом запуске и обеспечить более плавное отображение
const firstLaunch = (products) => {
  const filteredProducts = filterProducts(getCheckboxStates(), products);
  const sortFilteredProducts = initSort(filteredProducts);
  // eslint-disable-next-line no-console
  console.log(sortFilteredProducts); // Оставил консоль лог, чтобы можно было проверить, что фильтрация действительно работает правильно
  removeProducts();
  renderProducts(sortFilteredProducts);
  amountOfProductsText.textContent = declension(sortFilteredProducts.length);
};

const initFilters = (products) => {
  // updateFilter(products);
  firstLaunch(products);
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('input') || evt.target.classList.contains('select__option')) {
      updateFilter(products);
    }
  });
};
export { initFilters, renderFilteredPhotos };
