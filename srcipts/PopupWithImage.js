/* TODO Создайте класс `PopupWithImage`

    Создайте класс `PopupWithImage`, который наследует от `Popup`.
    Этот класс должен перезаписывать родительский метод `open`. В методе `open` класса `PopupWithImage`
    нужно вставлять в попап картинку и атрибут `src` изображения.*/

import Popup from "./Popup.js";
 export default  class PopupWithImage extends Popup {

      open(image, title) {
          this._image = this._popup.querySelector('.popup__photo');
          this._title = this._popup.querySelector('.popup__photo-title');
          this._image.src = image;
          this._title.textContent = title;
          this._image.alt = title;
      };
     // export function openPhoto(image, title) {
     //     imageFull.src = image;
     //     imageFullTitle.textContent = title;
     //     imageFull.alt = title;
     //     openPopup(popupPhoto);
     // };
}