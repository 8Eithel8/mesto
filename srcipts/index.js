import { initialCards } from './initialCards.js';
import Card from './Card.js';

const buttonEdit = document.querySelector('.profile__button_type_edit');
const popupProfile = document.querySelector('.popup_type_profile');
const buttonAdd = document.querySelector('.profile__button_type_add');
const popupAdd = document.querySelector('.popup_type_adder');
const buttonSave = popupAdd.querySelector('.popup__button_submit');
const closeButtons = document.querySelectorAll('.popup__button_close');
const fieldName = document.querySelector('#name');
const fieldInfo = document.querySelector('#info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = popupProfile.querySelector('.popup__form');
const сardFormNew = popupAdd.querySelector('.popup__form');
const cards = document.querySelector('.cards');
const popupPhoto = document.querySelector('.popup_type_photo');
// const cardTemplate = document.querySelector('#card-template');
const inputPhotoName = document.querySelector('#photo-name');
const inputPhotoLink = document.querySelector('#photo-link');
const imageFull = document.querySelector('.popup__photo');
const imageFullTitle = document.querySelector('.popup__photo-title');
const popups = document.querySelectorAll('.popup');

function addCard(container, data) {
const card = new Card(data, '#card-template');
  container.prepend(card.generateCard());
};



function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function editProfile() {
  resetErrorMessages(popupProfile);
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function closeForm(evt) {
  closePopup(evt.target.closest('.popup'));
};

function closeOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  };
};

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = fieldName.value;
  profileSubtitle.textContent = fieldInfo.value;
  closePopup(popupProfile);
};

function openPhoto(evt) {
  const title = evt.target.alt;
  imageFull.src = evt.target.src;
  imageFullTitle.textContent = title;
  imageFull.alt = title;
  openPopup(popupPhoto);
};

function submitCard(evt) {
  evt.preventDefault();
  addCard(cards, inputPhotoLink.value, inputPhotoName.value);
  сardFormNew.reset();
  closePopup(popupAdd);
}

function resetErrorMessages(popup) {
  const errorsMessage = popup.querySelectorAll('.popup__error');
  const errorsFields = popup.querySelectorAll('.popup__field');
  errorsMessage.forEach(error => error.classList.remove('popup__error_visible'));
  errorsFields.forEach(error => error.classList.remove('popup__field_error'));
} 

function openPopupAdd() {
  сardFormNew.reset();
  buttonSave.setAttribute('disabled', true);
  buttonSave.classList.add('popup__button_inactive');
  resetErrorMessages(popupAdd);
  openPopup(popupAdd);
}

popups.forEach(popup => popup.addEventListener('click', closeOverlay));
document.addEventListener('keydown', closePopupByEsc);

closeButtons.forEach(button => button.addEventListener('click', closeForm));

buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', () => openPopupAdd());
profileForm.addEventListener('submit', saveProfile);
сardFormNew.addEventListener('submit', submitCard);

// initialCards.forEach(item => addCard(cards, item.link, item.name));

initialCards.forEach(item => addCard(cards, item));


/*класс*/
// 3  попапа,  1 темплейт



 




  
  //   messageList.forEach((item) => {
  //      // Создадим экземпляр карточки
  //     const card = new Card(item); // передаём объект аргументом
  //     // Создаём карточку и возвращаем наружу
  //     const cardElement = card.generateCard();
  //       // Добавляем в DOM

  //     document.querySelector('.cards').append(cardElement);

  // }); 

   