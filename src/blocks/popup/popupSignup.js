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
        this.inputEmail.addEventListener('input', this.validateEmail.bind(this));
      } else if (_input.name === 'password') {
        this.inputPassword = _input;
        this.inputPassword.addEventListener('input', this.validatePassword.bind(this));
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

    this.inputs.forEach((_input) => {
      data[_input.name] = _input.value;
      // eslint-disable-next-line no-param-reassign
      _input.disabled = true;
    });
    this.submitButton.disabled = true;

    this.api.signUp(data)
      .then(() => {
        this.close();
        this.popupMessage.open();
      })
      .catch((error) => {
        this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
      });
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

    this.validateForm();

    return isValid;
  }
}
