// Сообщения об ошибке
const errorMessages = {
  require: "Вы пропустили это поле",
  name: "Должно быть от 2 до 40 символов",
  description: "Должно быть от 2 до 200 символов",
  cardName: "Должно быть от 2 до 30 символов",
  invalidChar: "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
  invalidUrl: "Введите адрес сайта",
};

// Регулярные выражения
const regex = {
  name: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
  text: /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?@#$%^&*()_+-=;:'"<>[\]{}|\\/]+$/,
  url: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/,
};

// Показать ошибку
function showInputError(inputElement, errorElement, message, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
}

// Скрыть ошибку
function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Проверка валидности поля
function checkInputValidity(inputElement, errorElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, errorMessages.require, config);
    return false;
  }

  if (inputElement.dataset.pattern && !regex[inputElement.dataset.pattern].test(inputElement.value)) {
    showInputError(inputElement, errorElement, errorMessages.invalidChar, config);
    return false;
  }

  const lengthChecks = {
    name: { min: 2, max: 40, message: errorMessages.name },
    description: { min: 2, max: 200, message: errorMessages.description },
    "place-name": { min: 2, max: 30, message: errorMessages.cardName }
  };

  if (lengthChecks[inputElement.name]) {
    const { min, max, message } = lengthChecks[inputElement.name];
    if (inputElement.value.length < min || inputElement.value.length > max) {
      showInputError(inputElement, errorElement, message, config);
      return false;
    }
  }

  if (inputElement.type === "url" && !regex.url.test(inputElement.value)) {
    showInputError(inputElement, errorElement, errorMessages.invalidUrl, config);
    return false;
  }

  hideInputError(inputElement, errorElement, config);
  return true;
}

// Проверка всех полей на валидность
function hasInvalidInput(inputList, errorElements, config) {
  return inputList.some((input, index) => {
    return !checkInputValidity(input, errorElements[index], config);
  });
}

// Переключение состояния кнопки
function toggleButtonState(formElement, inputList, errorElements, config) {
  const button = formElement.querySelector(config.submitButtonSelector);
  const isValid = !hasInvalidInput(inputList, errorElements, config);

  button.disabled = !isValid;
  button.classList.toggle(config.inactiveButtonClass, !isValid);
}

// Установка обработчиков событий
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const errorElements = Array.from(formElement.querySelectorAll(config.errorSelector));

  toggleButtonState(formElement, inputList, errorElements, config);

  inputList.forEach((input, index) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorElements[index], config);
      toggleButtonState(formElement, inputList, errorElements, config);
    });
  });
}

// Включение валидации
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(form => setEventListeners(form, config));
}

// Очистка валидации
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const errorElements = Array.from(formElement.querySelectorAll(config.errorSelector));

  inputList.forEach((input, index) => {
    hideInputError(input, errorElements[index], config);
  });

  const button = formElement.querySelector(config.submitButtonSelector);
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}