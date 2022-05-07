//TODO Удаление чего-то, как правило, безвозвратно.
// Поэтому перед этим действием стоит спросить пользователя, уверен ли он, что хочет удалить карточку.
// Для этого сделайте новый попап. Он должен открывать по клику на иконку удаления:

import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
    };