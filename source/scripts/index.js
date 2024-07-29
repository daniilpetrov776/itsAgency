import { onSelectClick } from './select.js';
import { swiper } from './swiper.js';
import { getData } from './api.js';
import { renderProducts } from './render-products.js';
import './cart.js';
import { initFilters } from './filter.js';

swiper.init();
document.addEventListener('click', onSelectClick);
getData()
  .then((data) => {
    // console.log(data);
    renderProducts(data);
    initFilters(data);
  })
  .catch(
    (err) => {
      console.log(err.message);
    }
  );


