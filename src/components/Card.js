export default class Card {
    constructor(data, userId, cardSelector, handleCardClick, handleCardRemove, handleCardLike) {
       this.title = data.name;
       this.image = data.link;
       this.likes = data.likes;
       this._ownerId = data.owner._id;
       this._userId = userId;
       this.id = data._id;
       this._cardSelector = cardSelector; //  записали селектор в приватное поле
       this._handleCardClick = handleCardClick;
       this._handleCardRemove = handleCardRemove;
       this._handleCardLike = handleCardLike;
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
        this._title = this._element.querySelector('.card__title');
        this._like = this._element.querySelector('.card__like');
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._remove = this._element.querySelector('.card__remove');
        if (this._ownerId !== this._userId) {
            this._remove.style.display = "none";
        }
        this._updateLikes();
        this._setEventListeners();

        // Добавляем данные
        this._cardImage.src = this.image;
        this._cardImage.alt = this.title;
        this._title.textContent = this.title;


        // возвращаем элемент во внешнюю область
        return this._element;
    };

  // удаление карточки
  removeCard() {
    this._element.remove();
    this._element = null;
  };

  //ищем фотки  пролайканные пользователем
  isLiked () {
      return this.likes.find(user => user._id === this._userId);
  }

  //перечистывам лайки
  _updateLikes () {
      if (this.isLiked()) {
          this._like.classList.add('added');
      } else {
          this._like.classList.remove('added');
      }
      this._likeCounter.textContent = this.likes.length;
  }

  //фиксируем лайки после пересчета
  setlikes (likes) {
      this.likes = likes;
      this._updateLikes();
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => this._handleCardLike());
    this._remove.addEventListener('click', () => this._handleCardRemove(this.id));
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  };
};