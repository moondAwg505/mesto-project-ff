const configServer = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "89c2300e-27cb-476f-aa00-4a502bf7d056",
    "Content-Type": "application/json",
  },
};

// Ответ от сервера
function serverResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка при загрузке ${res.status}`);
  }
}

// Данные пользователя
export function userInfo() {
  return fetch(`${configServer.baseUrl}/users/me`, {
    headers: configServer.headers,
  }).then(serverResponse);
}

// Загрузка карточек с сервера
export function cardsDownloadWithServer() {
  return fetch(`${configServer.baseUrl}/cards`, {
    headers: configServer.headers,
  }).then(serverResponse);
}

// Редактирование профиля
export function editProfileUser({ name, about }) {
  return fetch(`${configServer.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configServer.headers,
    body: JSON.stringify({ name, about }),
  }).then(serverResponse);
}

// Добавление новой карточки
export function addCard({ name, link }) {
  return fetch(`${configServer.baseUrl}/cards`, {
    method: "POST",
    headers: configServer.headers,
    body: JSON.stringify({ name, link }),
  }).then(serverResponse);
}

// Лайк карточки
export function likeTheCard(cardId) {
  return fetch(`${configServer.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: configServer.headers,
  }).then(serverResponse);
}

// Удаление лайка карточки
export function unlikeTheCard(cardId) {
  return fetch(`${configServer.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE", // Исправлено с DLETE
    headers: configServer.headers,
  }).then(serverResponse);
}

// Удаление карточки
export function deleteTheCard(cardId) {
  return fetch(`${configServer.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configServer.headers,
  }).then(serverResponse);
}

// Обновление аватара
export function avatarUpdate(avatar) {
  return fetch(`${configServer.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configServer.headers,
    body: JSON.stringify({ avatar })
  }).then(serverResponse);
}
