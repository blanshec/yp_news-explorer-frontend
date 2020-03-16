import CONFIG from './constants/config';
import BackendApi from './api/backendApi';
import NewsApi from './api/newsApi';
import StateManager from './utils/stateManager';

import Header from '../blocks/header/header';
import HeaderButton from '../blocks/header/__button/headerButton';
import Popup from '../blocks/popup/popup';
import PopupSignup from '../blocks/popup/popupSignup';
import PopupLogin from '../blocks/popup/popupLogin';
import CardGenerator from '../blocks/common/card/card';
import NewsFeed from '../blocks/results/newsfeed';

const api = new BackendApi(CONFIG.backendApi);
const newsApi = new NewsApi(CONFIG.newsApi);

const popupMessage = new Popup(document.querySelector(CONFIG.elements.popupMessage));
const popupSignup = new PopupSignup({
  api,
  popupMessage,
  element: document.querySelector(CONFIG.elements.popupSignup),
});
const popupLogin = new PopupLogin({
  api,
  element: document.querySelector(CONFIG.elements.popupLogin),
});
const switchPopupButtons = document.querySelectorAll(CONFIG.elements.popupLink);
switchPopupButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (event.target.closest(CONFIG.elements.popupSignup)) {
      popupSignup.close();
      popupLogin.open();
    } else if (event.target.closest(CONFIG.elements.popupLogin)) {
      popupLogin.close();
      popupSignup.open();
    } else if (event.target.closest(CONFIG.elements.popupMessage)) {
      popupMessage.close();
      popupLogin.open();
    }
  });
});


const headerButton = new HeaderButton({
  api,
  element: document.querySelector(CONFIG.elements.headerButton),
});
const header = new Header({
  api,
  headerButton,
  element: document.querySelector(CONFIG.elements.header),
});

const newsFeed = new NewsFeed({ element: document.querySelector(CONFIG.elements.resultsContainer) });
// const cardGenerator = new CardGenerator();
// cardGenerator.addCard();
const stateManager = new StateManager({ header });
stateManager.initHandlers();
