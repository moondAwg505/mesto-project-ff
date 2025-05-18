import { initialCards } from "../cards.js";
import {
  openModal,
  closeModal,
  closeModalOnOverlay,
  openImagePopup,
} from "./modal.js";

// Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardNode = cardTemplate.querySelector(".card");
  const cardElement = cardNode.cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  titleCard.textContent = cardData.name;

  //Кнопка удаления
  deleteButton.addEventListener("click", deleteCallback);
  //Кнопка лайка
  likeButton.addEventListener("click", likeCallback);

  // Открытие картинок
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

// Стандартные обработчики
export function deletingCard(evt) {
  evt.target.closest(".card").remove();
}

export function likeCards(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function renderInitialCards(container) {
  initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, deletingCard, likeCards);
    container.append(newCard);
  });
}
