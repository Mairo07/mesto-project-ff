function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardImage = cardItem.querySelector('.card__image');
  const likeButton = cardItem.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardItem.querySelector('.card__title').textContent = cardData.name;

  deleteButton.addEventListener('click', cardData.onDelete);

  likeButton.addEventListener('click', cardData.onLike);

  cardImage.addEventListener('click', () => {
    cardData.onOpenModal(cardData.link, cardData.name);
  });

  return cardItem;
}

function handleDeleteCard(evt) {
  const cardDeleteButton = evt.target;
  const card = cardDeleteButton.closest('.card');
  card.remove();
}

function handleLikeCard(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, handleDeleteCard, handleLikeCard };
