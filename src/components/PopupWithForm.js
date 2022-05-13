/* класс `PopupWithForm`, который наследует от `Popup`. Этот класс:
- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.*/

import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._buttonSubmit = this._form.querySelector('.popup__button_submit');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
    };

    //метод собирает данные всех полей формы
    _getInputValues () {
        const values = {};
        this._inputList.forEach(input => values[input.name] = input.value);
        return values;
    };

    //метод переключает текст на кнопке при загрузке отправке данных на сервер
    _toogleSubmitText (isloading) {
        if (isloading) {
            this._buttonSubmit.textContent = 'Сохранение...';
        } else {
            this._buttonSubmit.textContent = 'Сохранить';
        }
    }

    //Перезаписывает родительский метод `_setEventListeners`. Метод `_setEventListeners` класса `PopupWithForm`
    // добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._toogleSubmitText(true);
            this._handleSubmit(this._getInputValues());
        });
    };

    //Перезаписывает родительский метод `close`, так как при закрытии попапа форма должна ещё и сбрасываться.
    close() {
        super.close();
        this._form.reset();
        this._toogleSubmitText(false);
    };
};