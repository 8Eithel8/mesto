import './index.css';
import { initialCards, settingsValidation } from '../Utils/constants.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const fieldName = document.querySelector('#name');
const fieldAbout = document.querySelector('#about');


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


const userProfile = new UserInfo({
    name: '.profile__title',
    about: '.profile__subtitle',
    avatar: '.profile__avatar'
});

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
    const { name, about } = userProfile.getUserInfo(); //деструктурируем полученный объект, чтобы получить данные

    fieldName.value = name;
    fieldAbout.value = about;
    popupProfile.open();
};

function errorHandler(err) {
    console.log('Error: ', err)
};

function saveProfile(data) {
    api.editUserInfo(data)
        .then(() => userProfile.setUserInfo(data))
        .catch(errorHandler);
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
const  api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '25211fd8-3e01-4ad9-a1d8-b38f3a1a11d7',
        'Content-Type': 'application/json'
    }
});

console.log(api.getInitialCards());
console.log(api.getUserInfo());

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
const fieldAvatarLink = document.querySelector('#avatar');
const popupAvatar = new PopupWithForm('.popup_type_editAvatar', (data) => saveAvatar(data));

const avatarFormNew  = document
    .querySelector('.popup_type_editAvatar')
    .querySelector('.popup__form');

const avatarFormValidator = new FormValidator(settingsValidation, avatarFormNew);
avatarFormValidator.enableValidation();


function handleOpenPopupAvatar() {
    avatarFormValidator.reset();
    popupAvatar.open();
}
//сохраняем аватар
function saveAvatar(data) {
    api.updateAvatar(data)
        .then(() => userProfile.setAvatarUrl(data))
        .catch(errorHandler);
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

//берем данные с сервера и заталкиваем их в разметку через экземпляр класса UserInfo
api.getUserInfo() //возвращает ответ ввиде Response, далее даем инструкцию ввиде then, в случае удачи
    .then(function (userInfo){
    userProfile.setUserInfo(userInfo);
    userProfile.setAvatarUrl(userInfo);
});