// Сообщения об ошибке
const errorMessages = {
  require: "Вы пропустили это поле",
  name: "Должно быть от 2 до 40 символов",
  description: "Должно быть от 2 до 200 символов",
  cardName: "Должно быть от 2 до 30 символов",
  invalidChar:
    "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
  invalidUrl: "Введите адрес сайта",
};

// Регулярное выражение для проверки символов
const regex = {
  name: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
  text: /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?@#$%^&*()_+-=;:'"<>[\]{}|\\/]+$/,
  url: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/,
};

function showInputError(inputElement, errorElement, message, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = " ";
  errorElement.classList.remove(config.errorClass);
}

function isValid(inputElement, errorElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, errorMessages.require, config);
    return false;
  }

  // Проверка на допустимые символы
  if (
    (inputElement.name === "name" && !regex.name.test(inputElement.value)) ||
    (inputElement.name === "description" &&
      !regex.name.test(inputElement.value)) ||
    (inputElement.name === "place-name" && !regex.name.test(inputElement.value))
  ) {
    showInputError(
      inputElement,
      errorElement,
      errorMessages.invalidChar,
      config
    );
    return false;
  }

  // Проверка длины символов
  if (
    inputElement.name === "name" &&
    (inputElement.value.length < 2 || inputElement.value.length > 40)
  ) {
    showInputError(inputElement, errorElement, errorMessages.name, config);
    return false;
  }

  if (
    inputElement.name === "description" &&
    (inputElement.value.length < 2 || inputElement.value.length > 200)
  ) {
    showInputError(
      inputElement,
      errorElement,
      errorMessages.description,
      config
    );
    return false;
  }

  if (
    inputElement.name === "place-name" &&
    (inputElement.value.length < 2 || inputElement.value.length > 30)
  ) {
    showInputError(inputElement, errorElement, errorMessages.cardName, config);
    return false;
  }

  // Проверка на ввод ссылки
  if (inputElement.type === "url" && !regex.url.test(inputElement.value)) {
    showInputError(
      inputElement,
      errorElement,
      errorMessages.invalidUrl,
      config
    );
    return false;
  }

  // Скрывам сообщение об ошибке если все проверки пройдены
  hideInputError(inputElement, errorElement, config);
  return true;
}

// Переключение состояние кнопки при валидации формы
function toggleButtonState(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const isValid = formElement.checkValidity();

  if (isValid) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  }
}

// Обработчик события для всех форм
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const errorElements = Array.from(
    formElement.querySelectorAll(".popup-error")
  );

  // Проверка состояния кнопки при загрузке
  toggleButtonState(formElement, config);

  inputList.forEach((inputElement, index) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, errorElements[index], config);
      toggleButtonState(formElement, config);
    });
  });
}

// Включаем валидацию всех для всех форм
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  });
}

// Доделать clearValidation(Довести до ума, пока работает странно и не понятно)
export function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const errorElements = Array.from(
    formElement.querySelectorAll(`.${config.errorClass}`)
  );

  inputList.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });

  errorElements.forEach((error) => {
    error.textContent = "";
    error.classList.remove(config.errorClass);
  });
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}
