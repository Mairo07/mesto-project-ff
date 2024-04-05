console.log('Файл modal начало')

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
}

function setCloseModal(modals) {
  modals.forEach((modal) => {
    modal.addEventListener('mousedown', (evt) => {
      const target = evt.target;
      if (
        target.classList.contains('popup_is-opened') ||
        target.classList.contains('popup__close')
      ) {
        closeModal(modal);
      }
    });
  });
}

export { openModal, closeModal, setCloseModal };
console.log('Файл modal конец')