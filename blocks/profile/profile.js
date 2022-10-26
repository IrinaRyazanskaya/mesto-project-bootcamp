const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

function openEditPopup() {
  const editPopup = document.querySelector('#edit-popup');
  editPopup.classList.add('popup_opened');
}

function openAddPopup() {
  const addPopup = document.querySelector('#add-popup');
  addPopup.classList.add('popup_opened');
}
