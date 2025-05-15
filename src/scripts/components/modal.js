const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Редактирование профиля

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Открытие картинки

const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__caption");

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openModal(editProfilePopup);
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  openModal(addCardPopup);
});

export const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscKeyUp);
};

export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscKeyUp);
};

const setupPopupListeners = (popup) => {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.addEventListener("mousedown", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
};

const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

setupPopupListeners(editProfilePopup);
setupPopupListeners(addCardPopup);
setupPopupListeners(imagePopup);

//Редактировие профиля

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  });

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  closeModal(editProfilePopup);
}

formElement.addEventListener("submit", handleFormSubmit);

// Функция открытия изображения

export function openImagePopup(link, name) {
  if (!popupImage || !popupImageCaption) {
    console.error("Элементы попапа не найдены");
    return;
  }

  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;

  openModal(imagePopup);
}
