import Swiper from 'swiper/bundle';

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  init: false,
  loop: false,
  simulateTouch: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,

  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

swiper.init();
