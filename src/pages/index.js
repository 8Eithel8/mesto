import './index.css';
import { initialCards } from '../Utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from "../components/Popup.js";
import Section from "./Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";


const buttonEdit = document.querySelector('.profile__button_type_edit');
const popupProfile = document.querySelector('.popup_type_profile');
const buttonAdd = document.querySelector('.profile__button_type_add');
const popupAddOld = document.querySelector('.popup_type_adder');
const closeButtons = document.querySelectorAll('.popup__button_close');
const fieldName = document.querySelector('#name');
const fieldInfo = document.querySelector('#info');
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');
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

const userProfile = new UserInfo({name: '.profile__title', info: '.profile__subtitle'});
console.log(userProfile);

function addCard(container, data) {
  const card = new Card(data, cardTemplate);
  container.prepend(card.generateCard());
};

/*скорпировано*/
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEsc);
// };

// function editProfile() {
//   profileFormValidator.resetForm();
//   //объект userInfo, созданный из класса,
//   // вызываем метод для получения значений данных о пользователе из разметки при открытии попапа
//   const { name, info } = userProfile.getUserInfo(); //деструктурируем полученный объект, чтобы получить данные
//   fieldName.value = name;
//   fieldInfo.value = info;
//   openPopup(popupProfile);
// };

// function saveProfile(evt) {
//   evt.preventDefault();
//   userProfile.setUserInfo(fieldName.value, fieldInfo.value);
//   closePopup(popupProfile);
// };
//
// /*скорпировано*/
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
// };

function closeForm(evt) {
  closePopup(evt.target.closest('.popup'));
};
// /*скорпировано*/
// function closeOverlay(evt) {
//   if (evt.currentTarget === evt.target) {
//     closePopup(evt.target);
//   };
// };
// /*скорпировано*/
// function closePopupByEsc(evt) {
//   if (evt.key === "Escape") {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   };
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
//Для каждого попапа создаем свой экземпляр класса `PopupWithForm`.
const popupAdd = new PopupWithForm('.popup_type_adder', (data) => addCard(cards, data));
popupPhoto.setEventListeners();
popupAdd.setEventListeners();
buttonAdd.addEventListener('click', () => popupAdd.open());




const sectionCard = new Section({
    data: items,
    renderer: (item) => {
        const card = new Card(item, '.card');
        const cardElement = card.generateCard();
        sectionCard.addItem(cardElement);
    }
}, cardListSelector);
