export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._descriptionField = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userProfile = {};
    const name = this._nameField.value;
    const description = this._descriptionField.value;
    userProfile[name] = name;
    userProfile[description] = description;
    return userProfile;
  }

  setUserInfo({userProfile}) {
    this._nameField.textContent = userProfile.name;
    this._descriptionField.textContent = userProfile.description;
  }
}
