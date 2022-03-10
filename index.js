const initialCards = [
  {
   name: 'Косинские поля',
   link: './images/Kosinskie_polya.jpg'
 },
 {
   name: 'Лосиный остров',
   link: './images/Losinka.jpg'
 },
 {
   name: 'Московская область. Восток',
   link: './images/Mos_obl.jpg'
 },
 {
   name: 'Тверская область. Река Сестра',
   link: './images/Tver_obl.jpg'
 },
 {
   name: 'Святое озеро',
   link: './images/Svyatoe_ozero.jpg'
 },
 {
   name: 'Черное озеро',
   link: './images/Chernoe_ozero.jpg'
 }
];

const buttonEdit = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const buttonAdd = document.querySelector('.profile__button_type_add');
const popupAdd = document.querySelector('.popup_type_adder');
const buttonsClose = document.querySelectorAll('.popup__button_type_close');
const fieldName = document.querySelector('#name');
const fieldInfo = document.querySelector('#info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const form = document.querySelector('.popup__form');
const сardFormNew = document.querySelector('#new-card-form');
const cards = document.querySelector('.cards');
const popupPhoto = document.querySelector('.popup_type_photo');
const cardTemplate = document.querySelector('#card-template').content;
const inputPhotoName = document.querySelector('#photo-name');
const inputPhotoLink = document.querySelector('#photo-link');

function addCard(linkValue, titleValue) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  cardItem.querySelector('.card__image').src = linkValue;
  cardItem.querySelector('.card__title').textContent = titleValue;
  cardItem.querySelector('.card__image').alt = titleValue;
  cardItem.querySelector('.card__like').addEventListener('click', likeCard);
  cardItem.querySelector('.card__remove').addEventListener('click', removeCard);
  cardItem.querySelector('.card__image').addEventListener('click', openPhoto);
  cards.prepend(cardItem);
};

function likeCard(evt) {
  evt.target.classList.toggle('added');
};

function removeCard(evt) {
  evt.target.parentNode.remove();
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function editProfile() {
  openPopup(popup);
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubtitle.textContent;
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function closeForm(evt) {
  closePopup(evt.target.closest('.popup'));
};

function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = fieldName.value;
  profileSubtitle.textContent = fieldInfo.value;
  closePopup(popup);
};

function openPhoto(evt) {
  openPopup(popupPhoto);
  document.querySelector('.popup__photo').src = evt.target.src;
  document.querySelector('.popup__photo-title').textContent = evt.target.parentNode.querySelector('.card__title').textContent;
};

buttonsClose.forEach( button => button.addEventListener('click', closeForm));


buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
form.addEventListener('submit', saveProfile);

сardFormNew.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let image = inputPhotoLink;
  let title = inputPhotoName; 
  addCard(image.value, title.value);
  title.value = '';
  image.value = '';
  closePopup(popupAdd);
}); 

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].link, initialCards[i].name)
};