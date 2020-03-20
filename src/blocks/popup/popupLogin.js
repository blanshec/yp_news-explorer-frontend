import validator from 'validator';
import Popup from './popup';
import EVENTS from '../../js/constants/events';
import ERRORS from '../../js/constants/errorMessages';
import CONFIG from '../../js/constants/config';

export default class PopupLogin extends Popup {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.errorbox = props.errorbox;
    this.submitButton = this.element.querySelector(CONFIG.elements.popupButtonSubmit);
    this.form = this.element.querySelector(CONFIG.elements.popupForm);
    this.errors = this.element.querySelectorAll(CONFIG.elements.popupError);
    this.inputs = this.element.querySelectorAll(CONFIG.elements.popupInput);
    this.labels = this.element.querySelectorAll(CONFIG.elements.popupLabel);
    this.errorEmail = this.element.querySelector(CONFIG.elements.popupErrorEmail);
    this.errorPassword = this.element.querySelector(CONFIG.elements.popupErrorPassword);
    this.validInputs = {
      email: false,
      password: false,
    };

    this.inputs.forEach((_input) => {
      if (_input.name === 'email') {
        _input.addEventListener('input', this._validateEmail.bind(this));
      } else if (_input.name === 'password') {
        _input.addEventListener('input', this._validatePassword.bind(this));
      } else {
        throw new Error(ERRORS.inputOutOfBounds);
      }
    });

    this.form.onsubmit = this._signIn.bind(this);
  }

  _signIn(event) {
    event.preventDefault();
    const data = {};

    this.inputs.forEach((input) => {
      data[input.name] = input.value;
    });

    this.api.signIn(data)
      .then(() => {
        this.constructor.dispatchNewEvent(EVENTS.authUpdated, {
          detail: {
            isLoggedIn: true,
          },
        });
        this.close();
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
