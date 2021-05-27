import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues = () => {
    const inputValues = {};
    const formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
    formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setInputValues(inputValues) {
    const formFields = Array.from(this._form.querySelectorAll('.popup__input'));
    formFields.forEach((field) => {
      field.value = inputValues[field.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}
