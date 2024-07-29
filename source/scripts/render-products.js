const cardTemplate = document.querySelector('#card').content.querySelector('.products__products-list-item');

const cardsList = document.querySelector('.products__products-list');
const renderProducts = (products) => {
  const fragment = document.createDocumentFragment();
  products.forEach(({id, name, price, image}) => {
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector('.card__card-image');
    const cardPrice = card.querySelector('.card__card-price');
    const cardTitle = card.querySelector('.card__card-title');
    const sources = card.querySelectorAll('source');
    sources[0].srcset = `./images/mock-item${image}@1x.webp, ./images/mock-item${image}@2x.webp 2x`;
    sources[1].srcset = `./images/mock-item${image}@1x.png, ./images/mock-item${image}@2x.png 2x`;
    sources[2].srcset = `./images/mock-item-mobile${image}@1x.webp, ./images/mock-item-mobile${image}@2x.webp 2x`;
    card.dataset.id = id;
    cardImage.src = `./images/mock-item-mobile${image}@1x.png`;
    cardPrice.textContent = `${price} ₽`;
    cardTitle.textContent = name;

    fragment.appendChild(card);
  });
  cardsList.appendChild(fragment);
};

const removeProducts = () => {
  const elements = cardsList.querySelectorAll('.card');
  elements.forEach((element) => element.remove());
};

export { renderProducts, removeProducts };
