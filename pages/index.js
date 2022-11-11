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

const formValidationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error_active'
}

// find elements for gallery
const galleryList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
const galleryCard = cardTemplate.querySelector('.gallery__list-item');

// find elements for profile
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

// create cards and delete cards
function createCard(link, name) {
  const cardClone = galleryCard.cloneNode(true);
  const cardPhoto = cardClone.querySelector('.gallery__photo');
  const cardPlace = cardClone.querySelector('.gallery__place-name');
  const likeButton = cardClone.querySelector('.gallery__like-button');
  const deleteCardButton = cardClone.querySelector('.gallery__delete-button');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardPlace.textContent = name;

  likeButton.addEventListener('click', toggleLikeButton);
  deleteCardButton.addEventListener('click', deleteCard);
  cardPhoto.addEventListener('click', () => {
    openImagePopup(link, name);
  });

  return cardClone;
}

// fill gallery
for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i].link, initialCards[i].name);
  galleryList.append(newCard);
}

// open popup
editButton.addEventListener('click', () => {
  fillForm(formValidationSettings);
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

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

// close popup
const closeButtons = document.querySelectorAll('.popup__close-button');
const overlays = document.querySelectorAll('.popup');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

overlays.forEach((overlay) => {
  overlay.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(overlay);
    }
  });
});

function handleEscClosePopup(evt) {
  const openedPopup = document.querySelector('.popup_opened');

  if (evt.key === 'Escape') {
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
editForm.addEventListener('submit', handleProfileFormSubmit);
const saveButtonEditForm = editForm.querySelector('.popup__save-button');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  if (hasInvalidInput([inputName, inputDescription])) {
    return;
  }

  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;

  closePopup(editPopup);

  saveButtonEditForm.classList.add('popup__save-button_inactive');
}

// submit add form
addForm.addEventListener('submit', handleNewCardFormSubmit);
const saveButtonAddForm = addForm.querySelector('.popup__save-button');

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  if (hasInvalidInput([inputLink, inputPlace])) {
    return;
  }

  const newCard = createCard(inputLink.value, inputPlace.value);
  galleryList.prepend(newCard);

  addForm.reset();

  closePopup(addPopup);

  saveButtonAddForm.classList.add('popup__save-button_inactive');
}

// toggle like button
function toggleLikeButton(evt) {
  evt.target.classList.toggle('gallery__like-button_active');
}

// delete card
function deleteCard(evt) {
  const listItem = evt.target.closest('.gallery__list-item');
  listItem.remove();
}

// validation
function showInputError(validationSettings, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

function hideInputError(validationSettings, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(validationSettings, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(
      validationSettings, 
      formElement, 
      inputElement, 
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationSettings, formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(validationSettings, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}

function setEventListeners(validationSettings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleButtonState(validationSettings, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(validationSettings, formElement, inputElement);
      toggleButtonState(validationSettings, inputList, buttonElement);
    });
  });
};

function enableValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(validationSettings, formElement);
  });
};

enableValidation(formValidationSettings);
