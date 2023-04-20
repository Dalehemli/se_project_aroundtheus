import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  openModalWindow({ link, name }) {
    const imageOpen = this._popupElement.querySelector(".popup__preview-image");
    const imageText = this._popupElement.querySelector(".popup__preview-name");
    imageOpen.src = link;
    imageText.alt = name;
    imageText.textContent = name;
    super.openModalWindow();
  }
}
