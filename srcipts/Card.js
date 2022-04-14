import { openPhoto } from './index.js';
export default class Card {
  constructor(data, cardSelector) {   
     this.title = data.name;
     this.image = data.link;
     this._cardSelector = cardSelector; //  записали селектор в приватное поле
  };
    _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
      
    // вернём DOM-элемент карточки
      return cardElement;
    };
  
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    
    this._like = this._element.querySelector('.card__like');
    this._remove = this._element.querySelector('.card__remove');
    
    this._setEventListeners(); // вызовите _setEventListeners
    
    // Добавим данные
    this._cardImage.src = this.image;
    this._cardImage.alt = this.title;
    this._element.querySelector('.card__title').textContent = this.title;
  
    // Вернём элемент наружу
    return this._element;
  };

  // скрытые слушатели
  
  _handleOpenPopup() {
    openPhoto(this.image, this.title);
  };
  
  _toogleLike() {
    this._like.classList.toggle('added');
  };

  _removeCard() {
    this._element.remove();
  };

  _setEventListeners() {
    this._like.addEventListener('click', () => this._toogleLike());
    this._remove.addEventListener('click', () => this._removeCard());
    this._cardImage.addEventListener('click', () => this._handleOpenPopup());
  };
};