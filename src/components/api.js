const fetchSettings = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-2',
  headers: {
    authorization: '70e3b835-7fa1-49d6-af9d-b217b97e0c8e',
    'Content-Type': 'application/json'
  }
}

function getUserInformation(settings) {
  return fetch(`${settings.baseUrl}/users/me`, {
    headers: {
      authorization: settings.headers.authorization
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
}

function getCards(settings) {
  return fetch(`${settings.baseUrl}/cards`, {
    headers: {
      authorization: settings.headers.authorization
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
}

function updateProfile(settings, name, about) {
  return fetch(`${settings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
}

function addNewCard(settings, link, name) {
  return fetch(`${settings.baseUrl}/cards`, {
    method: 'POST',
    headers: settings.headers,
    body: JSON.stringify({
      link,
      name
    })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
}

function getLikesFromAPI(settings) {
  return fetch(`${settings.baseUrl}/cards`, {
    headers: {
      authorization: settings.headers.authorization
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .then((data) => console.log(data));
}


export { 
  fetchSettings, 
  getUserInformation, 
  getCards, 
  updateProfile, 
  addNewCard,
  getLikesFromAPI
};