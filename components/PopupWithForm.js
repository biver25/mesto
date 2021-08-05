import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues = () => {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(inputValues) {

    this._formInputs.forEach((field) => {
      field.value = inputValues[field.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}

