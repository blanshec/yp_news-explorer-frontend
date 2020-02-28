import config from './config';
import BackendApi from './backendApi';
import Header from '../blocks/header/header';
import PopupSignup from '../blocks/popup/popupSignup';
import PopupLogin from '../blocks/popup/popupLogin';

const api = new BackendApi(config.BackendApi);

const popupSignup = new PopupSignup({
  element: document.querySelector(config.elements.popupSignup),
});
const popupLogin = new PopupLogin({
  element: document.querySelector(config.elements.popupLogin),
});


const header = new Header({
  element: document.querySelector(config.elements.header),
});
