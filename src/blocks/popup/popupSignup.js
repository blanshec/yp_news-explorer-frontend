import validator from 'validator';
import Popup from './popup';
import EVENTS from '../../scripts/events';
import ERRORS from '../../scripts/errorMessages';
import config from '../../scripts/config';

export default class PopupSignup extends Popup {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.submitButton = this.element.querySelector(config.elements.popupButtonSubmit);
    this.form = this.element.querySelector(config.elements.popupForm);
    this.errors = this.element.querySelectorAll(config.elements.popupError);
    this.inputs = this.element.querySelectorAll(config.elements.popupInput);
    this.labels = this.element.querySelectorAll(config.elements.popupLabel);
    this.errorEmail = this.element.querySelector(config.elements.popupErrorEmail);
    this.errorUsername = this.element.querySelector(config.elements.popupErrorUsername);
    this.errorPassword = this.element.querySelector(config.elements.popupErrorPassword);
    this.invalidInputs = {
      email: false,
      username: false,
      password: false,
    };

    this.inputs.forEach((_input) => {
      if (_input.name === 'email') {
        this.inputEmail = _input;
        this.inputEmail.addEventListener('input', this.validateEmail.bind(this));
      } else if (_input.name === 'password') {
        this.inputPassword = _input;
        this.inputPassword.addEventListener('input', this.validatePassword.bind(this));
      } else if (_input.name === 'username') {
        this.inputUsername = _input;
        this.inputUsername.addEventListener('input', this.validateUsername.bind(this));
      } else {
        throw new Error(ERRORS.inputOutOfBounds);
      }
    });

    this.form.onsubmit = this.signUp.bind(this);
    document.addEventListener(EVENTS.headerButtonClicked, this.open.bind(this));
  }

  async signUp(event) {
    event.prevenDefault();
    const data = {};


  }

  validateEmail(event) {
    const input = event.target;
    const isValid = validator.isEmail(input.value);

    if (isValid) {
      this.invalidInputs.email = false;
      this.errorEmail.classList.add(config.elements.status.nodisplay);
    } else {
      this.invalidInputs.email = true;
      if (input.value.length === 0) {
        this.errorEmail.textContent = ERRORS.emailRequired;
      } else {
        this.errorEmail.textContent = ERRORS.emailIsInvalid;
      }
      this.errorEmail.classList.remove(config.elements.status.nodisplay);
    }
    this.validateForm();
    return isValid;
  }

  validatePassword(event) {
    const input = event.target;
    const isValid = validator.isLength(input.value, {
      min: config.params.validPasswordMinLength,
      max: config.params.validPasswordMaxLength,
    });

    if (isValid) {
      this.invalidInputs.password = false;
      this.errorPassword.classList.add(config.elements.status.nodisplay);
    } else {
      this.invalidInputs.password = true;
      if (input.value.length === 0) {
        this.errorPassword.textContent = ERRORS.passwordRequired;
      } else {
        this.errorPassword.textContent = ERRORS.passwordIsInvalid;
      }
      this.errorPassword.classList.remove(config.elements.status.nodisplay);
    }

    this.validateForm();

    return isValid;
  }

  validateUsername(event) {
    const input = event.target;
    const isValid = validator.isLength(input.value, {
      min: config.params.validNameMinLength,
      max: config.params.validNameMaxLength,
    });

    if (isValid) {
      this.invalidInputs.username = false;
      this.errorUsername.classList.add(config.elements.status.nodisplay);
    } else {
      this.invalidInputs = true;
      if (input.value.length === 0) {
        this.errorUsername.textContent = ERRORS.usernameRequired;
      } else {
        this.errorUsername.textContent = ERRORS.usernameIsInvalid;
      }
      this.errorUsername.classList.remove(config.elements.status.nodisplay);
    }

    this.validateForm();

    return isValid;
  }

  validateForm() {
    console.log(this.invalidInputs)
    const values = Object.values(this.invalidInputs);

    values.forEach((value) => {
      if (!value) {
        this.submitButton.disabled = true;
      } else {
        this.submitButton.disabled = false;
      }
    });
  }
}
