import Component from '../Component';
import CONFIG from '../../js/constants/config';
import EVENTS from '../../js/constants/events';

class NewsFeed extends Component {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.container = this.element.querySelector(CONFIG.elements.articlesContainer);
    this.cardContainer = this.element.querySelector(CONFIG.elements.cardContainer);
    this.pageSize = CONFIG.params.pageSize;

    this.cardGenerator = props.cardGenerator;
    this._setDeleteHandler();
  }

  async getSavedArticles() {
    try {
      const fetchedLinks = await this.api.getArticles();
      const result = fetchedLinks.data.map((x) => ({
        id: x._id,
        link: x.link,
      }));
      if (result) {
        return result.reduce((obj, item) => {
          // eslint-disable-next-line no-param-reassign
          obj[item.id] = item.link;
          return obj;
        }, {});
      }
    } catch (error) {
      this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
    }
    return {};
  }

  _setDeleteHandler() {
    document.addEventListener(EVENTS.deleteArticleData, async (customEvent) => {
      try {
        const idKey = Object.keys(this.savedLinks)[Object
          .values(this.savedLinks).indexOf(customEvent.detail.link)];
        const result = await this.api.deleteArticle(idKey);
        if (result) {
          this.savedLinks = await this.getSavedArticles();
          this.constructor.dispatchNewEvent(EVENTS.deletedArticle, {
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
}

export default NewsFeed;
