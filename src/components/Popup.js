export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  openModalWindow() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  closeModalWindow() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closeModalWindow();
    }
  };

  setEventListeners() {
    const popupButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
    popupButton.addEventListener("click", () => this.closeModalWindow());

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.matches(".popup")) {
        this.closeModalWindow();
      }
    });
  }
}
