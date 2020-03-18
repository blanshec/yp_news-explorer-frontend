import validator from 'validator';
import Component from '../Component';
import CONFIG from '../../js/constants/config';
import ERRORS from '../../js/constants/errorMessages';

class SearchBar extends Component {
  constructor(props) {
    super(props.element);
    this.newsApi = props.newsApi;
    this.newsFeed = props.articles;
    this.input = this.element.querySelector(CONFIG.elements.searchInput);
    this.submitButton = this.element.querySelector(CONFIG.elements.searchButton);
    this.searchError = this.element.querySelector(CONFIG.elements.searchError);
    this.isValidSearchInput = false;

    this.element.onsubmit = this.searchByKeyword.bind(this);
    this.input.addEventListener('input', this._validateInput.bind(this));
  }

  async searchByKeyword(event) {
    event.preventDefault();
    const data = {};
    data[this.input.name] = this.input.value;

    this.newsFeed.clear();
    this.newsFeed.showPreloader();

    this.newsApi.getNews(this.input.value, CONFIG.params.searchTimeSpan)
      .then((news) => {
        if (!news.length) {
          throw new Error('Новости не найдены');
        }
        this.newsFeed.hidePreloader();
        this.newsFeed.showArticles(news);
      }).catch((err) => {
        this.newsFeed.hidePreloader();
        this.newsFeed.showNotFound();
        throw new Error(err);
      });
  }

  _validateInput(event) {
    const input = event.target;
    const isValid = validator.isLength(input.value, {
      min: CONFIG.params.validateSearchMinLength,
      max: CONFIG.params.validateSearchMaxLength,
    });

    if (isValid) {
      this.searchError.textContent = '';
      this.searchError.classList.add(CONFIG.elements.status.nodisplay);
    } else {
      this.searchError.textContent = ERRORS.searchQueryIsInvalid;
      this.searchError.classList.remove(CONFIG.elements.status.nodisplay);
    }

    return isValid;
  }
}

export default SearchBar;
