
export default class FormValidator {

  constructor(settings, form) {
    this._formElement = form;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  };

  // нашли поля  икнопку  формы
  enableValidation () {
     this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
     this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
     this._setEventListeners();
  };

  // проверяем на валидность форму
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // переключаем доступность кнопки в зависимости от результата валидации
  _toggleButtonState () {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', false);
    };
  };

  // ищем элемент с ошибкой
  _getErrorElement (id) {
    return this._formElement.querySelector(`.${id}-error`);
  };


  // показаываем текст ошибки
  _showInputError (inputElement) {
    const errorElement = this._getErrorElement(inputElement.id);
  
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  // скрываем текст ошибки
  _hideInputError (inputElement) {
    const errorElement = this._getErrorElement(inputElement.id);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверяем конкретное поле на валидность, показываем ошибку или скрываем
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  };

  // уставнавливаем слушатели на поля и переключаем кнопку
  _setEventListeners () {
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
};