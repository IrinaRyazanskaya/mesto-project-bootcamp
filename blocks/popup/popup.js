const closeEditPopupButton = document.querySelector('#close-edit-popup');
const closeAddPopupButton = document.querySelector('#close-add-popup');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#edit-popup');
const addPopup = document.querySelector('#add-popup');
const formElement = document.querySelector('.popup__form');
const inputName = formElement.querySelector('.popup__field[name="name"]');
const inputDescription = formElement.querySelector('.popup__field[name="description"]');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');

closeEditPopupButton.addEventListener('click', closeEditPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
editButton.addEventListener('click', fillForm);
formElement.addEventListener('submit', formSubmitHandler);

function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}

function closeAddPopup() {
  addPopup.classList.remove('popup_opened');
}

function fillForm() {
  const nameValue = userName.textContent;
  const descriptionValue = userDescription.textContent;

  inputName.value = nameValue;
  inputDescription.value = descriptionValue;
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;

  closeEditPopup();
}
