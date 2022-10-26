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
const galleryList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
const galleryCard = cardTemplate.querySelector('.gallery__card-container');

for (let i = 0; i < initialCards.length; i++) {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery__list-item');

  const cardClone = galleryCard.cloneNode(true);
  const cardClonePhoto = cardClone.querySelector('.gallery__photo');
  const cardClonePlace = cardClone.querySelector('.gallery__place-name');

  cardClonePhoto.src = initialCards[i].link;
  cardClonePhoto.alt = initialCards[i].name;
  cardClonePlace.textContent = initialCards[i].name;

  galleryList.append(listItem);
  listItem.append(cardClone);
}
