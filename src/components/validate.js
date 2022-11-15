import { hasInvalidInput } from './utils.js';

const formValidationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error_active'
}

// validation
function showInputError(validationSettings, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

function hideInputError(validationSettings, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(validationSettings, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(
      validationSettings,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationSettings, formElement, inputElement);
  }
};

function toggleButtonState(validationSettings, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}

function setEventListeners(validationSettings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleButtonState(validationSettings, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(validationSettings, formElement, inputElement);
      toggleButtonState(validationSettings, inputList, buttonElement);
    });
  });
};

function enableValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(validationSettings, formElement);
  });
};

export {
  formValidationSettings,
  enableValidation,
  hideInputError,
}