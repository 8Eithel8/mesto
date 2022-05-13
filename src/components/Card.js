//TODO Но прежде чем браться за работу с API, исправьте элемент карточки.
// Сделайте так, чтобы иконка удаления была только на созданных вами карточках, так как удалять чужие карточки нельзя.
// После того, как сделаете это, реализуйте функциональность удаления карточки.
// Карточка должна удаляться, если в попапе удаления карточки пользователь нажал «Да».
// Чтобы удалить карточку, отправьте DELETE-запрос:
// Вместо `cardId` в URL нужно подставить параметр `_id` карточки, которую нужно удалить.
// `_id` каждой карточки есть в её JSON:
//
//добавить 2 параметра в конструктор,  на клик по лайку и по корзинке


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
        this.updateLike();
        this._setEventListeners();

        // Добавляем данные
        this._cardImage.src = this.image;
        this._cardImage.alt = this.title;
        this._title.textContent = this.title;


        // возвращаем элемент во внешнюю область
        return this._element;
    };

  // скрытые слушатели
    //TODO изменить под новые задачи
  _toogleLike() {
    this._like.classList.toggle('added');
  };

  removeCard() {
    this._element.remove();
  };

  isLiked () {
      this.likes.find(user => user._id === this._userId)
  }

  _addLike() {
      this._like.classList.add('added');
  }

  _removeLike() {
        this._like.classList.remove('added');
  }

  updateLike () {
      if (this.isLiked()) {
          this._addLike();
      } else {
          this._removeLike();
      }

      this._likeCounter.textContent = this.likes.length;
  }

  //TODO заменить remove и handlercard click на те, что будут в конструкторе
  _setEventListeners() {
    this._like.addEventListener('click', () => this._handleCardLike());
    this._remove.addEventListener('click', () => this._handleCardRemove(this.id));
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  };
};