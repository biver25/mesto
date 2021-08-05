export default class Card {

  static selectors = {
    elementTemplate: '.elements__element',
    elementsImg:'.elements__img',
    elementsCaption: '.elements__caption',
    elementsDelete: '.elements__delete',
    elementsLike: '.elements__like',
    elementsLikeQuantity: '.elements__like-quantity'
  }

  constructor(data, templateSelector, handleCardClick, handleCardDelete, api) {
    this._data = data;
    this._cardText = data.name;
    this._cardPictureLink = data.link;
    this._templateSelector = templateSelector;
    this._handleCardDelete = handleCardDelete;
    this._handleCardClick = handleCardClick;
    this._postOwnerID = data.owner._id;
    this._cardID = data._id;
    this._likeQuantity = data.likes.length;
    this._likeArray = data.likes;
    this._api = api;
    this._myID = data.myID;/*'fd32db01f7dbad05d5a4a896';/*.getServerUserInfo()._id;*/
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content
    .querySelector(Card.selectors.elementTemplate)
    .cloneNode(true);
  }

  _fillContent() {
    this._element = this._getTemplate();
    this._element.querySelector(Card.selectors.elementsImg).src = this._cardPictureLink;
    this._element.querySelector(Card.selectors.elementsCaption).textContent = this._cardText;
    this._element.querySelector(Card.selectors.elementsImg).alt = this._cardText;
  }

  deleteElement(event) {
    event.target.closest(Card.selectors.elementTemplate).remove();
  }

  _addElementsListeners() {
    this._element.querySelector(Card.selectors.elementsLike)
    .addEventListener('click', (event) => {
      this.handleLikeClick(event);
    });

    this._element.querySelector(Card.selectors.elementsImg).
    addEventListener('click', () => this._handleCardClick(this._cardPictureLink, this._cardText));
  }

  /*saveCard() {
    this._fillContent();
    this._addElementsListeners();
    this._setDeleteListeners();
    return this._element;
  }*/

  generateCard() {
    this._fillContent();
    this._checkLikeOwner();
    this._addElementsListeners();
    /*this._setDeleteListeners();*/
    this._checkPostOwner();
    return this._element;
  }

  handleLikeClick(event){
    /*event.target.classList.toggle('elements__like_active');*/
    if (event.target.classList.contains('elements__like_active')) {
      this._api.deleteLikes(this._cardID).then((res) => {
        this._element.querySelector(Card.selectors.elementsLikeQuantity)
        .textContent = res.likes.length;
        event.target.classList.remove('elements__like_active');
      })
      .catch((err) => {
        console.log(err);
      });
    }

    else {
      this._api.putLike(this._cardID).then((res) => {
        this._element.querySelector(Card.selectors.elementsLikeQuantity)
        .textContent = res.likes.length;
        event.target.classList.add('elements__like_active');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  _setDeleteListeners() {
    this._element.querySelector(Card.selectors.elementsDelete)
        .addEventListener('click', (event) => {
          this._handleCardDelete(this, event);
          /*this._deleteElement(event);*/
        });
  }

  _checkPostOwner(){
    if (this._postOwnerID == this._myID) {
        this._setDeleteListeners();
      }
    else {
        this._element.querySelector(Card.selectors.elementsDelete)
        .classList.add('elements__delete_hide');
      }
  }

  _checkLikeOwner(){
    if (this._likeQuantity > 0) {
      this._element.querySelector(Card.selectors.elementsLikeQuantity)
      .textContent = this._likeQuantity;

      this._likeArray.some((item) => {
        if (item._id == this._myID) {
          this._element.querySelector(Card.selectors.elementsLike)
          .classList.add('elements__like_active');
        }
      })
    }
  }
}
