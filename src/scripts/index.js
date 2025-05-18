import "../pages/index.css";
import "../images/logo.svg";
import "../images/avatar.jpg";
import {
  createCard,
  deletingCard,
  likeCards,
  renderInitialCards,
} from "./components/card.js";
import { closeModal } from "./components/modal.js";

// Инициализация
const placesList = document.querySelector(".places__list");
renderInitialCards(placesList);

// Добавление новой карточки
const formCardElement = document.querySelector(
  ".popup__form[name='new-place']"
);
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

formCardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCard = createCard(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    },
    deletingCard,
    likeCards
  );

  placesList.prepend(newCard);
  formCardElement.reset();
  closeModal(document.querySelector(".popup_type_new-card"));
});
