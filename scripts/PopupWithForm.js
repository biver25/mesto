import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHendler) {
    super(popupSelector);
    this._submitHendler = submitHendler();
  }

  _getInputValues() {
    const inputValues = {};
    const formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
    formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }

  setEventListeners() {

    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', () => {
    this._submitHendler(this._getInputValues())
    })

  }

  close() {
    this.form.reset();
    super.close();
  }
}
