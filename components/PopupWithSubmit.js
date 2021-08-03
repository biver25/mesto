import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__save-btn')
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCardDelete;
  }

  setEventListeners(handleCardDelete) {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleCardDelete = handleCardDelete;
      this._handleCardDelete();
      this.close();
    })
  }
}
