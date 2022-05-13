import './index.css';
import { settingsValidation } from '../Utils/constants.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const fieldName = document.querySelector('#name');
const fieldAbout = document.querySelector('#about');
const profileAvatar = document.querySelector('.profile-wrapper-avatar');
const cardTemplate = '#card-template';

let userId;

const profileForm = document
    .querySelector('.popup_type_profile')
    .querySelector('.popup__form');
const cardFormNew  = document
    .querySelector('.popup_type_adder')
    .querySelector('.popup__form');
const avatarFormNew  = document
    .querySelector('.popup_type_editAvatar')
    .querySelector('.popup__form');

// создаем экземпляры классов
const profileFormValidator = new FormValidator(settingsValidation, profileForm);

const adderFormValidator = new FormValidator(settingsValidation, cardFormNew);

const userProfile = new UserInfo({
    name: '.profile__title',
    about: '.profile__subtitle',
    avatar: '.profile__avatar'
});

const popupConfirm = new PopupWithConfirmation('.popup_type_confirm', (card) => {
    api.removeCard(card.id)
        .then(() => card.removeCard())
        .catch(errorHandler);
});

const  api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '25211fd8-3e01-4ad9-a1d8-b38f3a1a11d7',
        'Content-Type': 'application/json'
    }
});
const popupPhoto = new PopupWithImage('.popup_type_photo');

const popupAvatar = new PopupWithForm('.popup_type_editAvatar', (data) => saveAvatar(data));

const avatarFormValidator = new FormValidator(settingsValidation, avatarFormNew);

const sectionCard = new Section('.cards');

// в параметр data прилетает объект из PopupWithForm
const popupAdd = new PopupWithForm('.popup_type_adder', (data) => {
    api.postNewCard(data)
        .then(res => {
            addCard(res, userId)
        })
        .catch(errorHandler)
        .finally(() => popupAdd.close())
});

const popupProfile = new PopupWithForm('.popup_type_profile', (data) => saveProfile(data));



function createCard(data, userId) {
    const card = new Card(
        data,
        userId,
        cardTemplate,
        () => handleOpenPopup(card),
        () => popupConfirm.open(card),
        () => {
            if (card.isLiked()) {
                api.removeLike(card.id)
                    .then((res) => card.setlikes(res.likes))
                    .catch(errorHandler);
            } else {
                api.addLike(card.id)
                    .then((res) => card.setlikes(res.likes))
                    .catch(errorHandler);
            }
        }
    );
    return card.generateCard();
}

function addCard(data, userId) {
    sectionCard.addItem(createCard(data, userId));
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
//выводит текст ошибки на консоль в случае получения от сервера ошибки (catch)
function errorHandler(err) {
    console.log('Error: ', err)
};

function saveProfile(data) {
    api.editUserInfo(data)
        .then(() => userProfile.setUserInfo(data))
        .catch(errorHandler)
        .finally(() => popupProfile.close())
};

function handleOpenPopupAvatar() {
    avatarFormValidator.reset();
    popupAvatar.open();
}
//сохраняем аватар
function saveAvatar(data) {
    api.updateAvatar(data)
        .then(() => userProfile.setAvatarUrl(data))
        .catch(errorHandler)
        .finally(() => popupAvatar.close())
}

function  handleOpenPopup({image, title}) {
    popupPhoto.open(image, title);

};
function handleOpenPopupAdd() {
    adderFormValidator.reset();
    popupAdd.open();
}

profileFormValidator.enableValidation();
adderFormValidator.enableValidation();
avatarFormValidator.enableValidation();

popupPhoto.setEventListeners();
popupAdd.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();

buttonAdd.addEventListener('click', () => handleOpenPopupAdd());
buttonEdit.addEventListener('click', () => editProfile());
profileAvatar.addEventListener('click', () => handleOpenPopupAvatar());

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userInfo]) => {
        userId = userInfo._id;
        userProfile.setUserInfo(userInfo);
        userProfile.setAvatarUrl(userInfo);
        cards.forEach((card) => addCard(card, userInfo._id))
    });
