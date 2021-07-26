import '.././pages/index.css';
import {initialCards} from '../components/initial-сards.js';
import {config} from '../components/config.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {templateSelector,
  popupOpenCardSelector,
  addButton,
  popupAddCardSelector,
  editButton,
  popupEditProfileSelector,
  userInfoSelectors}
  from '../components/constants.js';

const handleCardClick = (image, caption) => {
  popupWithImage.open(image, caption);
};

const createCard = (item) => {
  const card = new Card(item, templateSelector, handleCardClick);
  return card.generateCard();
};

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
}, '.elements__list'
);

cardsList.renderItems();

const submitAddCardForm = (inputValues) => {
  inputValues.name = inputValues.addName;
  inputValues.link = inputValues.addLink;
  const cardElement = createCard(inputValues);
  cardsList.addItem(cardElement);
};

const submitEditProfileForm = (inputValues) => {
  inputValues.link = inputValues.description;
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
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
  addCardPopup.open();
  addCardFormValidator.resetValidity();
});

editButton.addEventListener('click', () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
  editProfileFormValidator.resetValidity();
});

editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
