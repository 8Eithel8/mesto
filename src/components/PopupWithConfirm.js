//TODO Удаление чего-то, как правило, безвозвратно.
// Поэтому перед этим действием стоит спросить пользователя, уверен ли он, что хочет удалить карточку.
// Для этого сделайте новый попап. Он должен открывать по клику на иконку удаления:

import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');

    };

    //Перезаписывает родительский метод `_setEventListeners`. Метод `_setEventListeners` класса `PopupWithForm`
// добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
            this.close();
        });
    };
}