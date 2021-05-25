import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //this._popup = document.querySelector(popupSelector);
  }

  open(image, caption) {
    this._popup.querySelector('.popup__img').src = image;
    this._popup.querySelector('.popup__img').alt = caption;
    this._popup.querySelector('.popup__caption').textContent = caption;
    super.open();
  }

}
