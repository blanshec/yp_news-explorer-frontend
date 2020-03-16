import CONFIG from './constants/config';
import EVENTS from './constants/events';
import BackendApi from './api/backendApi';
import NewsApi from './api/newsApi';
import StateManager from './utils/stateManager';

import Header from '../blocks/header/header';
import HeaderButton from '../blocks/header/__button/headerButton';
import Popup from '../blocks/popup/popup';
import PopupSignup from '../blocks/popup/popupSignup';
import PopupLogin from '../blocks/popup/popupLogin';
import SearchBar from '../blocks/search/search';
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

const cardGenerator = new CardGenerator();
const newsFeed = new NewsFeed({
  element: document.querySelector(CONFIG.elements.resultsMain),
  cardGenerator,
  api,
});
const searchBar = new SearchBar({
  element: document.querySelector(CONFIG.elements.searchForm),
  newsApi,
  results: newsFeed,
});

const stateManager = new StateManager({ header });
stateManager.initHandlers();

document.addEventListener(EVENTS.saveNewsData, async (customEvent) => {
  const result = await api.saveArticle(customEvent.detail);
  console.log(result)
  if (result && result.data) {
    document.dispatchEvent(new CustomEvent(EVENTS.savedNews, { detail: result.data }));
  }
});
