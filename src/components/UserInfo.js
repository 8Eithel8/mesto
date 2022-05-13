/* Класс `Userabout` отвечает за управление отображением информации о пользователе на странице. Этот класс:

- Принимает в конструктор объект с селекторами двух элементов:
    элемента имени пользователя и элемента информации о себе.*/
export default class UserInfo {
   constructor({name, about, avatar}) {
       this._name = document.querySelector(name);
       this._about = document.querySelector(about);
       this._avatar = document.querySelector(avatar);
   };

    //возвращает объект с данными пользователя.
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
   getUserInfo () {
       return {
            name: this._name.textContent,
            about: this._about.textContent
       };
   };

      //принимает новые данные пользователя и добавляет их на страницу.
   setUserInfo ({name, about}) {
       this._name.textContent = name;
       this._about.textContent = about;
   };

   setAvatarUrl ({avatar}) {
       this._avatar.src = avatar;
   };
 };