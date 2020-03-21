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
        _input.addEventListener('input', this.validateEmail.bind(this));
      } else if (_input.name === 'password') {
        _input.addEventListener('input', this.validatePassword.bind(this));
      } else {
        throw new Error(ERRORS.inputOutOfBounds);
      }
    });

    this.form.onsubmit = this._signIn.bind(this);
  }

  _signIn(event) {
    event.preventDefault();
    const data = {};

    this.inputs.forEach((_input) => {
      data[_input.name] = _input.value;
      // eslint-disable-next-line no-param-reassign
      _input.disabled = true;
    });
    this.submitButton.disabled = true;

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
}
