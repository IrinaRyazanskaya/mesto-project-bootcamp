import { openImagePopup } from './modal.js';
import {
  fetchSettings,
  makePutLikeRequest,
  makeDeleteLikeRequest,
  makeDeleteCardRequest
} from './api.js';

// find elements for gallery
const galleryList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
const galleryCard = cardTemplate.querySelector('.gallery__list-item');

// find elements for image popup
const imagePopup = document.querySelector('#image-popup');
const imageElement = document.querySelector('.popup__image');
const captionElement = document.querySelector('.popup__caption');

// create cards and delete cards
function createCard(id, link, name, likes, owner, userId) {
  const cardClone = galleryCard.cloneNode(true);
  const cardPhoto = cardClone.querySelector('.gallery__photo');
  const cardPlace = cardClone.querySelector('.gallery__place-name');
  const likeButton = cardClone.querySelector('.gallery__like-button');
  const deleteCardButton = cardClone.querySelector('.gallery__delete-button');
  const likesCounter = cardClone.querySelector('.gallery__like-counter');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardPlace.textContent = name;
  likesCounter.textContent = likes.length;

  likes.forEach(like => {
    const userLike = like._id;

    if (userLike === userId) {
      likeButton.classList.add('gallery__like-button_active');
    }
  });

  if (owner._id !== userId) {
    deleteCardButton.classList.add('gallery__delete-button_inactive');
  }

  likeButton.addEventListener('click', () => {
    toggleLikeButton(likeButton, likesCounter, id);
  });
  deleteCardButton.addEventListener('click', () => {
    deleteCard(cardClone, id);
  });
  cardPhoto.addEventListener('click', () => {
    openPopup(imagePopup);
    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;
  });

  return cardClone;
}

// toggle like button
function toggleLikeButton(button, likesCounter, cardId) {
  if (button.classList.contains('gallery__like-button_active')) {
    makeDeleteLikeRequest(fetchSettings, cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
        button.classList.remove('gallery__like-button_active');
      })
      .catch((error) => {
        console.error(error);
      })
  } else {
    makePutLikeRequest(fetchSettings, cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
        button.classList.add('gallery__like-button_active');
      })
      .catch((error) => {
        console.error(error);
      })
  }
}

// delete card
function deleteCard(galleryCard, cardId) {
  makeDeleteCardRequest(fetchSettings, cardId)
    .then(() => {
      galleryCard.remove();
    })
    .catch((error) => {
      console.error(error);
    })
}

export { galleryList, createCard }
