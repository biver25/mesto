import '.././pages/index.css';
import {initialCards} from '../components/initial-сards.js';
import {config} from '../components/config.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import PopupWithFormAvatar from '../components/PopupWithFormAvatar.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import {templateSelector,
  popupOpenCardSelector,
  addButton,
  popupAddCardSelector,
  editButton,
  popupEditProfileSelector,
  avatarEditButton,
  popupEditAvatarSelector,
  saveButtonSelector,
  popupSubmitSelector,
  userInfoSelectors}
  from '../components/constants.js';


  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
      authorization: '9daa429d-e266-4102-bdc4-ac09b3349d8b',
      'Content-Type': 'application/json'
    }
  });

  let cardsList;

  api.getInitialCards()
  .then((res) => {
    cardsList = new Section({
      items: res,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
      }
    }, '.elements__list'
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const handleCardClick = (image, caption) => {
  popupWithImage.open(image, caption);
};

const createCard = (item) => {
  const card = new Card(item, templateSelector, handleCardClick, handleCardDelete, api);
  return card.generateCard();
};

/*const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
}, '.elements__list'
);

cardsList.renderItems();*/

const createNewCard = (item) => {
  console.log('item', item);
  const card = new Card(item, templateSelector, handleCardClick, handleCardDelete, api);
  console.log('card.saveCard',card.saveCard());
  return card.saveCard();
};

const submitAddCardForm = (inputValues) => {
  preload(popupAddCardSelector, true, 'Да');
  inputValues.name = inputValues.addName;
  inputValues.link = inputValues.addLink;
  api.postNewCard(inputValues)
      .then((res) => {
        const cardElement = createNewCard(res);
        cardsList.addItem(cardElement);
        preload(popupAddCardSelector, true, 'Да');
      })
      .catch((err) => {
        console.log(err);
      });

};

const submitEditProfileForm = (inputValues) => {
  inputValues.link = inputValues.description;
  api.updateServerUserInfo(inputValues)
  .catch((err) => {
    console.log(err);
  });
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
};

const preload = (popupSelector, loadingFlag, defaultValue) => {
  if (loadingFlag) {
    document.querySelector(popupSelector)
    .querySelector(saveButtonSelector).textContent = 'Сохранение...';
  }
  else {
    document.querySelector(popupSelector)
    .querySelector(saveButtonSelector).textContent = defaultValue;
  }
}

const submitEditAvatarForm = (inputValues) => {
  console.log(inputValues.avatar);
  preload(popupEditAvatarSelector, true, 'Сохранить');
  api.updateAvatar(inputValues)
    .then((res) => {
      userInfo.setUserAvatar(res);
      preload(popupEditAvatarSelector, false);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });

};

const handleCardDelete = (card, event) => {
  submitPopup.open();
  submitPopup.setEventListeners(() => {
    api.deleteCard(card._cardID)
    .then(() => {
      card.deleteElement(event);
      submitPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });

  });
}


const editProfilePopup = new PopupWithForm(popupEditProfileSelector, submitEditProfileForm);
const userInfo = new UserInfo(userInfoSelectors);
const popupWithImage = new PopupWithImage(popupOpenCardSelector);
const addCardPopup = new PopupWithForm(popupAddCardSelector, submitAddCardForm);
const addCardFormValidator = new FormValidator(config, '.popup_add-card');
addCardFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(config, '.popup_edit-profile');
editProfileFormValidator.enableValidation();
const editAvatarPopup = new PopupWithFormAvatar(popupEditAvatarSelector, submitEditAvatarForm)
const submitPopup = new PopupWithSubmit(popupSubmitSelector);


api.getServerUserInfo()
.then((res) => {
  console.log(res);
  res.description = res.about;
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
})
.catch((err) => {
  console.log(err);
});

addButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardFormValidator.resetValidity();
});

editButton.addEventListener('click', () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
  editProfileFormValidator.resetValidity();
});

avatarEditButton.addEventListener('click', () => {
  editAvatarPopup.setInputValues(userInfo.getUserInfo());
  editAvatarPopup.open();
});

editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();

