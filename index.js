let buttonEdit = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button_type_close');
let fieldName = document.querySelector('#name');
let fieldInfo = document.querySelector('#info');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let form = document.querySelector('.popup__form');

function editor() {
  popup.classList.add('popup_opened');
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubtitle.textContent;
};

function closer() {
  popup.classList.remove('popup_opened');
};

function saver(evt) {
  evt.preventDefault();
  profileTitle.textContent = fieldName.value;
  profileSubtitle.textContent = fieldInfo.value;
  closer();
};

buttonEdit.addEventListener('click', editor);
buttonClose.addEventListener('click', closer);
form.addEventListener('submit', saver);