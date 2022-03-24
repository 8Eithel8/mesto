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
const popupProfile = document.querySelector('.popup_type_profile');
const buttonAdd = document.querySelector('.profile__button_type_add');
const popupAdd = document.querySelector('.popup_type_adder');
const closeButtons = document.querySelectorAll('.popup__button_type_close');
const fieldName = document.querySelector('#name');
const fieldInfo = document.querySelector('#info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = popupProfile.querySelector('.popup__form');
const сardFormNew = popupAdd.querySelector('.popup__form');
const cards = document.querySelector('.cards');
const popupPhoto = document.querySelector('.popup_type_photo');
const cardTemplate = document.querySelector('#card-template').content;
const inputPhotoName = document.querySelector('#photo-name');
const inputPhotoLink = document.querySelector('#photo-link');
const imageFull = document.querySelector('.popup__photo');
const imageFullTitle = document.querySelector('.popup__photo-title');
const popups = document.querySelectorAll('.popup');

function createCard(linkValue, titleValue) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  
  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardItem.querySelector('.card__title').textContent = titleValue;

  cardItem.querySelector('.card__like').addEventListener('click', likeCard);
  cardItem.querySelector('.card__remove').addEventListener('click', removeCard);
  cardImage.addEventListener('click', openPhoto);
  
  return cardItem;
};

function addCard(container, linkValue, titleValue) {
  container.prepend(createCard(linkValue, titleValue));
};

function likeCard(evt) {
  evt.target.classList.toggle('added');
};

function removeCard(evt) {
  evt.target.closest('.card').remove();
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function editProfile() {
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function closeForm(evt) {
  closePopup(evt.target.closest('.popup'));
};

function closeOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
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
  inputPhotoName.value = '';
  inputPhotoLink.value = '';
  closePopup(popupAdd);
}

popups.forEach(popup => popup.addEventListener('click', closeOverlay));
document.addEventListener('keydown', function(evt) {
   if (evt.key === "Escape") {
    popups.forEach(popup => closePopup(popup));
  };
});

closeButtons.forEach(button => button.addEventListener('click', closeForm));

buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
profileForm.addEventListener('submit', saveProfile);
сardFormNew.addEventListener('submit', submitCard); 

initialCards.forEach(item => addCard(cards, item.link, item.name));


