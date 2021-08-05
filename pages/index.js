import '.././pages/index.css';
import {config} from '.././utils/config.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
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
  from '.././utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '3a9cf3fc-5610-46e8-9a9e-577623385356',
    'Content-Type': 'application/json'
  }
});

let myID;

api.getServerUserInfo()
  .then((res) => {
    myID = res._id;
  })
  .catch((err) => {
    console.log(err)
  });

let cardsList;

const handleCardClick = (image, caption) => {
  popupWithImage.open(image, caption);
};

const createCard = (item) => {
  item.myID = myID;
  const card = new Card(item, templateSelector, handleCardClick, handleCardDelete, api);
  return card.generateCard();
};

const submitAddCardForm = (inputValues) => {
  preload(popupAddCardSelector, true);
  inputValues.name = inputValues.addName;
  inputValues.link = inputValues.addLink;
  api.postNewCard(inputValues)
    .then((res) => {
      const cardElement = createCard(res);
      cardsList.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>preload(popupAddCardSelector, false, 'Создать'));
};

const submitEditProfileForm = (inputValues) => {
  inputValues.link = inputValues.about;
  api.updateServerUserInfo(inputValues)
  .then(() =>{
    userInfo.setUserInfo(inputValues);
    editProfilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  });

};

const preload = (popupSelector, loadingFlag, defaultValue = 'Сохранить') => {
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
  preload(popupEditAvatarSelector, true);
  api.updateAvatar(inputValues)
    .then((res) => {
      userInfo.setUserAvatar(res);
      preload(popupEditAvatarSelector, false);
      editAvatarPopup.close();
      editAvatarPopupValidator.resetValidity();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>preload(popupAddCardSelector, false));
};

const handleCardDelete = (card, event) => {
  submitPopup.open();
  submitPopup.setNewHandler(() => {
    preload(popupSubmitSelector, false, 'Да');
    api.deleteCard(card._cardID)
    .then(() => {
      card.deleteElement(event);
      submitPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>preload(popupSubmitSelector, false, 'Да'));
  });
}

const editProfilePopup = new PopupWithForm(popupEditProfileSelector, submitEditProfileForm);
const userInfo = new UserInfo(userInfoSelectors);
const popupWithImage = new PopupWithImage(popupOpenCardSelector);
const addCardPopup = new PopupWithForm(popupAddCardSelector, submitAddCardForm);
const addCardFormValidator = new FormValidator(config, popupAddCardSelector);
addCardFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(config, popupEditProfileSelector);
editProfileFormValidator.enableValidation();
const editAvatarPopup = new PopupWithForm(popupEditAvatarSelector, submitEditAvatarForm);
const editAvatarPopupValidator = new FormValidator(config, popupEditAvatarSelector);
editAvatarPopupValidator.enableValidation();
const submitPopup = new PopupWithSubmit(popupSubmitSelector);

api.getComletedPromises()
  .then((data) => {
    const [datafromUserInfo, dataFromInitialCard] = data;

    userInfo.setUserInfo(datafromUserInfo);
    userInfo.setUserAvatar(datafromUserInfo);

    cardsList = new Section({
      items: dataFromInitialCard,
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
  /*editAvatarPopup.setInputValues(userInfo.getUserInfo());*/
  editAvatarPopupValidator.resetValidity();
  editAvatarPopup.open();
});

editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();
submitPopup.setEventListeners();

/*api.getInitialCards()
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
  });*/

/*const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
}, '.elements__list'
);

cardsList.renderItems();*/

/*api.getServerUserInfo()
  .then((res) => {
    console.log(res.about)
    userInfo.setUserInfo(res);
    userInfo.setUserAvatar(res);
  })
 /* .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  /*res.description = res.about;
  .catch((err) => {
    console.log('catch', err)
  });
  */
