import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__save-btn');
    this._handleCardDelete;
  }

  setNewHandler(handleCardDelete) {
      this._handleCardDelete = handleCardDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleCardDelete();
    })
  }
}
