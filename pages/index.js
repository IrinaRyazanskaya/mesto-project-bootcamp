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

// find elements for gallery
const galleryList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
const galleryCard = cardTemplate.querySelector('.gallery__card-container');

// find elements for profile
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// find elements for edit popup
const closeEditPopupButton = document.querySelector('#close-edit-popup');
const editPopup = document.querySelector('#edit-popup');
const editForm = document.querySelector('#edit-form');
const inputName = editForm.querySelector('.popup__field[name="name"]');
const inputDescription = editForm.querySelector('.popup__field[name="description"]');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');

// find elements for add popup
const closeAddPopupButton = document.querySelector('#close-add-popup');
const addPopup = document.querySelector('#add-popup');
const addForm = document.querySelector('#add-form');
const inputPlace = addForm.querySelector('.popup__field[name="place"]');
const inputLink = addForm.querySelector('.popup__field[name="link"]');

// create gallery item
function createGalleryItem() {
    const listItem = document.createElement('li');
    listItem.classList.add('gallery__list-item');

    return listItem;
}

// create cards and delete cards
function createCard(link, name) {
    const cardClone = galleryCard.cloneNode(true);
    const cardClonePhoto = cardClone.querySelector('.gallery__photo');
    const cardClonePlace = cardClone.querySelector('.gallery__place-name');
    const likeButton = cardClone.querySelector('.gallery__like-button');
    const deleteCardButton = cardClone.querySelector('.gallery__delete-button');

    cardClonePhoto.src = link;
    cardClonePhoto.alt = name;
    cardClonePlace.textContent = name;

    likeButton.addEventListener('click', toggleLikeButton);
    deleteCardButton.addEventListener('click', deleteCard);

    return cardClone;
}

// fill gallery
for (let i = 0; i < initialCards.length; i++) {
    const galleryItem = createGalleryItem();
    const newCard = createCard(initialCards[i].link, initialCards[i].name);

    galleryList.append(galleryItem);
    galleryItem.append(newCard);
}

// open popup
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

// close popup
closeEditPopupButton.addEventListener('click', closeEditPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);

function closeEditPopup() {
    editPopup.classList.remove('popup_opened');
}

function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
}

// fill edit form
editButton.addEventListener('click', fillForm);

function fillForm() {
    const nameValue = userName.textContent;
    const descriptionValue = userDescription.textContent;

    inputName.value = nameValue;
    inputDescription.value = descriptionValue;
}

// submit edit form
editForm.addEventListener('submit', editFormSubmitHandler);

function editFormSubmitHandler(evt) {
    evt.preventDefault();

    userName.textContent = inputName.value;
    userDescription.textContent = inputDescription.value;

    closeEditPopup();
}

// submit add form
addForm.addEventListener('submit', addFormSubmitHandler);

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    const galleryItem = createGalleryItem();
    const newCard = createCard(inputLink.value, inputPlace.value);

    galleryList.prepend(galleryItem);
    galleryItem.append(newCard);

    inputLink.value = '';
    inputPlace.value = '';

    closeAddPopup();
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
