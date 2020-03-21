import validator from 'validator';
import Component from '../Component';
import ERRORS from '../../js/constants/errorMessages';
import CONFIG from '../../js/constants/config';

export default class Popup extends Component {
  constructor(element) {
    super(element);
    this.closeButton = this.element.querySelector(CONFIG.elements.popupCloseButton);
    this.closeButton.onclick = this.close.bind(this);

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        this.close();
      }
    });
    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) {
        this.close();
      }
    });
  }

  open() {
    this.show();
    document.querySelector(CONFIG.elements.root).classList.add(CONFIG.elements.status.noscroll);
  }

  close() {
    this.hide();
    if (this.element.contains(this.form)) {
      this.form.reset();
      this.inputs.forEach((_input) => {
        // eslint-disable-next-line no-param-reassign
        _input.disabled = false;
      });
      this.submitButton.disabled = false;
      this.errors.forEach((errorfield) => {
        errorfield.classList.add(CONFIG.elements.status.nodisplay);
      });
    }
    document.querySelector(CONFIG.elements.root).classList.remove(CONFIG.elements.status.noscroll);
  }

  validateEmail(event) {
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
    this.validateForm();
    return isValid;
  }

  validatePassword(event) {
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

    this.validateForm();

    return isValid;
  }

  validateForm() {
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
