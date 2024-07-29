import { onSelectClick } from './select.js';
import { swiper } from './swiper.js';
import { getData } from './api.js';
import { renderProducts } from './render-products.js';
import './cart.js';

swiper.init();
document.addEventListener('click', onSelectClick);
getData()
  .then((data) => {
    // console.log(data);
    renderProducts(data);
  })
  .catch(
    (err) => {
      console.log(err.message);
    }
  );


