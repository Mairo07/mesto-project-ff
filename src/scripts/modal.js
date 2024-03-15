// обьявляем переменную, чтобы она была доступна внутри 2х функций - closeModal и openModal
let handleModalKeydown = null;

function openModal(modal) {
  modal.classList.add("popup_is-opened");

  handleModalKeydown = (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  };

  document.addEventListener("keydown", handleModalKeydown);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleModalKeydown);
  handleModalKeydown = null;
}

function setCloseModal(modal) {
  const closeButton = modal.querySelector(".popup__close");
  modal.addEventListener("click", (evt) => {
    const target = evt.target;
    if (target === modal || target === closeButton) {
      closeModal(modal);
    }
  });
}

export { openModal, closeModal, setCloseModal };
