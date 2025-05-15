import { createCard } from "../index.js";

const formCardElement = document.querySelector(
  ".popup__form[name='new-place']"
);
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const cardPlacesList = document.querySelector(".places__list");

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

// Функция удаления карточки
function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

formCardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });

  cardPlacesList.prepend(newCard);
  formCardElement.reset();
  closeModal(document.querySelector(".popup_type_new-card"));
});
