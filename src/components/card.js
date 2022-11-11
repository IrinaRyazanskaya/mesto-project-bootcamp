import { openImagePopup } from './modal.js';

// find elements for gallery
const galleryList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
const galleryCard = cardTemplate.querySelector('.gallery__list-item');

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

// toggle like button
function toggleLikeButton(evt) {
  evt.target.classList.toggle('gallery__like-button_active');
}

// delete card
function deleteCard(evt) {
  const listItem = evt.target.closest('.gallery__list-item');
  listItem.remove();
}

export {
  galleryList,
  createCard,
}