export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._aboutField = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameField.textContent,
      about: this._aboutField.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo(userProfile) {
    this._nameField.textContent = userProfile.name;
    this._aboutField.textContent = userProfile.about;
  }

  setUserAvatar(userProfile) {
    this._avatar.src = userProfile.avatar;
  }
}
