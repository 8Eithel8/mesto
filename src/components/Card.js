//TODO Но прежде чем браться за работу с API, исправьте элемент карточки.
// Сделайте так, чтобы иконка удаления была только на созданных вами карточках, так как удалять чужие карточки нельзя.
// После того, как сделаете это, реализуйте функциональность удаления карточки.
// Карточка должна удаляться, если в попапе удаления карточки пользователь нажал «Да».
// Чтобы удалить карточку, отправьте DELETE-запрос:
// Вместо `cardId` в URL нужно подставить параметр `_id` карточки, которую нужно удалить.
// `_id` каждой карточки есть в её JSON:
//
//


export default class Card {
    constructor(data, cardSelector, handleCardClick) {
       this.title = data.name;
       this.image = data.link;
       this._cardSelector = cardSelector; //  записали селектор в приватное поле
       this._handleCardClick = handleCardClick;
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
  _toogleLike() {
    this._like.classList.toggle('added');
  };

  _removeCard() {
    this._element.remove();
  };

  _setEventListeners() {
    this._like.addEventListener('click', () => this._toogleLike());
    this._remove.addEventListener('click', () => this._removeCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  };
};