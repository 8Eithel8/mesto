import { initialCards } from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from "./Popup.js";
// import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
// import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";




const buttonEdit = document.querySelector('.profile__button_type_edit');
const popupProfile = document.querySelector('.popup_type_profile');
const buttonAdd = document.querySelector('.profile__button_type_add');
const popupAddOld = document.querySelector('.popup_type_adder');
const closeButtons = document.querySelectorAll('.popup__button_close');
const fieldName = document.querySelector('#name');
const fieldInfo = document.querySelector('#info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = popupProfile.querySelector('.popup__form');
const cardFormNew = popupAddOld.querySelector('.popup__form');
const cards = document.querySelector('.cards');
// const popupPhoto = document.querySelector('.popup_type_photo');
// const inputPhotoName = document.querySelector('#photo-name');
// const inputPhotoLink = document.querySelector('#photo-link');
// const imageFull = document.querySelector('.popup__photo');
// const imageFullTitle = document.querySelector('.popup__photo-title');
const popups = document.querySelectorAll('.popup');
const cardTemplate = '#card-template';

export const settingsValidation = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button_submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__error_visible'
};

// создаем экземпляра валидаторв для каждой формы и проверяем 
const profileFormValidator = new FormValidator(settingsValidation, profileForm);
// const adderFormValidator = new FormValidator(settingsValidation, cardFormNew);

function addCard(container, data) {
  const card = new Card(data, cardTemplate);
  container.prepend(card.generateCard());
};

/*скорпировано*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function editProfile() {
  profileFormValidator.resetForm();
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};
/*скорпировано*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function closeForm(evt) {
  closePopup(evt.target.closest('.popup'));
};
/*скорпировано*/
function closeOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  };
};
/*скорпировано*/
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

// export function openPhoto(image, title) {
//   imageFull.src = image;
//   imageFullTitle.textContent = title;
//   imageFull.alt = title;
//   openPopup(popupPhoto);
// };

function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = fieldName.value;
  profileSubtitle.textContent = fieldInfo.value;
  closePopup(popupProfile);
};



// function submitCard(evt) {
//   evt.preventDefault();
//   const data = {
//     name: inputPhotoName.value,
//     link: inputPhotoLink.value
//   }
//   addCard(cards, data);
//   cardFormNew.reset();
//   closePopup(popupAdd);
// };

function openPopupAdd() {
  cardFormNew.reset();
  adderFormValidator.disableSubmitButton();
  adderFormValidator.resetForm();
  openPopup(popupAdd);
};

popups.forEach(popup => popup.addEventListener('click', closeOverlay));
document.addEventListener('keydown', closePopupByEsc);

closeButtons.forEach(button => button.addEventListener('click', closeForm));

buttonEdit.addEventListener('click', editProfile);
// buttonAdd.addEventListener('click', () => openPopupAdd());
profileForm.addEventListener('submit', saveProfile);
// cardFormNew.addEventListener('submit', submitCard);

initialCards.forEach(item => addCard(cards, item));   

profileFormValidator.enableValidation();
// adderFormValidator.enableValidation();

export const popupPhoto = new PopupWithImage('.popup_type_photo');
const popupAdd = new PopupWithForm('.popup_type_adder', (data) => addCard(cards, data));
popupPhoto.setEventListeners();
popupAdd.setEventListeners();
buttonAdd.addEventListener('click', () => popupAdd.open());
