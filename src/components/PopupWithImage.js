/*  класс `PopupWithImage`, который наследует от `Popup`.
    Этот класс должен перезаписывать родительский метод `open`. В методе `open` класса `PopupWithImage`
    нужно вставлять в попап картинку и атрибут `src` изображения.*/

import Popup from "./Popup.js";
export default  class PopupWithImage extends Popup {
     constructor(selector) {
         super (selector);
         this._image = this._popup.querySelector('.popup__photo');
         this._title = this._popup.querySelector('.popup__photo-title');
     }
//переопределяем метод open
      open(image, title) {
          this._image.src = image;
          this._title.textContent = title;
          this._image.alt = title;
          super.open(); //вызываем  метод из родительского класса
      };
};