export default class FormValidator {
  constructor(config, popupSelector) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._popupSelector = popupSelector;
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return (!inputElement.validity.valid);
    });
  };

  _toggleButtonState() {
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add(this._inactiveButtonClass);
    }
    else {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(this._inactiveButtonClass);
    }
  };

  _checkFormValidity(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
      this._checkFormValidity(inputElement);
      });
    });
  }

  _getFormElement() {
    this._currentPopup = document.querySelector(this._popupSelector);
    this._formElement = this._currentPopup.querySelector(this._formSelector);

  }

  enableValidation() {
    this._getFormElement();
    this._setEventListeners();
  }

  resetValidity() {
    this._inputList.forEach((currentInputElement) => {
      this._hideInputError(currentInputElement);
      this._toggleButtonState();
      });
    };
}
