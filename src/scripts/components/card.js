import { likeTheCard, unlikeTheCard, deleteTheCard } from "../api";

export function createCard(
  cardData,
  handleCardClick,
  handleDeleteClick,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCountElement = cardElement.querySelector(".card__like-count");

  // Заполняем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likesCountElement.textContent = cardData.likes.length;

  // Управление кнопкой удаления
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () =>
      handleDeleteClick(cardData._id, cardElement)
    );
  }

  const isOwner = cardData.owner._id === userId;

  // Проверка лайков
  const isLiked = cardData.likes.some((user) => user._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчики событий
  cardImage.addEventListener("click", () => handleCardClick(cardData));

  likeButton.addEventListener("click", function () {
    const isLiked = this.classList.contains("card__like-button_is-active");
    const likeMethod = isLiked ? unlikeTheCard : likeTheCard;

    likeMethod(cardData._id)
      .then((updatedCard) => {
        likesCountElement.textContent = updatedCard.likes.length;
        this.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => console.error("Ошибка при обновлении лайка:", err));
  });

  return cardElement;
}
