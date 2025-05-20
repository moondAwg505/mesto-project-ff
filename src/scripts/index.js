import "../pages/index.css";
import "../images/logo.svg";
import "../images/avatar.jpg";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, setupPopupListeners } from "./components/modal.js";
import { initialCards } from "./cards.js";


const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');

// Формы
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const cardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');

// Функция для рендеринга начальных карточек
function renderInitialCards() {
  initialCards.forEach(cardData => {
    const card = createCard(
      cardData,
      openImagePopup,
      deleteCard,
      likeCard
    );
    placesList.append(card);
  });
}

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

// Обработчики кнопок
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  cardForm.reset();
  openModal(addCardPopup);
});

// Обработчики форм
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  
  const newCard = createCard(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value
    },
    openImagePopup,
    deleteCard,
    likeCard
  );
  
  placesList.prepend(newCard);
  closeModal(addCardPopup);
}

// Подключение обработчиков
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

// Инициализация приложения
renderInitialCards();