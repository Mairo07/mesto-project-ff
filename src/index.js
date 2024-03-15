import "./pages/index.css";
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from "./scripts/cards";
import { openModal, closeModal, setCloseModal } from "./scripts/modal";

const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const profileEditButton = container.querySelector(".profile__edit-button");
const profileAddButton = container.querySelector(".profile__add-button");

// Модальное окно редактирования профиля
const profileEditModal = document.querySelector(".popup_type_edit");

//Модальное окно добавления новой карточки
const addNewCardModal = document.querySelector(".popup_type_new-card");

// форма редактирования профиля
const profileEditForm = document.forms["edit-profile"];
const profileNameInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileJobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

//Данные профиля
const profileTitle = container.querySelector(".profile__title");
const profileDescription = container.querySelector(".profile__description");

// форма добавления новой карточки
const newCardForm = document.forms["new-place"];
const imageNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const imageUrlInput = newCardForm.querySelector(".popup__input_type_url");

// Модальное окно увеличения картинки карточки
const FullImageModal = document.querySelector(".popup_type_image");
const FullImage = FullImageModal.querySelector(".popup__image");
const FullImageCaption = FullImageModal.querySelector(".popup__caption");

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = profileNameInput.value;
  const job = profileJobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  const modal = evt.target.closest(".popup");
  closeModal(modal);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const placeName = imageNameInput.value;
  const placeUrl = imageUrlInput.value;
  const placeItem = createCard(
    placeName,
    placeUrl,
    deleteCard,
    likeCard,
    handleOpenImageModal
  );
  placesList.prepend(placeItem);
  const modal = evt.target.closest(".popup");
  closeModal(modal);
  form.reset();
}

function handleOpenImageModal(evt) {
  const placeImage = evt.target;
  FullImage.src = placeImage.src;
  FullImage.alt = placeImage.alt;
  FullImageCaption.textContent = placeImage.alt;
  openModal(FullImageModal);
}

function renderCards(cards) {
  cards.forEach(function (card) {
    const placeItem = createCard(
      card.name,
      card.link,
      deleteCard,
      likeCard,
      handleOpenImageModal
    );
    placesList.append(placeItem);
  });
}

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});

profileEditForm.addEventListener("submit", handleEditFormSubmit);

newCardForm.addEventListener("submit", handleNewCardFormSubmit);

setCloseModal(profileEditModal);
setCloseModal(addNewCardModal);
setCloseModal(FullImageModal);

renderCards(initialCards);
