export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getServerUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  updateServerUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._handleResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._handleResponse);
  }

  putLike(cardID){
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  deleteCard(cardID){
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  deleteLikes(cardID){
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  postNewCard(data){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._handleResponse);
  }

  getComletedPromises() {
    return Promise.all([this.getServerUserInfo(), this.getInitialCards()])
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

}



