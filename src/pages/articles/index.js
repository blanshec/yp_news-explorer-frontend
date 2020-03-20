// eslint-disable-next-line import/extensions
import '../../js/script.js';
import './index.css';
import CONFIG from '../../js/constants/config';
import BackendApi from '../../js/api/backendApi';
import CardGenerator from '../../blocks/common/card/card';
import SavesFeed from '../../blocks/articles/savesfeed';

if (!localStorage.getItem('username')) {
  window.location.replace('/');
}
const api = new BackendApi(CONFIG.backendApi);
const cardGenerator = new CardGenerator();
const savesFeed = new SavesFeed({
  element: document.querySelector(CONFIG.elements.articlesMain),
  cardGenerator,
  api,
});

savesFeed.showCards();
