import './pages/index.css';
import { initialCards } from './scripts/initialCards';
import { createCard, handleDeleteCard, handleLikeCard } from './scripts/cards';
import { openModal, closeModal, setCloseModal } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');

// Модальное окно редактирования профиля
const profileEditModal = document.querySelector('.popup_type_edit');

//Модальное окно добавления новой карточки
const addNewCardModal = document.querySelector('.popup_type_new-card');

// форма редактирования профиля
const profileEditForm = document.forms['edit-profile'];
const profileNameInput = profileEditForm.querySelector(
  '.popup__input_type_name'
);
const profileJobInput = profileEditForm.querySelector(
  '.popup__input_type_description'
);

//массив попапов страницы
const modals = document.querySelectorAll('.popup');

//Данные профиля
const profileTitle = container.querySelector('.profile__title');
const profileDescription = container.querySelector('.profile__description');

// форма добавления новой карточки
const newCardForm = document.forms['new-place'];
const imageNameInput = newCardForm.querySelector(
  '.popup__input_type_card-name'
);
const imageUrlInput = newCardForm.querySelector('.popup__input_type_url');

// Модальное окно увеличения картинки карточки
const fullImageModal = document.querySelector('.popup_type_image');
const fullImage = fullImageModal.querySelector('.popup__image');
const fullImageCaption = fullImageModal.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = profileNameInput.value;
  const job = profileJobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(profileEditModal);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = imageNameInput.value;
  const link = imageUrlInput.value;
  renderCard({
    link,
    name,
    onDelete: handleDeleteCard,
    onLike: handleLikeCard,
    onOpenModal: handleOpenImageModal,
  });
  closeModal(addNewCardModal);
  form.reset();
}

function handleOpenImageModal(link, name) {
  fullImage.src = link;
  fullImage.alt = name;
  fullImageCaption.textContent = name;
  openModal(fullImageModal);
}

function renderCard(card, method = 'prepend') {
  const cardElement = createCard(card);
  placesList[method](cardElement);
}

function renderCardsList(cards) {
  cards.forEach((card) => {
    renderCard(
      {
        link: card.link,
        name: card.name,
        onDelete: handleDeleteCard,
        onLike: handleLikeCard,
        onOpenModal: handleOpenImageModal,
      },
      'append'
    );
  });
}

profileEditButton.addEventListener('click', () => {
  openModal(profileEditModal);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(profileEditForm, validationConfig)
});

profileAddButton.addEventListener('click', () => {
  openModal(addNewCardModal);
});

profileEditForm.addEventListener('submit', handleEditFormSubmit);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

//внутри функции навешиваем обработчик закрытия на все попапы на странице
setCloseModal(modals);

renderCardsList(initialCards);

enableValidation(validationConfig); 
