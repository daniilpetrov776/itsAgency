const selectValue = document.querySelector('.select__value');
const selectBackground = document.querySelector('.cards-header__select-background');

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

document.addEventListener('click', onSelectClick);
