import validator from 'validator';
import Popup from './popup';
import EVENTS from '../../js/constants/events';
import ERRORS from '../../js/constants/errorMessages';
import CONFIG from '../../js/constants/config';

export default class PopupSignup extends Popup {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.errorbox = props.errorbox;
    this.popupMessage = props.popupMessage;
    this.submitButton = this.element.querySelector(CONFIG.elements.popupButtonSubmit);
    this.form = this.element.querySelector(CONFIG.elements.popupForm);
    this.errors = this.element.querySelectorAll(CONFIG.elements.popupError);
    this.inputs = this.element.querySelectorAll(CONFIG.elements.popupInput);
    this.labels = this.element.querySelectorAll(CONFIG.elements.popupLabel);
    this.errorEmail = this.element.querySelector(CONFIG.elements.popupErrorEmail);
    this.errorUsername = this.element.querySelector(CONFIG.elements.popupErrorUsername);
    this.errorPassword = this.element.querySelector(CONFIG.elements.popupErrorPassword);
    this.validInputs = {
      email: false,
      password: false,
      username: false,
    };

    this.inputs.forEach((_input) => {
      if (_input.name === 'email') {
        this.inputEmail = _input;
        this.inputEmail.addEventListener('input', this._validateEmail.bind(this));
      } else if (_input.name === 'password') {
        this.inputPassword = _input;
        this.inputPassword.addEventListener('input', this._validatePassword.bind(this));
      } else if (_input.name === 'username') {
        this.inputUsername = _input;
        this.inputUsername.addEventListener('input', this._validateUsername.bind(this));
      } else {
        throw new Error(ERRORS.inputOutOfBounds);
      }
    });

    this.form.onsubmit = this._signUp.bind(this);
    document.addEventListener(EVENTS.headerButtonClicked, this.open.bind(this));
  }

  _signUp(event) {
    event.preventDefault();
    const data = {};

    this.inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    this.api.signUp(data)
      .then(() => {
        this.close();
        this.popupMessage.open();
      })
      .catch((error) => {
        this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
      });
  }

  _validateEmail(event) {
    const input = event.target;
    const isValid = validator.isEmail(input.value);

    if (isValid) {
      this.validInputs.email = true;
      this.errorEmail.classList.add(CONFIG.elements.status.nodisplay);
    } else {
      this.validInputs.email = false;
      if (input.value.length === 0) {
        this.errorEmail.textContent = ERRORS.emailRequired;
      } else {
        this.errorEmail.textContent = ERRORS.emailIsInvalid;
      }
      this.errorEmail.classList.remove(CONFIG.elements.status.nodisplay);
    }
    this._validateForm();
    return isValid;
  }

  _validatePassword(event) {
    const input = event.target;
    const isValid = validator.isLength(input.value, {
      min: CONFIG.params.validPasswordMinLength,
      max: CONFIG.params.validPasswordMaxLength,
    });

    if (isValid) {
      this.validInputs.password = true;
      this.errorPassword.classList.add(CONFIG.elements.status.nodisplay);
    } else {
      this.validInputs.password = false;
      if (input.value.length === 0) {
        this.errorPassword.textContent = ERRORS.passwordRequired;
      } else {
        this.errorPassword.textContent = ERRORS.passwordIsInvalid;
      }
      this.errorPassword.classList.remove(CONFIG.elements.status.nodisplay);
    }

    this._validateForm();

    return isValid;
  }

  _validateUsername(event) {
    const input = event.target;
    const isValid = validator.isLength(input.value, {
      min: CONFIG.params.validNameMinLength,
      max: CONFIG.params.validNameMaxLength,
    });

    if (isValid) {
      this.validInputs.username = true;
      this.errorUsername.classList.add(CONFIG.elements.status.nodisplay);
    } else {
      this.validInputs.username = false;
      if (input.value.length === 0) {
        this.errorUsername.textContent = ERRORS.usernameRequired;
      } else {
        this.errorUsername.textContent = ERRORS.usernameIsInvalid;
      }
      this.errorUsername.classList.remove(CONFIG.elements.status.nodisplay);
    }

    this._validateForm();

    return isValid;
  }

  _validateForm() {
    const values = Object.values(this.validInputs);
    const isValidForm = values.reduce((value, next) => value && next);
    if (isValidForm) {
      this.submitButton.disabled = false;
    } else {
      this.submitButton.disabled = true;
    }
    return true;
  }
}
