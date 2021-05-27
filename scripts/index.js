import {initialCards} from './initial-сards.js';
import {config} from './config.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

const templateSelector = '.elements__element';
const popupOpenCardSelector = '.popup_open-card';
const profile = document.querySelector('.profile');
const addButton = profile.querySelector('.profile__add-btn');
const popupOpenCard = document.querySelector('.popup_open-card');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardSelector = '.popup_add-card'
const editButton = profile.querySelector('.profile__edit-btn');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileSelector = '.popup_edit-profile';

const userInfoSelectors = {
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
};



const handleCardClick = (image, caption) => {

  popupWithImage.open(image, caption);
  popupWithImage.setEventListeners();
}

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

const submitAddCardForm = (inputValues) => {
  inputValues.name = inputValues.addName;
  inputValues.link = inputValues.addLink;
  const card = new Card(inputValues, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
//  addCardPopup.close();
//  const newCard = {
//    name: addCardAddNameEdit.value,
//    link: addCardAddLinkEdit.value
//  };

//  elementsList.prepend(createCard(newCard));
//  closePopup(popupAddCard); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//  resetFormFields();
};

const editProfilePopup = new PopupWithForm(popupEditProfileSelector, submitEditProfileForm);
const userInfo = new UserInfo(userInfoSelectors);
const popupWithImage = new PopupWithImage(popupOpenCardSelector);
const addCardPopup = new PopupWithForm(popupAddCardSelector, submitAddCardForm);
const addCardFormValidator = new FormValidator(config, '.popup_add-card');
addCardFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(config, '.popup_edit-profile');
editProfileFormValidator.enableValidation();

addButton.addEventListener('click', () => {

  addCardPopup.setEventListeners();
  addCardPopup.open();
  /*resetFormFields();
  openPopup(popupAddCard);
  addCardFormValidator.resetValidity();*/
});


const submitEditProfileForm = (inputValues) => {
  inputValues.link = inputValues.description;
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
};

const editProfilePopup = new PopupWithForm(popupEditProfileSelector, submitEditProfileForm);
const userInfo = new UserInfo(userInfoSelectors);

editButton.addEventListener('click', () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.setEventListeners();
  editProfilePopup.open();


//  nameEdit.value = profileName.textContent;
//  descriptionEdit.value = profileDescription.textContent;
//  editProfileFormValidator.resetValidity();
//  openPopup(popupEditProfile);
});


/*const createCard = (data) => {
  const cardElement = new Card(data, templateSelector, handleCardClick);
  return cardElement.generateCard();
}

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


/*const popupCardExitButton = popupOpenCard.querySelector('.popup__exit-btn');
const elementsList = document.querySelector('.elements__list');




const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileExitButton = popupForm.querySelector('.popup__exit-btn');
const saveButton = popupForm.querySelector('.popup__save-btn')
const nameEdit = popupForm.querySelector('.popup__input_type_name');
const descriptionEdit = popupForm.querySelector('.popup__input_type_descr');
const popupImg = popupOpenCard.querySelector('.popup__img');
const popupCaption = popupOpenCard.querySelector('.popup__caption');

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

const createCard = (data) => {
  const cardElement = new Card(data, templateSelector, handleCardClick);
  return cardElement.generateCard();
}



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



popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  editProfileFromSubmit();
});



addCardExitButton.addEventListener('click', () => {
  closePopup(popupAddCard); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  addCardFormValidator.resetValidity();
});



addCardPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitAddCardForm();
});
*/
