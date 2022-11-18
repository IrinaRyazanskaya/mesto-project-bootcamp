import { galleryList, createCard } from './components/card.js';
import {
  editButton,
  addButton,
  avatarChangeButton,
  avatarElement,
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
  getUserInformation,
  getCards
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

function fillProfileFromAPI(settings) {
  const nameField = document.querySelector('.profile__name');
  const descriptionField = document.querySelector('.profile__description');
  const avatarImage = document.querySelector('.profile__avatar');

  return getUserInformation(settings)
    .then((data) => {
      nameField.textContent = data.name;
      descriptionField.textContent = data.about;
      avatarImage.setAttribute('src', data.avatar);

      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function fillGalleryFromAPI(settings, profile) {
  getCards(settings)
    .then((data) => {
      const allCards = document.createDocumentFragment();

      data.forEach((card) => {
        const newCard = createCard(
          card._id,
          card.link,
          card.name,
          card.likes,
          profile._id
        );
        allCards.append(newCard);
      });

      galleryList.append(allCards);
    })
    .catch((error) => {
      console.error(error);
    });
}

fillProfileFromAPI(fetchSettings)
  .then((data) => {
    return fillGalleryFromAPI(fetchSettings, data);
  });
