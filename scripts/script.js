const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const editButton = profile.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileExitButton = popupForm.querySelector('.popup__exit-btn');
const saveButton = popupForm.querySelector('.popup__save-btn')
const nameEdit = popupForm.querySelector('.popup__input_type_name');
const descriptionEdit = popupForm.querySelector('.popup__input_type_descr');
const addButton = profile.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_add-card');
const addCardPopupForm = popupAddCard.querySelector('.popup__form');
const addCardExitButton = addCardPopupForm.querySelector('.popup__exit-btn');
const addCardSaveButton = addCardPopupForm.querySelector('.popup__save-btn')
const addCardAddNameEdit = addCardPopupForm.querySelector('.popup__input_type_add-name');
const addCardAddLinkEdit = addCardPopupForm.querySelector('.popup__input_type_add-link');
const popupOpenCard = document.querySelector('.popup_open-card');
const popupImg = popupOpenCard.querySelector('.popup__img');
const popupCaption = popupOpenCard.querySelector('.popup__caption');
const popupCardExitButton = popupOpenCard.querySelector('.popup__exit-btn');
const elementTemplate = document.querySelector('#elementTemplate').content;
const elementsList = document.querySelector('.elements__list');

function likeCard(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle('elements__like_active');
};

function deleteElement(event) {
  const cardElement = event.target.closest('.elements__element');
  cardElement.remove();
};

function openPopupFigure(event) {
  const elementsFigure =  event.target.closest('.elements__figure');
  popupImg.src = elementsFigure.querySelector('.elements__img').src;
  const elementsCaption = elementsFigure.querySelector('.elements__caption');
  popupImg.alt = elementsCaption.textContent;
  popupCaption.textContent = elementsFigure.querySelector('.elements__caption').textContent;
  openPopup(popupOpenCard);
};

function addElementsListeners(element) {
  const deleteButton = element.querySelector('.elements__delete');
  deleteButton.addEventListener('click', deleteElement);
  const likeButton = element.querySelector('.elements__like');
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('elements__like_active');
  });
  const figurePicture = element.querySelector('.elements__img');
  figurePicture.addEventListener('click', (event) => openPopupFigure(event));
};

function createCardDomNode(item) {
  const element = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const elementImg = element.querySelector('.elements__img');
  elementImg.src = item.link;
  elementImg.alt = item.name;
  element.querySelector('.elements__caption').textContent = item.name;
  addElementsListeners(element);
  return element;
};

function renderCards() {
  const initialCardsArr = initialCards.map(createCardDomNode);
  elementsList.append(...initialCardsArr);
};

renderCards();

const checkClickOnOverlay = (event) => {
  const currentOverlay = event.target;
  if (currentOverlay.classList.contains('popup')) {
    closePopup(currentOverlay);
  };
};

const setOverlayListeners = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', checkClickOnOverlay);
  });

};

const openPopup = (popup) => {
  popup.classList.remove('popup_disabled');
  console.log('popup open');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

const resetValidity = (popup) => {
  const currentPopupForm = popup.querySelector(config.formSelector);
  if (currentPopupForm) {
    const currentInputList = Array.from(currentPopupForm.querySelectorAll(config.inputSelector));
    currentInputList.forEach((currentInputElement) => {
      hideInputError(currentPopupForm, currentInputElement, config);
      toggleButtonState(currentPopupForm, currentInputList, config);
    });
  };
};

const closePopup = (popup) => {
  popup.classList.add('popup_disabled');
  popup.classList.remove('popup_opened');
  console.log('popup close 1');
  document.removeEventListener('keydown', closeByEscape);
};

function editProfileFromSubmit() {
  profileName.textContent = nameEdit.value;
  profileDescription.textContent = descriptionEdit.value;
  closePopup(popupEditProfile);
  console.log('popup close 2');
  resetValidity(popupEditProfile);
};

function submitAddCardForm() {
  const newCard = {
    name: addCardAddNameEdit.value,
    link: addCardAddLinkEdit.value
  };
  elementsList.prepend(createCardDomNode(newCard));
  closePopup(popupAddCard);
  resetFormFields();
};

const resetFormFields = () => {
  addCardAddNameEdit.value = '';
  addCardAddLinkEdit.value = '';
};

editButton.addEventListener('click', () => {
  console.log('edit button pushed');
  nameEdit.value = profileName.textContent;
  descriptionEdit.value = profileDescription.textContent;
  resetValidity(popupEditProfile);
  openPopup(popupEditProfile);
});

popupEditProfileExitButton.addEventListener('click', () => {
  resetValidity(popupEditProfile);
  closePopup(popupEditProfile);
});

popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  editProfileFromSubmit();
  console.log('why');
});

addButton.addEventListener('click', () => {
  resetFormFields();
  openPopup(popupAddCard);
  resetValidity(popupAddCard);
});

addCardExitButton.addEventListener('click', () => {
  closePopup(popupAddCard);
  resetValidity(popupAddCard);
});

addCardPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitAddCardForm();
});

popupCardExitButton.addEventListener('click', () => {
  closePopup(popupOpenCard);
  resetValidity(popupOpenCard);
});

const closeByEscape = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

setOverlayListeners();
