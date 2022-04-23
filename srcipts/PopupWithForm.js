/*TODO ## Создайте класс `PopupWithForm`

Создайте класс `PopupWithForm`, который наследует от `Popup`. Этот класс:

- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
- Содержит приватный метод `_getInputValues`, который собирает данные всех полей формы.
- Перезаписывает родительский метод `_setEventListeners`. Метод `_setEventListeners` класса `PopupWithForm` должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
- Перезаписывает родительский метод `close`, так как при закрытии попапа форма должна ещё и сбрасываться.

`PopupWithForm`

Для каждого попапа создавайте свой экземпляр класса `PopupWithForm`.*/

export default class PopupWithForm extends Popup {
    constructor(data, cardSelector) {
        super(cardSelector);
    }

    _getInputValues
    function submitCard(evt) {
        evt.preventDefault();
        const data = {
            name: inputPhotoName.value,
            link: inputPhotoLink.value
        }
        addCard(cards, data);
        cardFormNew.reset();
        closePopup(popupAdd);
    };
}