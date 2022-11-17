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
import { fetchSettings, getUserInformation, getCards } from './components/api.js';

import './index.css';

// initialCards
// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

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

function fillProfileFromAPI(settings) {
  const nameField = document.querySelector('.profile__name');
  const descriptionField = document.querySelector('.profile__description');
  const avatarImage = document.querySelector('.profile__avatar');

  getUserInformation(settings)
    .then((data) => {
      nameField.textContent = data.name;
      descriptionField.textContent = data.about;
      avatarImage.setAttribute('src', data.avatar);
    })
}

function fillGalleryFromAPI(settings) {
  getCards(settings)
  .then((data) => {
    const allCards = document.createDocumentFragment();
    
    data.forEach((card) => {
      const newCard = createCard(card.link, card.name);
      allCards.append(newCard);
    });

    galleryList.append(allCards);
  });
}

fillProfileFromAPI(fetchSettings);
fillGalleryFromAPI(fetchSettings);