import { openImagePopup } from './modal.js';
import { fetchSettings, putLike, deleteLike } from './api.js';

// find elements for gallery
const galleryList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
const galleryCard = cardTemplate.querySelector('.gallery__list-item');

// create cards and delete cards
function createCard(id, link, name, likes, userId = undefined) {
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

  likeButton.addEventListener('click', () => {
    toggleLikeButton(likeButton, likesCounter, id);
  });
  deleteCardButton.addEventListener('click', deleteCard);
  cardPhoto.addEventListener('click', () => {
    openImagePopup(link, name, likes);
  });

  return cardClone;
}

// toggle like button
function toggleLikeButton(button, likesCounter, cardId) {
  if (button.classList.contains('gallery__like-button_active')) {
    deleteLike(fetchSettings, cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
        button.classList.remove('gallery__like-button_active');
      })
      .catch((error) => {
        console.error(error);
      })
  } else {
    putLike(fetchSettings, cardId)
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
function deleteCard(evt) {
  const listItem = evt.target.closest('.gallery__list-item');
  listItem.remove();
}

export {
  galleryList,
  createCard,
}
