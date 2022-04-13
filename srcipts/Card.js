export default class Card {
  constructor(data, cardSelector) {    // теперь здесь один параметр — селектор? что нужно вписать в родительский  класс
     this._title = data.name;
     this._image = data.link;
     this._cardSelector = cardSelector//  записали селектор в приватное поле
  }
    _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
      
    // вернём DOM-элемент карточки
      return cardElement;
    }
  
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавим данные
    let cardImage = this._element.querySelector('.card__image');
    
    this._like = this._element.querySelector('.card__like');
    this._remove = this._element.querySelector('.card__remove');
    
    this._setEventListeners(); // вызовите _setEventListeners
    cardImage.src = this._image;
    cardImage.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
  
    // Вернём элемент наружу
    return this._element;
  }

  // ТУТ написать скрытые слушатели переписать под свои классы и свою логику
  
  _handleOpenPopup() {
    popupImage.src = this._image;
    popElement.classList.add('popup_is-opened');
  } 
  
  _handleClosePopup() {
    popupImage.src = '';
     popElement.classList.remove('popup_is-opened');
  }
  
  _toogleLike() {
    this._like.classList.toggle('added');
  };  

  _removeCard() {
    this._element.remove();
  };


  _setEventListeners() {
    this._like.addEventListener('click', () => this._toogleLike());
    this._remove.addEventListener('click', () => this._removeCard());
  }


}