/*TODO ## Создайте класс `Popup`

   Создайте класс `Popup`, который отвечает за открытие и закрытие попапа. Этот класс:
   - Принимает в конструктор единственный параметр — селектор попапа.
   - Содержит публичные методы `open` и `close`, которые отвечают за открытие и закрытие попапа.
   - Содержит приватный метод `_handleEscClose`, который содержит логику закрытия попапа клавишей Esc.
   - Содержит публичный метод `_setEventListeners`, который добавляет слушатель клика иконке закрытия попапа*/

export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector); //  записали селектор в приватное поле
    };

     open() {
         this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _closeOverlay(evt) {
        if (evt.currentTarget === evt.target) {
            this.close();
        };
    };


   _handleEscClose(evt) {
        if (evt.key === "Escape") {
           this.close();
        };
   };

   setEventListeners() {

       /*this._closeButtons что делать с этим ?  эта кнопка закрывает попап, но ее нет в параметрах*/
       const closeButton = this._popup.querySelector('.popup__button_close');

       closeButton.addEventListener('click', () => this.close());
       this._popup.addEventListener('click', (evt) => this._closeOverlay(evt));
       // document.addEventListener('keydown', () => this._handleEscClose);
   };


}

/*непонятно чего они хотят функция openpopup вызывается не на слушателях, а в других функциях, специфичных для октрытия каждого попапа */