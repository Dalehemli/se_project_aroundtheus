import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
  profileTitle,
  profileDescription,
  profileAvatar,
  avatarButton,
  avatarEditPopup,
} from "../utils/constants.js";

// Wrappers

//creates two instances of the FormValidator class and enables validation on two HTML form elements,
//addFormElement and editFormElement, respectively.

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/",
  headers: {
    authorization: "d1c2c033-dd2f-4b44-be0f-34c3478760b2",
    "Content-Type": "application/json",
  },
});

const editFormValidator = new FormValidator(validateConfig, editForm);
const addFormValidator = new FormValidator(validateConfig, createForm);
const avatarFormValidator = new FormValidator(validateConfig, avatarEditPopup);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const newUserInfo = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileDescription,
  userAvatar: profileAvatar,
});

editButton.addEventListener("click", () => {
  const userData = newUserInfo.getUserInfo();
  titleInputField.value = userData.name;
  descriptionInputField.value = userData.description;
  newProfilePopup.openModalWindow();
});

const newProfilePopup = new PopupWithForm("#profile-popup", (values) => {
  newProfilePopup.renderLoading(true, "Save");
  api
    .updateProfileInfo(values)
    .then((data) => {
      newUserInfo.setUserInfo(data);
      newProfilePopup.closeModalWindow();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newProfilePopup.renderLoading(false, "Save");
    });
});

newProfilePopup.setEventListeners();

avatarButton.addEventListener("click", () => {
  avatarFormValidator.disableSubmitButton();
  avatarPopup.openModalWindow();
});

const avatarPopup = new PopupWithForm("#profile-image-edit-popup", (value) => {
  avatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(value.avatar)
    .then((value) => {
      newUserInfo.setAvatar(value.avatar);
      avatarPopup.closeModalWindow();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false, "Save");
    });
});

avatarPopup.setEventListeners();
avatarFormValidator.disableSubmitButton();

const newPopupImage = new PopupWithImage({
  popupSelector: "#preview-popup",
});
newPopupImage.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-confirm-popup");
let cardSection;
let userId;

deleteCardPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    "#card-template",
    (cardName, cardLink) => {
      newPopupImage.openModalWindow(cardName, cardLink);
    },

    (cardId) => {
      deleteCardPopup.openModalWindow();
      deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup.renderLoading(true);
        api
          .deleteUserCard(cardId)
          .then(() => {
            card.handleDeleteButton();
            deleteCardPopup.closeModalWindow();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            deleteCardPopup.renderLoading(false);
          });
      });
    },

    (cardId) => {
      if (card.isLiked()) {
        api
          .removeCardLikes(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addCardLikes(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card;
}

api
  .getAPIInfo()
  .then(([userData, userCards]) => {
    userId = userData._id;
    newUserInfo.setUserInfo(userData);
    newUserInfo.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: userCards,
        renderer: (cardData) => {
          const newCard = createCard(cardData);
          cardSection.addItem(newCard.getView());
        },
      },
      ".photo-grid__cards"
    );
    cardSection.renderItems();
  })
  .catch((error) => {
    console.error("Error fetching API info:", error);
  });

const newCardPopup = new PopupWithForm("#create-popup", (values) => {
  newCardPopup.renderLoading(true);
  api
    .addNewCard(values)
    .then((cardData) => {
      const newCard = createCard(cardData);
      newCardPopup.closeModalWindow();
      cardSection.addItem(newCard.getView());
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false, "Create");
    });
});

addButton.addEventListener("click", () => {
  newCardPopup.openModalWindow();
  addFormValidator.disableSubmitButton();
});

newCardPopup.setEventListeners();

// const newPopupImage = new PopupWithImage({ popupSelector: ".preview-popup" });
// newPopupImage.setEventListeners();

// const createCard = (cardData) => {
//   const card = new Card(cardData, "#card-template", (data) => {
//     newPopupImage.openModalWindow(data);
//   });
//   return card.getView();
// };

// const newCardSection = new Section(
//   { items: initialCards, renderer: createCard },
//   ".photo-grid__cards"
// );
// newCardSection.renderItems();

// const newProfilePopup = new PopupWithForm("#profile-popup", (inputValues) => {
//   newUserInfo.setUserInfo(inputValues.title, inputValues.description);
// });

// const newCardPopup = new PopupWithForm("#create-popup", (inputValues) => {
//   const card = createCard({ name: inputValues.name, link: inputValues.link });
//   newCardSection.addItem(card);
// });

// const newUserInfo = new UserInfo({
//   nameSelector: profileTitle,
//   jobSelector: profileDescription,
//   userAvatar: profileAvatar,
// });

// newCardPopup.setEventListeners();
// newProfilePopup.setEventListeners();

// addButton.addEventListener("click", () => {
//   newCardPopup.openModalWindow();
//   addFormValidator.disableSubmitButton();
// });

// editButton.addEventListener("click", () => {
//   newProfilePopup.openModalWindow();

//   const userData = newUserInfo.getUserInfo();
//   titleInputField.value = userData.name;
//   descriptionInputField.value = userData.description;
// });
