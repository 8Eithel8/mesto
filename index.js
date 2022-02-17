let buttonEdit = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button_type_close');

let fieldName = document.querySelector('#name');
let fieldInfo = document.querySelector('#info');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let buttonSubmit = document.querySelector('.popup__button_type_submit');
let form = document.querySelector('.popup__form');
console.log(form);

buttonEdit.addEventListener('click', function() {
  popup.classList.add('popup__opened');
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubtitle.textContent;
});

buttonClose.addEventListener('click', function() {
  popup.classList.remove('popup__opened');
  fieldName.value = '';
  fieldInfo.value = '';
});

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileTitle.textContent = fieldName.value;
  profileSubtitle.textContent = fieldInfo.value;
  popup.classList.remove('popup__opened');
});



 