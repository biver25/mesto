export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._descriptionField = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameField.textContent,
      description: this._descriptionField.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo(userProfile) {
    this._nameField.textContent = userProfile.name;
    this._descriptionField.textContent = userProfile.description;
  }

  setUserAvatar(userProfile) {
    this._avatar.src = userProfile.avatar;
  }
}
