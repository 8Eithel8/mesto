const initialCards = [
  {
   name: 'Косинские поля',
   link: './images/Kosinskie_polya.jpg'
 },
 {
   name: 'Лосиный остров',
   link: './images/Losinka.jpg'
 },
 {
   name: 'Московская область. Восток',
   link: './images/Mos_obl.jpg'
 },
 {
   name: 'Тверская область. Река Сестра',
   link: './images/Tver_obl.jpg'
 },
 {
   name: 'Святое озеро',
   link: './images/Svyatoe_ozero.jpg'
 },
 {
   name: 'Черное озеро',
   link: './images/Chernoe_ozero.jpg'
 },
];

const buttonEdit = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const buttonAdd = document.querySelector('.profile__button_type_add');
const popupAdd = document.querySelector('.popup_type_adder');
const buttonClose = document.querySelector('.popup__button_type_close');
const buttonsClose = document.querySelectorAll('.popup__button_type_close');
const fieldName = document.querySelector('#name');
const fieldInfo = document.querySelector('#info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const form = document.querySelector('.popup__form');
const cardRemove = document.querySelector('.card__remove');
const cardsRemove = document.querySelectorAll('.card__remove');

const cardLike = document.querySelector('.card__like');
const cards = document.querySelector('.cards');
// const newCardAdd = document.querySelector('.popup_type_add');
const cardAdded = document.querySelector('.added');  /*он нужен для работы лаков. но что-то не понятно*/
const popupPhoto = document.querySelector('.popup_type_photo');
const cardImage = document.querySelector('.card__image');
const newCardForm = document.querySelector('#new-card-form');
const cardTemplate = document.querySelector('#card-template').content;
const title = cardTemplate.querySelector('.card__title');
const image = cardTemplate.querySelector('.card__image');
const inputPhotoName = document.querySelector('#photo-name');

const inputPhotoLink = document.querySelector('#photo-link');

function addCard(linkValue, titleValue) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  cardItem.querySelector('.card__image').src = linkValue;
  cardItem.querySelector('.card__title').textContent = titleValue;

  cards.append(cardItem);
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].link, initialCards[i].name)
  
};


function profileEditHandler() {
  popup.classList.add('popup_opened');
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubtitle.textContent;
};

function formAddHandler() {
  popupAdd.classList.add('popup_opened');
};


function formCloseHandler() {
  for (let i = 0; i < popups.length; i++) {
    popups[i].classList.remove('popup_opened')
  };
};

// function formCloseHandler(evt) {
//   evt.target.popup.classList.remove('popup_opened');
// };

function formCloseHandler() {
  for (let i = 0; i < popups.length; i++) {
    popups[i].classList.remove('popup_opened')
  };
};

function profileSaveHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = fieldName.value;
  profileSubtitle.textContent = fieldInfo.value;
  formCloseHandler();
};


function cardLikeHandler(evt) {
  evt.target.classList.toggle('added');
};

function photoOpenHandler() {
  popupPhoto.classList.add('popup_opened');
  document.querySelector('.popup__photo').src = image.src;
  document.querySelector('.popup__photo-title').textContent = title.textContent;
};

/*deleteButton.addEventListener('click', function () {
  const listItem = deleteButton.closest('.todo__item');
  listItem.remove();
});  такой вариант предлагают в яндексе*/

function removeCardHandler(evt) {
  evt.target.parentNode.remove(cardRemove);
}

function removeCardHandler() {
  this.parentNode.remove(cardRemove);
}

for (let i=0; i < buttonsClose.length; i++) {
  buttonsClose[i].addEventListener('click', formCloseHandler);
};


for (let i=0; i < cardsRemove.length; i++) {
  cardsRemove[i].addEventListener('click', removeCardHandler);
};

buttonEdit.addEventListener('click', profileEditHandler);
buttonAdd.addEventListener('click', formAddHandler);
form.addEventListener('submit', profileSaveHandler);
cardImage.addEventListener('click', photoOpenHandler);
cardRemove.addEventListener('click', removeCardHandler);
cardLike.addEventListener('click', cardLikeHandler);


// function addCard(linkValue, titleValue) {
//   const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
//   cardItem.querySelector('.card__image').src = linkValue;
//   cardItem.querySelector('.card__title').textContent = titleValue;
  

//   console.log(cards);
//   cards.append(cardItem);
// }

const saveButton = document.querySelector('#button-save');

saveButton.addEventListener('click', function () {
  
    let image = inputPhotoLink;
    let title = inputPhotoName; 
    console.log(inputPhotoName);
  addCard(image.value, title.value);
  title.value = '';
  image.value = '';
  formCloseHandler();
}); 

// for (let i = 0; i < initialCards.length; i++) {
//   addCard(initialCards[i].link, initialCards[i].name)
  
// };
