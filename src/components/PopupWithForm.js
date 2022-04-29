/* класс `PopupWithForm`, который наследует от `Popup`. Этот класс:
- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.*/

import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
    };

//метод собирает данные всех полей формы
    _getInputValues () {
        const values = {};
        this._inputList.forEach(input => values[input.name] = input.value);
        return values;
    };

//Перезаписывает родительский метод `_setEventListeners`. Метод `_setEventListeners` класса `PopupWithForm`
// добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
            this.close();
        });
    };

//Перезаписывает родительский метод `close`, так как при закрытии попапа форма должна ещё и сбрасываться.
    close() {
        super.close();
        this._form.reset();
    };
};