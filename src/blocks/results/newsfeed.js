import Component from '../Component';
import CONFIG from '../../js/constants/config';

class NewsFeed extends Component {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.preloaderBlock = this.element.querySelector(CONFIG.elements.resultsPreloader);
    this.notFoundBlock = this.element.querySelector(CONFIG.elements.resultsNotFound);
    this.container = this.element.querySelector(CONFIG.elements.resultsContainer);
    this.cardContainer = this.element.querySelector(CONFIG.elements.cardContainer);
    this.showMoreButton = this.element.querySelector(CONFIG.elements.resultsShowmoreButton);
    this.pageSize = CONFIG.params.pageSize;
    this.news = {};

    this.cardGenerator = props.cardGenerator;

    this.showMoreButton.addEventListener('click', () => this.showMore());
  }

  async loadCards(params) {
    this.isLoggedIn = !!localStorage.getItem('username');
    if (this.isLoggedIn) {
      try {
        this.savedLinks = await this.api.getArticles()
          .then((articles) => articles.data.map((x) => x.title));
      } catch (err) {
        this.savedLinks = [];
        throw new Error(err.message);
      }
    }

    for (let i = params.start;
      i < Math.min(params.start + this.pageSize, params.news.length);
      i += 1) {
      this.cardContainer.appendChild(this.cardGenerator.generateCard({
        savedLinks: this.savedLinks,
        data: params.news[i],
        authStatus: this.isLoggedIn,
      }));
    }

    this.currentIndex = params.start + this.pageSize;
    if (this.currentIndex < params.news.length) {
      this.showMoreButton.classList.remove(CONFIG.elements.status.nodisplay);
    } else {
      this.showMoreButton.classList.add(CONFIG.elements.status.nodisplay);
    }
  }

  showResults(data) {
    this.news = data;
    this.loadCards({ news: this.news, start: 0 });
    this.element.classList.remove(CONFIG.elements.status.nodisplay);
    this.container.classList.remove(CONFIG.elements.status.nodisplay);
  }

  showMore() {
    this.loadCards({ news: this.news, start: this.currentIndex });
  }

  hideResults() {
    this.element.classList.add(CONFIG.elements.status.nodisplay);
    this.container.classList.add(CONFIG.elements.status.nodisplay);
  }

  showPreloader() {
    this.element.classList.remove(CONFIG.elements.status.nodisplay);
    this.preloaderBlock.classList.remove(CONFIG.elements.status.nodisplay);
  }

  hidePreloader() {
    this.element.classList.add(CONFIG.elements.status.nodisplay);
    this.preloaderBlock.classList.add(CONFIG.elements.status.nodisplay);
  }

  showNotFound() {
    this.element.classList.remove(CONFIG.elements.status.nodisplay);
    this.notFoundBlock.classList.remove(CONFIG.elements.status.nodisplay);
  }

  hideNotFound() {
    this.element.classList.add(CONFIG.elements.status.nodisplay);
    this.notFoundBlock.classList.add(CONFIG.elements.status.nodisplay);
  }

  hideAll() {
    this.hidePreloader();
    this.hideNotFound();
    this.hideResults();
  }

  clear() {
    this.element.classList.add(CONFIG.elements.status.nodisplay);
    while (this.cardContainer.firstChild) {
      this.cardContainer.removeChild(this.cardContainer.firstChild);
    }
    this.hideAll();
  }
}

export default NewsFeed;
