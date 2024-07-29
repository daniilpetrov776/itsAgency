const filterButton = document.querySelector('.cards-header__mobile-sort-button');
// const filterWrapper = document.querySelector('.sort__sort-wrapper ');
// const filter = filterWrapper.querySelector('.sort__sort-list');
// const dragButton = filterWrapper.querySelector('.sort__sort-drag-button');

// let startY;
// let currentY;
// // let initialY;
// let isDragging = false;

// const closeFilter = () => {
//   filterWrapper.classList.add('sort__sort-wrapper--hidden');
//   filter.style.transform = 'translateY(0)';
//   filter.style.transition = '';
//   filter.style.display = '';
//   removeDragButtonHandler();
// };

// const onDocumentClick = (evt) => {
//   if (!filter.contains(evt.target) && evt.target !== filterButton) {
//     closeFilter();
//     document.removeEventListener('click', onDocumentClick);
//   }
// };

// const onFilterButtonClick = () => {
//   filterWrapper.classList.remove('sort__sort-wrapper--hidden');
//   document.addEventListener('click', onDocumentClick);
//   DragButtonHandler();
// };

// filterButton.addEventListener('click', onFilterButtonClick);

// const onTouchStart = (evt) => {
//   isDragging = true;
//   // initialY = filter.getBoundingClientRect().top;
//   startY = evt.touches[0].clientY;
// };

// const onTouchMove = (evt) => {
//   if (isDragging) {
//     currentY = evt.touches[0].clientY;
//     const deltaY = currentY - startY;
//     if (deltaY > 0) {
//       filter.style.transform = `translateY(${deltaY}px)`;
//     }
//   }
// };

// const onTouchEnd = () => {
//   if (isDragging) {
//     const deltaY = currentY - startY;
//     if (deltaY > 50) { // Условие для закрытия модального окна
//       filter.style.transition = 'transform 0.3s ease';
//       filter.style.transform = `translateY(${window.innerHeight}px)`;
//       setTimeout(() => {
//         filter.style.display = 'none';
//         filter.style.transform = 'translateY(0)';
//         filter.style.transition = '';
//         closeFilter();
//       }, 300);
//     } else {
//       filter.style.transition = 'transform 0.3s ease';
//       filter.style.transform = 'translateY(0)';
//     }
//     isDragging = false;
//   }
// };

// function DragButtonHandler () {
//   dragButton.addEventListener('touchstart', onTouchStart);
//   dragButton.addEventListener('touchmove', onTouchMove);
//   dragButton.addEventListener('touchend', onTouchEnd);
// }

// function removeDragButtonHandler () {
//   dragButton.removeEventListener('touchstart', onTouchStart);
//   dragButton.removeEventListener('touchmove', onTouchMove);
//   dragButton.removeEventListener('touchend', onTouchEnd);
// }
const filterWrapper = document.querySelector('.sort__sort-wrapper');
const filter = filterWrapper.querySelector('.sort__sort-list');
const dragButton = filterWrapper.querySelector('.sort__sort-drag-button');

let startY;
let currentY;
let isDragging = false;

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
