import { galleryList, createCard } from './components/card.js';
import {
  editButton,
  addButton,
  editPopup,
  addPopup,
  closePopup,
  editForm,
  addForm,
  handleNewCardFormSubmit,
  handleProfileFormSubmit,
  openPopup,
  fillForm,
} from './components/modal.js';
import { formValidationSettings, enableValidation } from './components/validate.js';

import './index.css';

// initialCards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// fill gallery
for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i].link, initialCards[i].name);
  galleryList.append(newCard);
}

// open popups
editButton.addEventListener('click', () => {
  fillForm(formValidationSettings);
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

// close popups
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

// forms submit
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleNewCardFormSubmit);

enableValidation(formValidationSettings);
