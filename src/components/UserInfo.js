export default class UserInfo {
  constructor({ nameSelector, jobSelector, userAvatar }) {
    this._nameElement = nameSelector;
    this._jobElement = jobSelector;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
      avatar: this.getAvatar(),
    };
    return userData;
  }

  setUserInfo(value) {
    this._nameElement.textContent = value.name;
    this._jobElement.textContent = value.about;
  }

  setAvatar(value) {
    this._userAvatar.alt = this.getUserInfo().name;
    this._userAvatar.src = value;
  }

  getAvatar() {
    return this._userAvatar.src;
  }
}
