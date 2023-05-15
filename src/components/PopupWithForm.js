import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._saveButton = this._popupForm.querySelector(".popup__save-button");
    this._submitCallback = submitCallback;
  }

  renderLoading(isLoading, saveButtonText) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = saveButtonText;
    }
  }

  _getInputValues() {
    const inputObject = {};
    this._inputList.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._submitCallback(this._getInputValues());
    });
    super.setEventListeners();
  }

  closeModalWindow() {
    this._popupForm.reset();
    super.closeModalWindow();
  }
}
