function createCard(cardData, cardHandlers, profileInfo) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardImage = cardItem.querySelector('.card__image');
  const likeButton = cardItem.querySelector('.card__like-button');
  const likeCounter =  cardItem.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  
  if (cardData.likes.some((profile) => {
    return profile['_id'] === profileInfo['_id']
  })) {
    likeButton.classList.add('card__like-button_is-active')
  }

  if (cardData.owner['_id'] === profileInfo['_id']) {
    deleteButton.classList.add('card__delete-button_active');
    deleteButton.addEventListener('click', () => {
      const confirmDeleteModal = cardHandlers.onOpenConfirmDeleteModal()
      const confirmButton = confirmDeleteModal.querySelector('.popup__button')
      confirmButton.addEventListener('click', (evt) => {
        cardHandlers.onDelete(cardData['_id'])
        .then(()=> {
          handleDeleteCardFromDOM(cardItem);
          cardHandlers.onCloseModal(confirmDeleteModal);
        })
        .catch((err) => {
          console.log(`Ошибка удаления карточки: ${err}`)
        })
      })
      
    });
  }

  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      cardHandlers.onDeleteLike(cardData['_id'])
        .then((res) => {
          const likeCount = res.likes.length;
          handleLikeCard(likeButton, likeCounter, likeCount)
        })
        .catch((err) => {
          console.log(`Ошибка удаления лайка: ${err}`)
        })
    } else {
      cardHandlers.onPutLike(cardData['_id'])
        .then((res) => {
          const likeCount = res.likes.length;
          handleLikeCard(likeButton, likeCounter, likeCount)
        })
        .catch((err) => {
          console.log(`Ошибка постановки лайка: ${err}`)
        })
    }
  });

  cardItem.querySelector('.card__title').textContent = cardData.name;

  likeButton.addEventListener('click', cardHandlers.onLike);

  cardImage.addEventListener('click', () => {
    cardHandlers.onOpenModal(cardData.link, cardData.name);
  });

  return cardItem;
}

function handleDeleteCardFromDOM(card) {
  card.remove();
}

function handleLikeCard(likeButton, likeCounter, count) {
  likeButton.classList.toggle('card__like-button_is-active');
  likeCounter.textContent = count;
}

export { createCard };
