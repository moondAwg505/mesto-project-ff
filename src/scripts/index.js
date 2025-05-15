import "../images/avatar.jpg";
import "../images/logo.svg";

import "../pages/index.css";
import {
  openModal,
  closeModal,
  closeModalOnOverlay,
  openImagePopup,
} from "./components/modal.js";
import { initialCards } from "./cards.js";
import {
  handleLikeCard,
  handleImageClick,
  addingCard,
} from "./components/card.js";

export function createCard(cardData, deleteCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  titleCard.textContent = cardData.name;

  // Добавляем проверку
  if (typeof deleteCallback === "function") {
    deleteButton.addEventListener("click", deleteCallback);
  } else {
    console.error("deleteCallback is not a function");
    deleteButton.addEventListener("click", (evt) => {
      evt.target.closest(".card").remove();
    });
  }

  //Откртие изображения
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  //Кнопка лайка
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  return cardElement;
}

//функция удаления

function handleDeleteCard(evt) {
  const cardToRemove = evt.target.closest(".card");
  cardToRemove.remove();
}

//Добавление карточек страницу

const placesList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const newCard = createCard(cardData, handleDeleteCard);
  placesList.append(newCard);
});
