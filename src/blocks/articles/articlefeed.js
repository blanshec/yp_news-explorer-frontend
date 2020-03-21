import NewsFeed from './newsfeed';
import CONFIG from '../../js/constants/config';
import EVENTS from '../../js/constants/events';

class Articlefeed extends NewsFeed {
  constructor(props) {
    super(props);
    this.preloaderBlock = this.element.querySelector(CONFIG.elements.articlesPreloader);
    this.notFoundBlock = this.element.querySelector(CONFIG.elements.articlesNotFound);

    this.showMoreButton = this.element.querySelector(CONFIG.elements.articlesShowmoreButton);
    this.showMoreButton.addEventListener('click', () => this.showMore());

    this._setSaveHandler();
  }

  _setSaveHandler() {
    document.addEventListener(EVENTS.saveArticleData, async (customEvent) => {
      try {
        const result = await this.api.saveArticle(customEvent.detail);
        this.savedLinks = await this.getSavedArticles();
        if (result) {
          this.constructor.dispatchNewEvent((EVENTS.savedArticle), {
            detail: {
              link: customEvent.detail.link,
            },
          });
        }
      } catch (error) {
        this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
      }
    });
  }

  async loadCards(params) {
    this.isLoggedIn = !!localStorage.getItem('username');
    if (this.isLoggedIn) {
      try {
        this.savedLinks = await this.getSavedArticles();

        for (let i = params.start;
          i < Math.min(params.start + this.pageSize, params.news.length);
          i += 1) {
          this.cardContainer.appendChild(this.cardGenerator.generateCard({
            savedLinks: this.savedLinks,
            data: params.news[i],
            authStatus: this.isLoggedIn,
            feed: 'articlefeed',
          }));
        }

        this.currentIndex = params.start + this.pageSize;
        if (this.currentIndex < params.news.length) {
          this.showMoreButton.classList.remove(CONFIG.elements.status.nodisplay);
        } else {
          this.showMoreButton.classList.add(CONFIG.elements.status.nodisplay);
        }
      } catch (error) {
        this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
      }
    }
  }

  showArticles(data) {
    this.news = data;
    this.loadCards({ news: this.news, start: 0 });
    this.element.classList.remove(CONFIG.elements.status.nodisplay);
    this.container.classList.remove(CONFIG.elements.status.nodisplay);
  }

  showMore() {
    this.loadCards({ news: this.news, start: this.currentIndex });
  }

  showNotFound() {
    this.element.classList.remove(CONFIG.elements.status.nodisplay);
    this.notFoundBlock.classList.remove(CONFIG.elements.status.nodisplay);
  }

  showPreloader() {
    this.element.classList.remove(CONFIG.elements.status.nodisplay);
    this.preloaderBlock.classList.remove(CONFIG.elements.status.nodisplay);
  }

  hidePreloader() {
    this.element.classList.add(CONFIG.elements.status.nodisplay);
    this.preloaderBlock.classList.add(CONFIG.elements.status.nodisplay);
  }

  hideAll() {
    this.hidePreloader();
    this.notFoundBlock.classList.add(CONFIG.elements.status.nodisplay);
    this.container.classList.add(CONFIG.elements.status.nodisplay);
    this.element.classList.add(CONFIG.elements.status.nodisplay);
  }

  clear() {
    this.element.classList.add(CONFIG.elements.status.nodisplay);
    while (this.cardContainer.firstChild) {
      this.cardContainer.removeChild(this.cardContainer.firstChild);
    }
    this.hideAll();
  }
}

export default Articlefeed;
