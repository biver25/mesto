export default class Card {

  static selectors = {
    elementTemplate: '#elementTemplate',
    elementsImg:'.elements__img',
    elementsCaption: '.elements__caption',
    elementsDelete: '.elements__delete',
    elementsLike: '.elements__like'
  }

  constructor(data, templateSelector, handleCardClick) {
    this._cardText = data.name;
    this._cardPictureLink = data.link;
    this._templateSelector = templateSelector;
    this.__handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(Card.selectors.elementTemplate).content
    .querySelector(this._templateSelector)
    .cloneNode(true);
  }

  _fillContent() {
    this._element = this._getTemplate();
    this._element.querySelector(Card.selectors.elementsImg).src = this._cardPictureLink;
    this._element.querySelector(Card.selectors.elementsCaption).textContent = this._cardText;
    this._element.querySelector(Card.selectors.elementsImg).alt = this._cardText;
  }

  _deleteElement(event) {
    event.target.closest(this._templateSelector).remove();
  }

  _addElementsListeners() {
    this._element.querySelector(Card.selectors.elementsDelete)
    .addEventListener('click', (event) => this._deleteElement(event));

    this._element.querySelector(Card.selectors.elementsLike)
    .addEventListener('click', (event) => {
      event.target.classList.toggle('elements__like_active');
    });

    this._element.querySelector(Card.selectors.elementsImg).
    addEventListener('click', () => this.__handleCardClick(this._cardPictureLink, this._cardText));
  }

  generateCard() {
    this._fillContent();
    this._addElementsListeners();
    return this._element;
  }
}
