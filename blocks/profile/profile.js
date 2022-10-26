const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', openPopup);

function openPopup() {
  const popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
}
