// source/scripts/utils.js
var isEscapeKey = (evt) => evt.key === "Escape";
var debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(void 0, rest), timeoutDelay);
  };
};
function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest) => {
    const now = /* @__PURE__ */ new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}
var increase = (el) => {
  let currentCount = parseInt(el.textContent, 10);
  currentCount += 1;
  el.textContent = currentCount;
};
var decrease = (el) => {
  let currentCount = parseInt(el.textContent, 10);
  if (currentCount > 0) {
    currentCount -= 1;
    el.textContent = currentCount;
  }
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
export {
  debounce,
  declension,
  decrease,
  increase,
  isEscapeKey,
  throttle
};
//# sourceMappingURL=utils.js.map
