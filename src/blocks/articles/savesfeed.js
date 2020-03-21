import NewsFeed from './newsfeed';
import CONFIG from '../../js/constants/config';
import EVENTS from '../../js/constants/events';


class SavesFeed extends NewsFeed {
  constructor(props) {
    super(props);
    this.api = props.api;
    this.cardContainer = this.element.querySelector(CONFIG.elements.cardContainer);

    this.leadTitle = document.querySelector(CONFIG.elements.leadTitle);
    this.leadKeywords = document.querySelector(CONFIG.elements.leadKeywords);
    this.leadKeywordsHolder = document.querySelector(CONFIG.elements.leadKeywordsHolder);

    this.cardGenerator = props.cardGenerator;
    this.isLoggedIn = !!localStorage.getItem('username');
    this.username = localStorage.getItem('username');

    this._removeById();
  }

  renderLead(articleCount) {
    this.leadTitle.innerText = `${this.username}, у вас ${articleCount} ${articleCount === 1 ? 'сохраненная статья' : 'сохраненных статей'}`;
    this.leadKeywordsHolder.innerText = this.prepareKeywords();
  }

  prepareKeywords() {
    const keywordsMap = {};
    this.cards.data.forEach((article) => {
      const { keyword } = article;
      if (!keywordsMap[keyword]) {
        keywordsMap[keyword] = 0;
      }
      keywordsMap[keyword] += 1;
    });

    const keywordsArray = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const keyword in keywordsMap) {
      if (keyword) {
        keywordsArray.push({ keyword, count: [keywordsMap[keyword]] });
      }
    }
    const sortedKeywords = keywordsArray.sort((a, b) => b.count - a.count);
    const array = sortedKeywords.map((a) => a.keyword);
    if (array.length < CONFIG.params.keywordCount) {
      return array.join(', ');
    }
    let words = array.splice(0, 2).join(', ');
    if (array.length > 0) {
      words += ` и ${array.length} другим`;
    }
    return words;
  }

  async showCards() {
    try {
      this.cards = await this.api.getArticles();
      // this.savedLinks stores map with _id:url-link as key:value. Such array comes form
      // this.getSavedArticles. It is necceary to get for deletion of the card in current build.
      this.savedLinks = await this.getSavedArticles();
      this.renderLead(this.cards.data.length);
      this.loadCards({ articles: this.cards });
    } catch (error) {
      this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
    }
  }

  loadCards(params) {
    for (let i = 0; i < params.articles.data.length; i += 1) {
      this.cardContainer.appendChild(this.cardGenerator.generateCard({
        savedLinks: this.cards,
        data: params.articles.data[i],
        authStatus: this.isLoggedIn,
        feed: 'savefeed',
      }));
    }
  }

  _removeById() {
    document.addEventListener(EVENTS.deletedArticle, async (event) => {
      const childernCards = this.cardContainer.querySelectorAll(CONFIG.elements.card);

      for (let i = 0; i < childernCards.length; i += 1) {
        const childLink = childernCards[i].querySelector('.card__link').href;
        if (childLink === event.detail.link) {
          this.cardContainer.removeChild(childernCards[i]);
          this.renderLead(childernCards.length - 1);
        }
      }
    });
  }
}

export default SavesFeed;
