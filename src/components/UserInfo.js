/*TODO ## Создайте класс `UserInfo`

Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. Этот класс:

- Принимает в конструктор объект с селекторами двух элементов:
    элемента имени пользователя и элемента информации о себе.
- Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя.
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
- Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и
    добавляет их на страницу.*/

export default class UserInfo {
  constructor({name, info}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }

    //возвращает объект с данными пользователя.
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo () {
   return {
    name: this._name.textContent,
    info: this._info.textContent
   }
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo (nameValue, infoValue) {
   this._name.textContent = nameValue;
   this._info.textContent = infoValue;
  }
 }