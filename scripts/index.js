// @todo: Темплейт карточки

function createCard(cardData, deleteCallback) {
  const carTamplate = document.querySelector("#card-template").content;
  const cardElemet = carTamplate.cloneNode(true);

  // Шаг 2: Находим внутри клона элементы (изображение, название, кнопку удаления)
  const card = cardElemet.querySelector(".card");
  const cardImage = card.querySelector(".card__image");
  const titleCard = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");

  // Шаг 3: Устанавливаем значения (например, cardData.link в src изображения)

  cardImage.src = cardData.link;
  titleCard.textContent = cardData.name;

  // Шаг 4: Вешаем обработчик на кнопку удаления

  deleteButton.addEventListener("click", (evt) => {
    deleteCallback(evt);
  });

  // Шаг 5: Возвращаем готовый элемент
  return card;
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
