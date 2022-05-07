import './index.css';
import { initialCards, settingsValidation } from '../Utils/constants.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirm from "../components/PopupWithConfirm.js";

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

//TODO добавить хендлеры для обработки клина на  лайк и корзинку
function createCard(data) {
    const card = new Card(data, cardTemplate, () => handleOpenPopup(card));
    return card.generateCard();
}

function addCard(data) {
    sectionCard.addItem(createCard(data));
};

function editProfile() {
    //объект userInfo, созданный из класса,
    // вызываем метод для получения значений данных о пользователе из разметки при открытии попапа
    profileFormValidator.reset();
    const { name, info } = userProfile.getUserInfo(); //деструктурируем полученный объект, чтобы получить данные
    fieldName.value = name;
    fieldInfo.value = info;
    popupProfile.open();
};

function saveProfile(data) {
    userProfile.setUserInfo(data);
};

function  handleOpenPopup({image, title}) {
    popupPhoto.open(image, title);
};

function handleOpenPopupAdd() {
    adderFormValidator.reset();
    popupAdd.open();
}


const popupPhoto = new PopupWithImage('.popup_type_photo');
const popupAdd = new PopupWithForm('.popup_type_adder', (data) => addCard(data));
const popupProfile = new PopupWithForm('.popup_type_profile', (data) => saveProfile(data));

const sectionCard = new Section(
    {
        items: initialCards,
        renderer: addCard
    },
    '.cards'
);

profileFormValidator.enableValidation();
adderFormValidator.enableValidation();

popupPhoto.setEventListeners();
popupAdd.setEventListeners();
popupProfile.setEventListeners();

buttonAdd.addEventListener('click', () => handleOpenPopupAdd());
buttonEdit.addEventListener('click', () => editProfile());

sectionCard.renderAll();


//работает форма с аватаркой
const profileAvatar = document.querySelector('.profile-wrapper-avatar');
const profileAvatarField = document.querySelector('.profile__avatar');
const fieldAvatarLink = document.querySelector('#avatar-link');
const popupAvatar = new PopupWithForm('.popup_type_editAvatar', (data) => saveAvatar());

const avatarFormNew  = document
    .querySelector('.popup_type_editAvatar')
    .querySelector('.popup__form');

const avatarFormValidator = new FormValidator(settingsValidation, avatarFormNew);
avatarFormValidator.enableValidation();


function handleOpenPopupAvatar() {
    avatarFormValidator.reset();
    popupAvatar.open();
}

function saveAvatar() {
    profileAvatarField.src = fieldAvatarLink.value;
}

popupAvatar.setEventListeners();
profileAvatar.addEventListener('click', () => handleOpenPopupAvatar());

//работает всплывает попап удаления
const buttonRemove = document.querySelector('.card__remove');
const popupConfirm = new PopupWithConfirm('.popup_type_confirm', (data) => data);

function handleOpenPopupConfirm() {
    popupConfirm.open();
}
//
// function changeTextConfirm() {
//     buttonRemove.textContent = 'Сохранение...';
// }

popupConfirm.setEventListeners();
buttonRemove.addEventListener('click', () => handleOpenPopupConfirm());