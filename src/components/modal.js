import { galleryList, createCard } from './card.js';
import { hideInputError } from './validate.js';
import { 
  fetchSettings, 
  makeUpdateProfileRequest, 
  makeAddNewCardRequest, 
  makeChangeAvatarRequest 
} from './api.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// find elements for edit popup
const editPopup = document.querySelector('#edit-popup');
const editForm = document.forms['edit-profile'];
const inputName = editForm.querySelector('.popup__field[name="name"]');
const inputDescription = editForm.querySelector('.popup__field[name="description"]');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');

// find elements for add popup
const addPopup = document.querySelector('#add-popup');
const addForm = document.forms['add-card'];
const inputPlace = addForm.querySelector('.popup__field[name="place"]');
const inputLink = addForm.querySelector('.popup__field[name="link"]');

// find elements for image popup
const imagePopup = document.querySelector('#image-popup');
const imageElement = document.querySelector('.popup__image');
const captionElement = document.querySelector('.popup__caption');

// find elements fot change avatar popup
const avatarElement = document.querySelector('.profile__avatar');
const avatarChangeButton = document.querySelector('.profile__edit-avatar');
const changeAvatarPopup = document.querySelector('#change-avatar-popup');
const changeAvatarForm = document.forms['change-avatar'];
const inputAvatarLink = changeAvatarForm.querySelector('.popup__field[name="link"]');

// open popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClosePopup);
}

function openImagePopup(link, name) {
  openPopup(imagePopup);
  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;
}

function handleEscClosePopup(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClosePopup);
}

// fill edit form
function fillForm(validationSettings) {
  const nameValue = userName.textContent;
  const descriptionValue = userDescription.textContent;

  inputName.value = nameValue;
  inputDescription.value = descriptionValue;

  hideInputError(validationSettings, editForm, inputName);
  hideInputError(validationSettings, editForm, inputDescription);
}

// submit edit form
const saveButtonEditForm = editForm.querySelector('.popup__save-button');

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
      saveButtonEditForm.setAttribute('value', 'Сохранить');
    })
    .catch((error) => {
      saveButtonEditForm.removeAttribute('disabled');
      console.error(error);
    });
}

// submit add form
const saveButtonAddForm = addForm.querySelector('.popup__save-button');

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

      saveButtonAddForm.setAttribute('value', 'Сохранить');
      saveButtonAddForm.classList.add('popup__save-button_inactive');
    })
    .catch((error) => {
      saveButtonAddForm.removeAttribute('disabled');
      console.error(error);
    });
}

// submit change avatar form
const saveButtonAvatarForm = changeAvatarForm.querySelector('.popup__save-button');

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
    saveButtonAvatarForm.setAttribute('value', 'Сохранить');
  })
  .catch((error) => {
    saveButtonAvatarForm.removeAttribute('disabled');
    console.error(error);
  });
}

export {
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
  openImagePopup,
  fillForm,
}