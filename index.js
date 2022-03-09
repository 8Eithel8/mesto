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
const newCardForm = document.querySelector('#new-card-form');
const cards = document.querySelector('.cards');
const cardAdded = document.querySelector('.added');  /*он нужен для работы лаков. но что-то не понятно*/
const popupPhoto = document.querySelector('.popup_type_photo');
const cardTemplate = document.querySelector('#card-template').content;
const inputPhotoName = document.querySelector('#photo-name');
const inputPhotoLink = document.querySelector('#photo-link');

function addCard(linkValue, titleValue) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  cardItem.querySelector('.card__image').src = linkValue;
  cardItem.querySelector('.card__title').textContent = titleValue;
  cardItem.querySelector('.card__like').addEventListener('click', cardLikeHandler);
  cardItem.querySelector('.card__remove').addEventListener('click', removeCardHandler);
  cardItem.querySelector('.card__image').addEventListener('click', photoOpenHandler);
  cards.prepend(cardItem);
};

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].link, initialCards[i].name)
};

function cardLikeHandler(evt) {
  evt.target.classList.toggle('added');
};

function removeCardHandler(evt) {
  evt.target.parentNode.remove();
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

function photoOpenHandler(evt) {
  popupPhoto.classList.add('popup_opened');
  document.querySelector('.popup__photo').src = evt.target.src;
  document.querySelector('.popup__photo-title').textContent = evt.target.parentNode.querySelector('.card__title').textContent;
};

for (let i=0; i < buttonsClose.length; i++) {
  buttonsClose[i].addEventListener('click', formCloseHandler);
};

buttonEdit.addEventListener('click', profileEditHandler);
buttonAdd.addEventListener('click', formAddHandler);
form.addEventListener('submit', profileSaveHandler);

// const saveButton = document.querySelector('#button-save');

newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let image = inputPhotoLink;
  let title = inputPhotoName; 
  addCard(image.value, title.value);
  title.value = '';
  image.value = '';
  formCloseHandler();
}); 

