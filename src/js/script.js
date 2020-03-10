import config from './constants/config';
import BackendApi from './api/backendApi';
import AuthManager from './utils/authManager';
import Header from '../blocks/header/header';
import PopupSignup from '../blocks/popup/popupSignup';
import PopupLogin from '../blocks/popup/popupLogin';

const api = new BackendApi(config.backendApi);



const popupSignup = new PopupSignup({
  api,
  element: document.querySelector(config.elements.popupSignup),
});
const popupLogin = new PopupLogin({
  api,
  element: document.querySelector(config.elements.popupLogin),
});


const header = new Header({
  element: document.querySelector(config.elements.header),
});

const authManager = new AuthManager({ api, header });
authManager.init();
