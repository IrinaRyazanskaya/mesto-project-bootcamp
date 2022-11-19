import { galleryList, createCard } from './components/card.js';
import {
  editButton,
  addButton,
  avatarChangeButton,
  editPopup,
  addPopup,
  changeAvatarPopup,
  closePopup,
  editForm,
  addForm,
  changeAvatarForm,
  handleNewCardFormSubmit,
  handleProfileFormSubmit,
  handleChangeAvatarFormSubmit,
  openPopup,
  fillForm,
} from './components/modal.js';
import { formValidationSettings, enableValidation } from './components/validate.js';
import {
  fetchSettings,
  makeUserInfoRequest,
  makeGetCardsRequest
} from './components/api.js';

import './index.css';

// open popups
editButton.addEventListener('click', () => {
  fillForm(formValidationSettings);
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

avatarChangeButton.addEventListener('click', () => {
  openPopup(changeAvatarPopup);
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
changeAvatarForm.addEventListener('submit', handleChangeAvatarFormSubmit);

enableValidation(formValidationSettings);

function fillProfileFromAPI(profileResponse) {
  const nameField = document.querySelector('.profile__name');
  const descriptionField = document.querySelector('.profile__description');
  const avatarImage = document.querySelector('.profile__avatar');

  nameField.textContent = profileResponse.name;
  descriptionField.textContent = profileResponse.about;
  avatarImage.setAttribute('src', profileResponse.avatar);
}

function fillGalleryFromAPI(cardsResponse, profile) {
  const allCards = document.createDocumentFragment();

  cardsResponse.forEach((card) => {
    const newCard = createCard(
      card._id,
      card.link,
      card.name,
      card.likes,
      card.owner,
      profile._id
    );
    allCards.append(newCard);
  });

  galleryList.append(allCards);
}

Promise.all([
  makeUserInfoRequest(fetchSettings),
  makeGetCardsRequest(fetchSettings)
])
  .then((responses) => {
    const profileResponse = responses[0];
    const cardsResponse = responses[1];

    fillProfileFromAPI(profileResponse);
    fillGalleryFromAPI(cardsResponse, profileResponse);
  })
  .catch((error) => {
    console.error(error);
  })
