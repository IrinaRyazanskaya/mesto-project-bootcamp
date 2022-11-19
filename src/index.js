import { galleryList, createCard } from './components/card.js';
import { closePopup, openPopup } from './components/modal.js';
import { 
  formValidationSettings, 
  enableValidation, 
  hideInputError 
} from './components/validate.js';
import {
  fetchSettings,
  makeAddNewCardRequest,
  makeUpdateProfileRequest,
  makeUserInfoRequest,
  makeGetCardsRequest,
  makeChangeAvatarRequest,
} from './components/api.js';

import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// find elements for add popup
const addPopup = document.querySelector('#add-popup');
const addForm = document.forms['add-card'];
const inputPlace = addForm.querySelector('.popup__field[name="place"]');
const inputLink = addForm.querySelector('.popup__field[name="link"]');
const saveButtonAddForm = addForm.querySelector('.popup__save-button');

// find elements for edit popup
const editPopup = document.querySelector('#edit-popup');
const editForm = document.forms['edit-profile'];
const inputName = editForm.querySelector('.popup__field[name="name"]');
const inputDescription = editForm.querySelector('.popup__field[name="description"]');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const saveButtonEditForm = editForm.querySelector('.popup__save-button');

// find elements fot change avatar popup
const avatarElement = document.querySelector('.profile__avatar');
const avatarChangeButton = document.querySelector('.profile__edit-avatar');
const changeAvatarPopup = document.querySelector('#change-avatar-popup');
const changeAvatarForm = document.forms['change-avatar'];
const inputAvatarLink = changeAvatarForm.querySelector('.popup__field[name="link"]');
const saveButtonAvatarForm = changeAvatarForm.querySelector('.popup__save-button');

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

// fill edit form
function fillForm(validationSettings) {
  const nameValue = userName.textContent;
  const descriptionValue = userDescription.textContent;

  inputName.value = nameValue;
  inputDescription.value = descriptionValue;

  hideInputError(validationSettings, editForm, inputName);
  hideInputError(validationSettings, editForm, inputDescription);
}

// submit add form
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  saveButtonAddForm.setAttribute('value', 'Сохранение...');
  saveButtonAddForm.setAttribute('disabled', '');

  makeAddNewCardRequest(
    fetchSettings,
    inputLink.value,
    inputPlace.value
  )
    .then((data) => {
      const newCard = createCard(
        data._id, 
        data.link, 
        data.name, 
        data.likes, 
        data.owner,
        data.owner._id
      );
      galleryList.prepend(newCard);

      addForm.reset();

      closePopup(addPopup);

      saveButtonAddForm.classList.add('popup__save-button_inactive');
    })
    .catch((error) => {
      saveButtonAddForm.removeAttribute('disabled');
      console.error(error);
    })
    .finally(() => {
      saveButtonAddForm.setAttribute('value', 'Сохранить');
    });
}

// submit edit form
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  saveButtonEditForm.setAttribute('value', 'Сохранение...');
  saveButtonEditForm.setAttribute('disabled', '');

  makeUpdateProfileRequest(
    fetchSettings,
    inputName.value,
    inputDescription.value
  )
    .then((data) => {
      userName.textContent = data.name;
      userDescription.textContent = data.about;

      closePopup(editPopup);

      saveButtonEditForm.classList.add('popup__save-button_inactive');
    })
    .catch((error) => {
      saveButtonEditForm.removeAttribute('disabled');
      console.error(error);
    })
    .finally(() => {
      saveButtonEditForm.setAttribute('value', 'Сохранить');
    });
}

// submit change avatar form
function handleChangeAvatarFormSubmit(evt) {
  evt.preventDefault();

  saveButtonAvatarForm.setAttribute('value', 'Сохранение...');
  saveButtonAvatarForm.setAttribute('disabled', '');

  makeChangeAvatarRequest(
    fetchSettings,
    inputAvatarLink.value
  )
  .then((data) => {
    avatarElement.src = data.avatar;
    changeAvatarForm.reset();

    closePopup(changeAvatarPopup);

    saveButtonAvatarForm.classList.add('popup__save-button_inactive');
  })
  .catch((error) => {
    saveButtonAvatarForm.removeAttribute('disabled');
    console.error(error);
  })
  .finally(() => {
    saveButtonAvatarForm.setAttribute('value', 'Сохранить');
  });
}

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
