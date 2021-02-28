let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
let editButton = profile.querySelector('.profile__edit-btn');
let addButton = profile.querySelector('.profile__add-btn');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let exitButton = popupForm.querySelector('.popup__exit-btn');
let saveButton = popupForm.querySelector('.popup__save-btn')
let nameEdit = popupForm.querySelector('.popup__name-edit');
let descriptionEdit = popupForm.querySelector('.popup__descr-edit');


function openClosePopup() {
  nameEdit.value = profileName.textContent;
  descriptionEdit.value = profileDescription.textContent;

  popup.classList.toggle('popup_disabled');
  //if (popup.classList.contains('popup_disabled')) {
  //  popup.classList.remove('popup_disabled');
  //}
  //else {
  //popup.classList.add('popup_disabled');
  //}
}

function formSubmit() {
  profileName.textContent = nameEdit.value;
  profileDescription.textContent = descriptionEdit.value;
  openClosePopup();
}

editButton.addEventListener('click', openClosePopup);
exitButton.addEventListener('click', openClosePopup);
popupForm.addEventListener('submit', (event) => {
  event.preventDefault()
  formSubmit()
}
);
