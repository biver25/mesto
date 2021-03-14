const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const editButton = profile.querySelector('.profile__edit-btn');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupForm = popupEditProfile.querySelector('.popup__form');
const exitButton = popupForm.querySelector('.popup__exit-btn');
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
  cardElement.replaceWith('');
};

function addElementsListeners(element) {

  const deleteButton = element.querySelector('.elements__delete');
  deleteButton.addEventListener('click', deleteElement);
  const likeButton = element.querySelector('.elements__like');
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('elements__like_active');
  });

  const figurePicture = element.querySelector('.elements__img');
  figurePicture.addEventListener('click', function openPopupFigure(event) {
    const elementsFigure =  event.target.closest('.elements__figure');
    popupImg.src = elementsFigure.querySelector('.elements__img').src;
    const elementsCaption = elementsFigure.querySelector('.elements__caption');
    popupImg.alt = elementsCaption.textContent;
    popupCaption.textContent = elementsFigure.querySelector('.elements__caption').textContent;
    togglePopup(popupOpenCard);
  });
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

function togglePopup(popup){
  popup.classList.toggle('popup_disabled');
};

function toggleEditProfilePopup() {

  if (popupEditProfile.classList.contains('popup_disabled')) {

  nameEdit.value = profileName.textContent;
  descriptionEdit.value = profileDescription.textContent;

  };

  togglePopup(popupEditProfile);

};

function editProfileFromSubmit() {
  profileName.textContent = nameEdit.value;
  profileDescription.textContent = descriptionEdit.value;
  toggleEditProfilePopup();
};

function submitAddCardForm() {
  const newCard = {
    name: addCardAddNameEdit.value,
    link: addCardAddLinkEdit.value
  };
  elementsList.prepend(createCardDomNode(newCard));

  togglePopup(popupAddCard);

  addCardAddNameEdit.value = '';
  addCardAddLinkEdit.value = '';
};

function eraseInputFields() {

  togglePopup(popupAddCard);

    addCardAddNameEdit.value = '';
    addCardAddLinkEdit.value = '';
 }

editButton.addEventListener('click', toggleEditProfilePopup);
exitButton.addEventListener('click', toggleEditProfilePopup);
popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  editProfileFromSubmit();
});
addButton.addEventListener('click', () => togglePopup(popupAddCard));
addCardExitButton.addEventListener('click', eraseInputFields);
addCardPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitAddCardForm();
});
popupCardExitButton.addEventListener('click', () => togglePopup(popupOpenCard));
