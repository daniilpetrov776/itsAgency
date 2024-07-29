import { renderProducts } from './render-products.js';

const RERENDER_DELAY = 500;

const filterButton = document.querySelector('.cards-header__mobile-sort-button');
const filterWrapper = document.querySelector('.sort__sort-wrapper');
const filter = filterWrapper.querySelector('.sort__sort-list');
const dragButton = filterWrapper.querySelector('.sort__sort-drag-button');

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
// const getCheckboxStates = () => ({
//   new: document.querySelector('#filter-new').checked,
//   available: document.querySelector('#filter-available').checked,
//   contract: document.querySelector('#filter-contract').checked,
//   exclusive: document.querySelector('#filter-exclusive').checked,
//   onsale: document.querySelector('#filter-onsale').checked
// });

// const getCheckboxStates = () => ({
//   new: document.querySelector('#filter-new')?.checked || false,
//   available: document.querySelector('#filter-available')?.checked || false,
//   contract: document.querySelector('#filter-contract')?.checked || false,
//   exclusive: document.querySelector('#filter-exclusive')?.checked || false,
//   onsale: document.querySelector('#filter-onsale')?.checked || false
// });

// const filterProducts = (products, states) => {
//   // Проверяем, если все фильтры отключены
//   if (Object.values(states).every((state) => !state)) {
//     return products;
//   }

//   // Возвращаем отфильтрованные продукты
//   return products.filter((product) => Object.keys(states).every((key) => {
//     if (states[key]) {
//       console.log(product[key])
//       return product[key] === true;
//     }
//     return true;
//   }));
// };

// const updateFilter = (products) => {
//   const states = getCheckboxStates();
//   const filteredProducts = filterProducts(products, states);
//   // console.log(states)
//   renderProducts(filteredProducts);
// };

// ['filter-new', 'filter-available', 'filter-contract', 'filter-exclusive', 'filter-onsale'].forEach((id) => {
//   document.getElementById(id).addEventListener('change', updateFilter);
// });
export const getCheckboxStates = () => ({
  new: document.querySelector('#filter-new')?.checked || false,
  available: document.querySelector('#filter-available')?.checked || false,
  contract: document.querySelector('#filter-contract')?.checked || false,
  exclusive: document.querySelector('#filter-exclusive')?.checked || false,
  onsale: document.querySelector('#filter-onsale')?.checked || false
});
console.log(getCheckboxStates())

function filterProducts(filterCriteria, products) {
  // Проверяем, если все значения в фильтре false
  const allKeysFalse = Object.values(filterCriteria).every((value) => !value);
  if (allKeysFalse) {
    return products; // Возвращаем все продукты
  }

  // Фильтруем продукты
  return products.filter((product) => Object.keys(filterCriteria).some((key) =>
    // Проверяем, если значение фильтра true и соответствует значению продукта
    filterCriteria[key] && product[key] === String(filterCriteria[key])
  ));
}
const updateFilter = (products) => {
  const filteredProducts = filterProducts(getCheckboxStates(), products);
  console.log(filteredProducts)
}
export { updateFilter };
