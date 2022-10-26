const closeButton = document.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const inputName = formElement.querySelector('.popup__field[name="name"]');
const inputDescription = formElement.querySelector('.popup__field[name="description"]');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', fillForm);
formElement.addEventListener('submit', formSubmitHandler);

function closePopup() {
  popup.classList.remove('popup_opened');
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

  closePopup();
}
