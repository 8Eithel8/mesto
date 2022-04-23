/*TODO ## Преобразуйте класс `Card`

Свяжите класс `Card` c попапом. Сделайте так, чтобы Card принимал в конструктор функцию `handleCardClick`.
Эта функция должна открывать попап с картинкой при клике на карточку.*/

import { openPhoto } from './index.js';
export default class Card {
  constructor(data, cardSelector) {   
     this.title = data.name;
     this.image = data.link;
     this._cardSelector = cardSelector; //  записали селектор в приватное поле
  };
  _getTemplate() {
  // получаем разметку из HTML, клонируем элемент
  // и возвращаем DOM-элемент карточки
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  };
  
  generateCard() {
    // сохраняем разметку в приватное поле _element  
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    
    this._like = this._element.querySelector('.card__like');
    this._remove = this._element.querySelector('.card__remove');
    
    this._setEventListeners(); 
    
    // Добавляем данные
    this._cardImage.src = this.image;
    this._cardImage.alt = this.title;
    this._element.querySelector('.card__title').textContent = this.title;
  
    // возвращаем элемент во внешнюю область
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