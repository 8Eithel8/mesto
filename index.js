const initialCards = [
  {
   name: 'Петропавловская крепость',
   link: './images/Piter.jpg'
 },
 {
   name: 'ВДНХ',
   link: './images/vdkh.jpg'
 },
 {
   name: 'Царское село',
   link: './images/Pushkin.jpg'
 },
 {
   name: 'Тверская область. Река Сестра',
   link: './images/Tver_obl.jpg'
 },
 {
   name: 'Крым. Воронцовский дворец',
   link: './images/Livadia_krim.jpg'
 },
 {
   name: 'Московская область. Восток',
   link: './images/Mos_obl.jpg'
 },
];

let buttonEdit = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button_type_close');
let fieldName = document.querySelector('#name');
let fieldInfo = document.querySelector('#info');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let form = document.querySelector('.popup__form');
let buttonAdd = document.querySelector('.profile__button_type_add');
let popupAdd = document.querySelector('.popup_type_adder');

function profileEditHandler() {
  popup.classList.add('popup_opened');
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubtitle.textContent;
};

function formCloseHandler() {
  popup.classList.remove('popup_opened');
};

function profileSaveHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = fieldName.value;
  profileSubtitle.textContent = fieldInfo.value;
  formCloseHandler();
};

function formAddHandler(evt) {
  popupAdd.classList.add('popup_opened');
};


buttonEdit.addEventListener('click', profileEditHandler);
buttonClose.addEventListener('click', formCloseHandler);
form.addEventListener('submit', profileSaveHandler);
buttonAdd.addEventListener('click', formAddHandler)

