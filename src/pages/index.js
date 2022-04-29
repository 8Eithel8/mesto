import './index.css';
import { initialCards, settingsValidation } from '../Utils/constants.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from '../components/FormValidator.js';

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const fieldName = document.querySelector('#name');
const fieldInfo = document.querySelector('#info');
const cardTemplate = '#card-template';

const profileForm = document
    .querySelector('.popup_type_profile')
    .querySelector('.popup__form');
const cardFormNew  = document
    .querySelector('.popup_type_adder')
    .querySelector('.popup__form');

// создаем экземпляра валидаторв для каждой формы и проверяем
const profileFormValidator = new FormValidator(settingsValidation, profileForm);
const adderFormValidator = new FormValidator(settingsValidation, cardFormNew);


const userProfile = new UserInfo({name: '.profile__title', info: '.profile__subtitle'});

function addCard(data) {
    const card = new Card(data, cardTemplate, () => handleOpenPopup(card));
    sectionCard.addItem(card.generateCard());
};

function editProfile() {
    //объект userInfo, созданный из класса,
    // вызываем метод для получения значений данных о пользователе из разметки при открытии попапа
    const { name, info } = userProfile.getUserInfo(); //деструктурируем полученный объект, чтобы получить данные
    fieldName.value = name;
    fieldInfo.value = info;
    popupProfile.open();
};

function saveProfile() {
    userProfile.setUserInfo(fieldName.value, fieldInfo.value);
};

function  handleOpenPopup({image, title}) {
    popupPhoto.open(image, title);
};

const popupPhoto = new PopupWithImage('.popup_type_photo');
const popupAdd = new PopupWithForm('.popup_type_adder', (data) => addCard(data));
const popupProfile= new PopupWithForm('.popup_type_profile', () => saveProfile());

const sectionCard = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardTemplate, () => handleOpenPopup(card));
        const cardElement = card.generateCard();
        sectionCard.addItem(cardElement);
    }
}, '.cards');

profileFormValidator.enableValidation();
adderFormValidator.enableValidation();

popupPhoto.setEventListeners();
popupAdd.setEventListeners();
popupProfile.setEventListeners();
buttonAdd.addEventListener('click', () => popupAdd.open());
buttonEdit.addEventListener('click', () => editProfile());

sectionCard.renderAll();
