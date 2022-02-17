let buttonEdit = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button_type_close');

let fieldName = document.querySelector('#name');
let fieldInfo = document.querySelector('#info');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let buttonSubmit = document.querySelector('.popup__button_type_submit');

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

buttonSubmit.addEventListener('click', function() {
   profileTitle.textContent = fieldName.value;
   profileSubtitle.textContent = fieldInfo.value;
   popup.classList.remove('popup__opened');
});



 