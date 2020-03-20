// eslint-disable-next-line import/extensions
import './js/script';
import './index.css';
import CONFIG from './js/constants/config';
import BackendApi from './js/api/backendApi';
import NewsApi from './js/api/newsApi';
import ArticleFeed from './blocks/articles/articlefeed';
import CardGenerator from './blocks/common/card/card';
import SearchBar from './blocks/search/search';

const api = new BackendApi(CONFIG.backendApi);
const newsApi = new NewsApi(CONFIG.newsApi);
const cardGenerator = new CardGenerator();

const articleFeed = new ArticleFeed({
  element: document.querySelector(CONFIG.elements.articlesMain),
  cardGenerator,
  api,
});

// eslint-disable-next-line no-unused-vars
const searchBar = new SearchBar({
  element: document.querySelector(CONFIG.elements.searchForm),
  newsApi,
  articles: articleFeed,
});
