import "../pages/index.css";
import "../images/logo.svg";
import "../images/avatar.jpg";
import { createCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  setupPopupListeners,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  userInfo,
  cardsDownloadWithServer,
  addCard,
  avatarUpdate,
  deleteTheCard,
  editProfileUser,
} from "./api.js";

// DOM
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");

// Профиль
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
export let userId;

// Карточки
const cardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");
const addCardForm = document.querySelector('.popup__form[name="new-place"]');

// Аватар
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarPopup.querySelector(".popup__input_type_avatar-url");
const avatarImage = document.querySelector(".profile__image");
const editAvatarButton = document.querySelector(".profile__edit-avatar-button");

// Конфигурация валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  errorSelector: ".popup-error"
};

// Функция обработки удаления карточки
function handleDeleteCard(cardId, cardElement) {
  deleteTheCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.error("Ошибка удаления карточки:", err));
}

Promise.all([userInfo(), cardsDownloadWithServer()]).then(([useData, card]) => {
  profileName.textContent = useData.name;
  profileJob.textContent = useData.about;
  userId = useData._id;

  card.reverse().forEach((cardData) => {
    const newCard = createCard(cardData, openImagePopup, userId,
       (cardId, element) => handleDeleteCard(cardId, element)
    );
    placesList.prepend(newCard);
  });
});

// подключение валидации
enableValidation(validationConfig);

// Функция открытия изображения
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Инициализация попапов
setupPopupListeners(editProfilePopup);
setupPopupListeners(addCardPopup);
setupPopupListeners(imagePopup);
setupPopupListeners(avatarPopup);

// Обработчики кнопок
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(editProfilePopup, validationConfig);
    openModal(editProfilePopup);
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  clearValidation(addCardForm, validationConfig);
  cardForm.reset();
  openModal(addCardPopup);
});

// Обработчики форм
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = cardForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  addCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        openImagePopup,
        (cardId, element) => {
          deleteTheCard(cardId)
            .then(() => element.remove())
            .catch((err) => console.error(err));
        },
        userId
      );
      placesList.prepend(newCard);
      closeModal(addCardPopup);
      cardForm.reset();
    })
    .catch((err) => console.error("Ошибка при добавлении ----карточки:", err))
    .finally(() => (submitButton.textContent = "Создать"));
}
userId;

// Подключение обработчиков
cardForm.addEventListener("submit", handleCardFormSubmit);

// Редактирование аватара
editAvatarButton.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  avatarUpdate(avatarInput.value)
    .then((userData) => {
      avatarImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => (submitButton.textContent = "Сохранить"));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = profileForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  editProfileUser({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => console.error("Ошибка при обновлении профиля:", err))
    .finally(() => (submitButton.textContent = "Сохранить"));
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
