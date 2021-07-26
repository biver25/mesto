import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__img');
    this._popupCaption = this._popup.querySelector('.popup__caption');
    //this._popup = document.querySelector(popupSelector);
  }

  open(image, caption) {
    this._popupImage.src = image;
    this._popupImage.alt = caption;
    this._popupCaption.textContent = caption;
    super.open();
  }

}
