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


const toggleButtonState = (formElement, inputList, {submitButtonSelector, inactiveButtonClass}) => {
  const submitButton = formElement.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(inactiveButtonClass);
  }
  else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(inactiveButtonClass);
  }
};

const checkInputValidity = (inputElement, formElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest)
    console.log('->', inputElement.validity.valid, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement, rest)
  }
};

const checkFormValidity = (formElement, inputElement, inputList, rest) => {
  checkInputValidity(inputElement, formElement, rest);
  toggleButtonState(formElement, inputList, rest);
  };

const setEventListeners = (formElement, {inputSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', (event) => { checkFormValidity(formElement, inputElement, inputList, rest)});
  });

};


const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); // Serach ALL Forms
  formList.forEach((formElement) => { // for each form prevent reload during submit
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, rest); // call new function to set listeners
  });

};



