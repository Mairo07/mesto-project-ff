const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(
  name,
  link,
  deleteCardCallback,
  likeCardCallback,
  openFullImageModalCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const cardImage = cardItem.querySelector(".card__image");
  const likeButton = cardItem.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;

  cardItem.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", deleteCardCallback);

  likeButton.addEventListener("click", likeCardCallback);

  cardImage.addEventListener("click", openFullImageModalCallback);

  return cardItem;
}

function deleteCard(evt) {
  const cardDeleteButton = evt.target;
  const card = cardDeleteButton.closest(".card");
  card.remove();
}

function likeCard(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

export { initialCards, createCard, deleteCard, likeCard };
