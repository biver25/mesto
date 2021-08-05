const templateSelector = '#elementTemplate';
const saveButtonSelector = '.popup__save-btn'
const popupOpenCardSelector = '.popup_open-card';
const profile = document.querySelector('.profile');
const addButton = profile.querySelector('.profile__add-btn');
const popupAddCardSelector = '.popup_add-card'
const editButton = profile.querySelector('.profile__edit-btn');
const popupEditProfileSelector = '.popup_edit-profile';
const avatarEditButton = profile.querySelector('.profile__avatar-edit');
const popupEditAvatarSelector = '.popup_edit-avatar';
const popupSubmitSelector = '.popup_confirm';

const userInfoSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
};

export {templateSelector,
  popupOpenCardSelector,
  profile,
  addButton,
  popupAddCardSelector,
  editButton,
  popupEditProfileSelector,
  avatarEditButton,
  popupEditAvatarSelector,
  saveButtonSelector,
  popupSubmitSelector,
  userInfoSelectors}
