const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  inputElement.classList.add(inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  inputElement.classList.remove(inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return (!inputElement.validity.valid);
  });

};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass, ...rest} ) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const checkFormValidity = (formElement, inputList, inputElement, buttonElement, rest) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  }
  else {
    hideInputError(formElement, inputElement, rest);
  }
  toggleButtonState(inputList, buttonElement, rest);
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', checkFormValidity(formElement, inputList, inputElement, buttonElement, rest));
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault;
    });
    setEventListeners(formElement, rest);
  })
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
