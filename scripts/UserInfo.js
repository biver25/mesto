export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._descriptionField = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userProfile = {};
    userProfile.name = this._nameField.textContent;
    userProfile.description = this._descriptionField.textContent;
    return userProfile;
  }

  setUserInfo(userProfile) {
    this._nameField.textContent = userProfile.name;
    this._descriptionField.textContent = userProfile.description;
  }
}
