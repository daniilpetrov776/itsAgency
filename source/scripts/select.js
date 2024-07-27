const selectValue = document.querySelector('.select__value');
const selectDropdown = document.querySelector('.select__dropdown');

const onSelectDropdownClick = (evt) => {
  const option = evt.target.closest('.select__option');
  if (option) {
    selectValue.textContent = option.textContent;
    evt.target.closest('.select').blur();
  }
};

selectDropdown.addEventListener('click', onSelectDropdownClick);
