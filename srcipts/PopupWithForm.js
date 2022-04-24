/*TODO ## Создайте класс `PopupWithForm`

Создайте класс `PopupWithForm`, который наследует от `Popup`. Этот класс:

- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
- Содержит приватный метод `_getInputValues`, который собирает данные всех полей формы.
- Перезаписывает родительский метод `_setEventListeners`. Метод `_setEventListeners` класса `PopupWithForm`
    должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
- Перезаписывает родительский метод `close`, так как при закрытии попапа форма должна ещё и сбрасываться.

`PopupWithForm`

Для каждого попапа создавайте свой экземпляр класса `PopupWithForm`.*/
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
    }

    _getInputValues () {
        const values = {};
        this._inputList.forEach(input => values[input.name] = input.value);
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
            this.close();
        })
    }
}