export default class Card {
  constructor(
    data,
    userID,
    cardSelector,
    handleCardClick,
    handleDeleteButtonClick,
    handleLikeButtonClick,
    loadingLikes
  ) {
    this._text = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._loadingLikes = loadingLikes;
    this._userId = userID;
    this._userCardOwnerId = data["owner"]._id;
  }

  getId() {
    return this._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(this._id);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick(this._id);
    });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._text, link: this._link });
      });
  }

  handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    this._cardLikes.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__active-button");
    } else {
      this._likeButton.classList.remove("card__active-button");
    }
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  getView() {
    this._element = this._getTemplate();

    const cardText = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._text;
    cardText.textContent = this._text;

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardLikes = this._element.querySelector(".card__likes-counter");
    this.renderLikes();

    if (this._userId != this._userCardOwnerId) {
      this._deleteButton.remove();
    }

    this.setEventListeners();
    return this._element;
  }
}
