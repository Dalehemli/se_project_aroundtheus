const initialCards = [
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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Wrappers

const photoGridWrap = document.querySelector(".photo-grid__cards");
const editPopupWindow = document.querySelector(".edit-popup");
const createPopupWindow = document.querySelector(".create-popup");
const editForm = document.querySelector(".popup__edit-container");
const createForm = document.querySelector(
  ".popup__create-container .popup__form"
);

// Buttons and other DOM elements

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editCloseButton = document.querySelector(".popup__close-edit");
const createCloseButton = document.querySelector(".popup__close-create");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__title");
const previewImagePopup = document.querySelector(".preview-popup");
const previewCardImage = document.querySelector(".popup__preview-image");
const previewCardName = document.querySelector(".popup__preview-name");

// Form Data

const titleInputField = editForm.querySelector(".popup__input_type_title");
const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);

const nameInputField = createForm.querySelector(".popup__input_type_name");
const linkInputField = createForm.querySelector(".popup__input_type_link");

function toggleModalVisibility(popupWindow) {
  popupWindow.classList.toggle("popup_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInputField.value;
  profileDescription.textContent = descriptionInputField.value;

  toggleModalVisibility(editPopupWindow);
}

function handleCreateFormSubmit(evt) {
  evt.preventDefault();

  renderCard(
    {
      name: nameInputField.value,
      link: linkInputField.value,
    },
    photoGridWrap
  );

  toggleModalVisibility(createPopupWindow);
  createForm.reset();
}

editForm.addEventListener("submit", handleEditFormSubmit);
createForm.addEventListener("submit", handleCreateFormSubmit);
editButton.addEventListener("click", () => {
  titleInputField.value = profileTitle.textContent;
  descriptionInputField.value = profileDescription.textContent;

  toggleModalVisibility(editPopupWindow);
});
addButton.addEventListener("click", () => {
  toggleModalVisibility(createPopupWindow);
});

const closeButtons = document.querySelectorAll(".popup__close-button");

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".popup");

  // button doesnt toggle when in seperate functions

  button.addEventListener("click", () => toggleModalVisibility(popup));
});

//This is the function where the escape button is pressed to toggle the modal window
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    toggleModalVisibility(openedPopup);
  }
}
function removeEscListener() {
  document.removeEscListener("keyup", handleEscClose);
}
function addEscListener() {
  document.addEventListener("keyup", handleEscClose);
}
function toggleModalVisibility(popupWindow) {
  popupWindow.classList.toggle("popup_opened");
  if (popupWindow.classList.contains("popup_opened")) {
    addEscListener();
  } else {
    removeEscListener();
  }
}

//This is the function that is the overlay for the modal window

function attachPopupMouseDownHandler(popup, closeButton) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup || evt.target === closeButton) {
      toggleModalVisibility(popup);
    }
  });
}

//Attach the event handlers for each popup

attachPopupMouseDownHandler(editPopupWindow);
attachPopupMouseDownHandler(createPopupWindow);
attachPopupMouseDownHandler(previewImagePopup);

const createCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = data.name;

  cardElement.querySelector(".card__image");
  cardImage.style.backgroundImage = `url('${data.link}')`;

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    previewCardImage.src = data.link;
    previewCardImage.alt = `Photo of ${data.name}`;
    previewCardName.textContent = data.name;
    toggleModalVisibility(previewImagePopup);
  });

  return cardElement;
};

const renderCard = (data, wrapper) => {
  const newCard = createCardElement(data);

  wrapper.prepend(newCard);
};

initialCards.forEach((data) => {
  renderCard(data, photoGridWrap);
});
