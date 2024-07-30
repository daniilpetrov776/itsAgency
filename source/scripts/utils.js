const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const increase = (el) => {
  let currentCount = parseInt(el.textContent, 10);
  currentCount += 1;
  el.textContent = currentCount;
};

const decrease = (el) => {
  let currentCount = parseInt(el.textContent, 10);
  if (currentCount > 0) {
    currentCount -= 1;
    el.textContent = currentCount;
  }
};

export { isEscapeKey, debounce, increase, decrease };
