const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');

function createCard(name, link, deleteCardCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');

  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', deleteCardCallback);

  return cardItem
}

function deleteCard(evt) {
  const cardDeleteButton = evt.target;
  cardDeleteButton.parentElement.remove();
}

function renderCards(cards) {
  cards.forEach(function(card) {
    const placeItem = createCard(card.name, card.link, deleteCard);
    placesList.append(placeItem);
  });
}

renderCards(initialCards);


