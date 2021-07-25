export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._descriptionField = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {name: this._nameField.textContent,
      description: this._descriptionField.textContent};
  }

  setUserInfo(userProfile) {
    this._nameField.textContent = userProfile.name;
    this._descriptionField.textContent = userProfile.description;
  }
}
