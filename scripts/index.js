import {initialCards} from './initial-сards.js';
import {config} from './config.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

/*const createCard = (data) => {
  const cardElement = new Card(data, templateSelector, handleCardClick);
  return cardElement.generateCard();
}*/

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, '.elements__list'
);

cardsList.renderItems();

addButton.addEventListener('click', () => {
  const AddCardPopup = new PopupWithForm('.profile__edit-btn', )
  /*resetFormFields();
  openPopup(popupAddCard);
  addCardFormValidator.resetValidity();*/
});

addCardPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitAddCardForm();
});

const checkClickOnOverlay = (event) => {
  const currentOverlay = event.target;
  if (currentOverlay.classList.contains('popup')) {
    closePopup(currentOverlay); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };
};

const setOverlayListeners = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', checkClickOnOverlay);
  });
};

setOverlayListeners();


/*initialCards.forEach((item) => {
  elementsList.append(createCard(item));
});
*/
const popupOpenCard = document.querySelector('.popup_open-card');
const popupImg = popupOpenCard.querySelector('.popup__img');
const popupCaption = popupOpenCard.querySelector('.popup__caption');
const popupCardExitButton = popupOpenCard.querySelector('.popup__exit-btn');
const elementsList = document.querySelector('.elements__list');
const templateSelector = '.elements__element';
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

const closePopup = (popup) => {
  popup.classList.add('popup_disabled');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

const closeByEscape = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };
};

const editProfileFromSubmit = () => {
  profileName.textContent = nameEdit.value;
  profileDescription.textContent = descriptionEdit.value;
  closePopup(popupEditProfile); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  editProfileFormValidator.resetValidity();
};

const openPopup = (popup) => {
  popup.classList.remove('popup_disabled');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

const handleCardClick = (image, caption) => {
  popupImg.src = image;
  popupImg.alt = caption;
  popupCaption.textContent = caption;
  openPopup(popupOpenCard);
}

const createCard = (data) => {
  const cardElement = new Card(data, templateSelector, handleCardClick);
  return cardElement.generateCard();
}



const addCardFormValidator = new FormValidator(config, '.popup_add-card');
addCardFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(config, '.popup_edit-profile');
editProfileFormValidator.enableValidation();





const resetFormFields = () => {
  addCardAddNameEdit.value = '';
  addCardAddLinkEdit.value = '';
};

popupCardExitButton.addEventListener('click', () => {
  closePopup(popupOpenCard); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  addCardFormValidator.resetValidity();
});

popupEditProfileExitButton.addEventListener('click', () => {
  editProfileFormValidator.resetValidity();
  closePopup(popupEditProfile); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});

editButton.addEventListener('click', () => {
  nameEdit.value = profileName.textContent;
  descriptionEdit.value = profileDescription.textContent;
  editProfileFormValidator.resetValidity();
  openPopup(popupEditProfile);
});

popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  editProfileFromSubmit();
});

const submitAddCardForm = () => {
  const newCard = {
    name: addCardAddNameEdit.value,
    link: addCardAddLinkEdit.value
  };
  elementsList.prepend(createCard(newCard));
  closePopup(popupAddCard); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  resetFormFields();
};

addCardExitButton.addEventListener('click', () => {
  closePopup(popupAddCard); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  addCardFormValidator.resetValidity();
});

addButton.addEventListener('click', () => {
  const AddCardPopup = new PopupWithForm('.profile__edit-btn', )
  /*resetFormFields();
  openPopup(popupAddCard);
  addCardFormValidator.resetValidity();*/
});

addCardPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitAddCardForm();
});
