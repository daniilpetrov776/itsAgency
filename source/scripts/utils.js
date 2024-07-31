const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

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

const declension = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} товар`;
  }
  if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
    return `${count} товара`;
  }
  return `${count} товаров`;
};

export { isEscapeKey, debounce, throttle, increase, decrease, declension };
