const fetchSettings = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-2',
  headers: {
    authorization: '70e3b835-7fa1-49d6-af9d-b217b97e0c8e',
    'Content-Type': 'application/json'
  }
}

function getResponseData(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
}

function makeUserInfoRequest(settings) {
  return fetch(`${settings.baseUrl}/users/me`, {
    headers: {
      authorization: settings.headers.authorization
    }
  })
    .then((response) => {
      return getResponseData(response);
    });
}

function makeGetCardsRequest(settings) {
  return fetch(`${settings.baseUrl}/cards`, {
    headers: {
      authorization: settings.headers.authorization
    }
  })
    .then((response) => {
      return getResponseData(response);
    });
}

function makeUpdateProfileRequest(settings, name, about) {
  return fetch(`${settings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
    .then((response) => {
      return getResponseData(response);
    });
}

function makeAddNewCardRequest(settings, link, name) {
  return fetch(`${settings.baseUrl}/cards`, {
    method: 'POST',
    headers: settings.headers,
    body: JSON.stringify({
      link,
      name
    })
  })
    .then((response) => {
      return getResponseData(response);
    });
}

function makePutLikeRequest(settings, cardId) {
  return fetch(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: settings.headers.authorization
    }
  })
    .then((response) => {
      return getResponseData(response);
    });
}

function makeDeleteLikeRequest(settings, cardId) {
  return fetch(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: settings.headers.authorization
    }
  })
    .then((response) => {
      return getResponseData(response);
    });
}

function makeChangeAvatarRequest(settings, avatar) {
  return fetch(`${settings.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then((response) => {
      return getResponseData(response);
    });
}

function makeDeleteCardRequest(settings, cardId) {
  return fetch(`${settings.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: settings.headers.authorization
    }
  })
    .then((response) => {
      return getResponseData(response);
    });
}

export {
  fetchSettings,
  makeUserInfoRequest,
  makeGetCardsRequest,
  makeUpdateProfileRequest,
  makeAddNewCardRequest,
  makePutLikeRequest,
  makeDeleteLikeRequest,
  makeChangeAvatarRequest,
  makeDeleteCardRequest,
};