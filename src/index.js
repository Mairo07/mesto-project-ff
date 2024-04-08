import './pages/index.css';
import { createCard } from './scripts/cards';
import { openModal, closeModal, setCloseModal } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import {
  getProfileInfo,
  getInitialCards,
  editProfile,
  addCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
  editProfileAvatar,
  dataLoading,
} from './scripts/api';

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');

// Модальное окно редактирования профиля
const profileEditModal = document.querySelector('.popup_type_edit');

//Модальное окно добавления новой карточки
const newCardAddModal = document.querySelector('.popup_type_new-card');

//Модальное окно изменения фото профиля
const profileAvatarEditModal = document.querySelector(
  '.popup_type_edit-profile-avatar'
);

// форма редактирования профиля
const profileEditForm = document.forms['edit-profile'];
const profileNameInput = profileEditForm.querySelector(
  '.popup__input_type_name'
);
const profileJobInput = profileEditForm.querySelector(
  '.popup__input_type_description'
);

//Форма редактирования аватара профиля
const profileAvatarEditForm = document.forms['new-avatar'];
const profileAvatarInput = profileAvatarEditForm.querySelector(
  '.popup__input_type_url'
);

//массив попапов страницы
const modals = document.querySelectorAll('.popup');

//Данные профиля
const profileTitle = container.querySelector('.profile__title');
const profileDescription = container.querySelector('.profile__description');
const profileImage = container.querySelector('.profile__image');

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

// Модальное окно подтверждения удаления карточки
const condirmCardDeleteModal = document.querySelector(
  '.popup_type_confirm-card-delete'
);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const cardHandlers = {
  onDelete: deleteCard,
  onPutLike: putCardLike,
  onDeleteLike: deleteCardLike,
  onOpenModal: handleOpenImageModal,
  onOpenConfirmDeleteModal: handleOpenConfirmCardDeleteModal,
  onCloseModal: closeModal,
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  dataLoading(evt.submitter, true);
  const name = profileNameInput.value;
  const job = profileJobInput.value;
  editProfile(name, job)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
    })
    .catch((err) => {
      console.log(`Ошибка обновления данных профиля: ${err}`);
    })
    .finally(() => {
      dataLoading(evt.submitter, false);
    });

  closeModal(profileEditModal);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  dataLoading(evt.submitter, true);
  const form = evt.target;
  const name = imageNameInput.value;
  const link = imageUrlInput.value;
  Promise.all([addCard(name, link), getProfileInfo()])
    .then(([cardData, profileData]) => {
      renderCard(cardData, profileData);
    })
    .catch((err) => {
      console.log(`Ошибка добавления поста: ${err}`);
    })
    .finally(() => {
      dataLoading(evt.submitter, false);
    });
  closeModal(newCardAddModal);
  form.reset();
}

function handleEditProfileAvatarFormSubmit(evt) {
  evt.preventDefault();
  dataLoading(evt.submitter, true);
  const form = evt.target;
  const link = profileAvatarInput.value;
  editProfileAvatar(link)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
    })
    .catch((err) => {
      console.log(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => {
      dataLoading(evt.submitter, false);
    });
  closeModal(profileAvatarEditModal);
  form.reset();
}

function handleOpenImageModal(link, name) {
  fullImage.src = link;
  fullImage.alt = name;
  fullImageCaption.textContent = name;
  openModal(fullImageModal);
}

function handleOpenConfirmCardDeleteModal() {
  openModal(condirmCardDeleteModal);
  return condirmCardDeleteModal;
}

function renderCard(card, profileInfo, method = 'prepend') {
  const cardElement = createCard(card, cardHandlers, profileInfo);
  placesList[method](cardElement);
}

function renderCardsList(cards, profileInfo) {
  cards.forEach((card) => {
    renderCard(card, profileInfo, 'append');
  });
}

profileEditButton.addEventListener('click', () => {
  openModal(profileEditModal);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(profileEditForm, validationConfig);
});

profileAddButton.addEventListener('click', () => {
  imageNameInput.value = '';
  imageUrlInput.value = '';
  clearValidation(newCardForm, validationConfig);
  openModal(newCardAddModal);
});

profileImage.addEventListener('click', () => {
  profileAvatarInput.value = '';
  clearValidation(profileAvatarEditForm, validationConfig);
  openModal(profileAvatarEditModal);
});

profileEditForm.addEventListener('submit', handleEditFormSubmit);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

profileAvatarEditForm.addEventListener(
  'submit',
  handleEditProfileAvatarFormSubmit
);

//внутри функции навешиваем обработчик закрытия на все попапы на странице
setCloseModal(modals);

enableValidation(validationConfig);

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileData, initialCards]) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
    renderCardsList(initialCards, profileData);
  })
  .catch((err) => {
    console.log(err);
  });
