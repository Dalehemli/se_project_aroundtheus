import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  initialCards,
  editButton,
  addButton,
  editForm,
  validateConfig,
  titleInputField,
  descriptionInputField,
  createForm,
} from "../utils/constants.js";

// Wrappers

//creates two instances of the FormValidator class and enables validation on two HTML form elements,
//addFormElement and editFormElement, respectively.

const editFormValidator = new FormValidator(validateConfig, editForm);
const addFormValidator = new FormValidator(validateConfig, createForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const newPopupImage = new PopupWithImage({ popupSelector: ".preview-popup" });
newPopupImage.setEventListeners();

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", (data) => {
    newPopupImage.openModalWindow(data);
  });
  return card.getView();
};

const newCardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".photo-grid__cards"
);
newCardSection.renderItems();

const newProfilePopup = new PopupWithForm("#profile-popup", (inputValues) => {
  newUserInfo.setUserInfo(inputValues.title, inputValues.description);
});

const newCardPopup = new PopupWithForm("#create-popup", (inputValues) => {
  const card = createCard({ name: inputValues.name, link: inputValues.link });
  newCardSection.addItem(card);
});

const newUserInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__title",
});

newCardPopup.setEventListeners();
newProfilePopup.setEventListeners();

addButton.addEventListener("click", () => {
  newCardPopup.openModalWindow();
  addFormValidator.disableSubmitButton();
});

editButton.addEventListener("click", () => {
  newProfilePopup.openModalWindow();

  const userData = newUserInfo.getUserInfo();
  titleInputField.value = userData.name;
  descriptionInputField.value = userData.description;
});
