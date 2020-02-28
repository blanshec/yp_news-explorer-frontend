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

    this.form = this.signUp.bind(this);
    document.addEventListener(EVENTS.headerButtonClicked, this.open.bind(this));
    console.log(this.errors)
    this.errors.forEach(element => {
      element.classList.add(config.elements.status.nodisplay);
    });
  }

  async signUp(event) {
    event.preventDefault();
    const data = {};
    let isValidForm = false;


  }

  static validateEmail(event) {
    const input = event.target;
    const isValid = validator.isEmail(input.value);


    return isValid;
  }
}
