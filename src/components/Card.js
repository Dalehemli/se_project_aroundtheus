export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton());
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteButton());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick({ name: this._text, link: this._link })
      );
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle(".card__active-button");
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector(".card__image");
    const cardText = this._element.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._text;
    cardText.textContent = this._text;
    return this._element;
  }
}
