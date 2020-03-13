import config from './constants/config';
import BackendApi from './api/backendApi';
import StateManager from './utils/stateManager';

import Header from '../blocks/header/header';
import Popup from '../blocks/popup/popup';
import PopupSignup from '../blocks/popup/popupSignup';
import PopupLogin from '../blocks/popup/popupLogin';

const api = new BackendApi(config.backendApi);

const popupMessage = new Popup(document.querySelector(config.elements.popupMessage));
const popupSignup = new PopupSignup({
  api,
  popupMessage,
  element: document.querySelector(config.elements.popupSignup),
});
const popupLogin = new PopupLogin({
  api,
  element: document.querySelector(config.elements.popupLogin),
});
const switchPopupButtons = document.querySelectorAll(config.elements.popupLink);
switchPopupButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (event.target.closest(config.elements.popupSignup)) {
      popupSignup.close();
      popupLogin.open();
    } else if (event.target.closest(config.elements.popupLogin)) {
      popupLogin.close();
      popupSignup.open();
    } else if (event.target.closest(config.elements.popupMessage)) {
      popupMessage.close();
      popupLogin.open();
    }
  });
});


const header = new Header({
  api,
  element: document.querySelector(config.elements.header),
});


const stateManager = new StateManager({ header });
stateManager.initHandlers();
