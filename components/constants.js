const templateSelector = '.elements__element';
const popupOpenCardSelector = '.popup_open-card';
const profile = document.querySelector('.profile');
const addButton = profile.querySelector('.profile__add-btn');
const popupAddCardSelector = '.popup_add-card'
const editButton = profile.querySelector('.profile__edit-btn');
const popupEditProfileSelector = '.popup_edit-profile';

const userInfoSelectors = {
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
};

export {templateSelector,
  popupOpenCardSelector,
  profile,
  addButton,
  popupAddCardSelector,
  editButton,
  popupEditProfileSelector,
  userInfoSelectors}
