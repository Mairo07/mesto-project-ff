const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: '38816a01-ce10-4ad5-a912-b35c9441eab8',
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

export function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function editProfile(newName, newDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function addCard(newName, newLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function putCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function getCardLikeCount(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'GET',
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function editProfileAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}


