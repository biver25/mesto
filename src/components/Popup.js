export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.remove('popup_disabled');
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.add('popup_disabled');
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
      if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      const currentOverlay = event.target;
      if (currentOverlay.classList.contains('popup')) {
        this.close();
      }
    });
    this._popup.querySelector('.popup__exit-btn').addEventListener('click', () => {
      this.close();
    })
  }

}
