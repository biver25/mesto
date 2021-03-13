const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/elements-elbrus1.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/elements-elbrus1.jpg'
  },
  {
    name: 'Домбай',
    link: './images/elements-dombai1.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/elements-elbrus2.jpg'
  },
  {
    name: 'Домбай',
    link: './images/elements-dombai2.jpg'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/elements-karachaevo.jpg'
  }
];

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
    popupImg.alt = elementsFigure.querySelector('.elements__caption').textContent;
    popupCaption.textContent = elementsFigure.querySelector('.elements__caption').textContent;
    openPopup(event, '.popup_open-card');
  });
};

function createCardDomNode(item) {
  const element = elementTemplate.querySelector('.elements__element').cloneNode(true);
  element.querySelector('.elements__img').src = item.link;
  element.querySelector('.elements__img').alt = item.name;
  element.querySelector('.elements__caption').textContent = item.name;
  addElementsListeners(element);
  return element;
};

function renderCards() {
  const initialCardsArr = initialCards.map(createCardDomNode);
  elementsList.append(...initialCardsArr);
  return initialCardsArr;
}

renderCards();

function openClosePopup() {
  nameEdit.value = profileName.textContent;
  descriptionEdit.value = profileDescription.textContent;
  popupEditProfile.classList.toggle('popup_disabled');
}

function formSubmit() {
  profileName.textContent = nameEdit.value;
  profileDescription.textContent = descriptionEdit.value;
  openClosePopup();
}

function cardCreate() {
  const newCard = {
    name: addCardAddNameEdit.value,
    link: addCardAddLinkEdit.value
  };
  elementsList.prepend(createCardDomNode(newCard));
  document.querySelector('.popup_add-card').classList.toggle('popup_disabled')
  addCardAddNameEdit.value = '';
  addCardAddLinkEdit.value = '';
};

function openPopup(event, target) {
  document.querySelector(target).classList.toggle('popup_disabled');
};

function closePopup(event, target) {
  document.querySelector(target).classList.toggle('popup_disabled');
};

editButton.addEventListener('click', (event) => openClosePopup(event, '.popup_edit-profile'));
exitButton.addEventListener('click', (event) => openClosePopup(event, '.popup_edit-profile'));
popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formSubmit();
});
addButton.addEventListener('click', (event) => openPopup(event, '.popup_add-card'));
addCardExitButton.addEventListener('click', (event) => closePopup(event, '.popup_add-card'));
addCardPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  cardCreate();
});
popupCardExitButton.addEventListener('click', (event) => closePopup(event, '.popup_open-card'));
