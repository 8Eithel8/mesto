//Попап, запрашивающий подтверждение действия

import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');

    };

    open(card) {
        super.open();
        this._card = card;
    }

    //Перезаписывает родительский метод `_setEventListeners`. Метод `_setEventListeners` класса `PopupWithForm`
// добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._card);
            this.close();
        });
    };
}