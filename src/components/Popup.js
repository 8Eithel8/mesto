/* класс `Popup` отвечает за открытие и закрытие попапа. Этот класс:
   - Принимает в конструктор единственный параметр — селектор попапа.
  */

export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector); //  записали селектор в приватное поле
        this._closeButton = this._popup.querySelector('.popup__button_close');
        this._handleEscClose.bind(this);
    };

    //публичные методы `open` и `close`, которые отвечают за открытие и закрытие попапа
     open() {
         this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    // приватный метод закрывает попап по клику на оверлей.
    _closeOverlay(evt) {
        if (evt.currentTarget === evt.target) {
            this.close();
        }
    };

// приватный метод `_handleEscClose`, который содержит логику закрытия попапа клавишей Esc.
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
           this.close();
        }
    };

   //публичный метод `_setEventListeners`, который добавляет слушатель клика иконке закрытия попапа
    setEventListeners() {
       this._closeButton.addEventListener('click', () => this.close());
       this._popup.addEventListener('click', (evt) => this._closeOverlay(evt));
    };
};

