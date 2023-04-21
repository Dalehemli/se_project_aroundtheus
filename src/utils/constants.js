export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
export const photoGridWrap = document.querySelector(".photo-grid__cards");
export const editPopupWindow = document.querySelector(".popup");
export const createPopupWindow = document.querySelector(".create-popup");
export const editForm = document.querySelector("#profile-popup");
// export const editForm = document.querySelector(".popup__edit-container");

export const createForm = document.querySelector("#create-popup");
export const profileButtonReset = document.querySelector(
  ".popup__close-button"
);
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const editCloseButton = document.querySelector(".popup__close-edit");
export const createCloseButton = document.querySelector(".popup__close-button");
export const profileTitle = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__title");

export const addCardPopupResetButton = document.querySelector(
  ".popup__close-button"
);
export const previewImagePopup = document.querySelector("#preview-popup");

export const titleInputField = document.querySelector("#title");
export const descriptionInputField = document.querySelector("#description");

export const nameInputField = createForm.querySelector("#name");
export const linkInputField = createForm.querySelector("#link");
export const validateConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
