import Component from '../../Component';
import CONFIG from '../../../js/constants/config';
import EVENTS from '../../../js/constants/events';

class CardGenerator extends Component {
  constructor() {
    super();
    this.cardContainer = document.querySelector(CONFIG.elements.cardContainer);
    this.template = document.querySelector(CONFIG.elements.cardTemplate);
  }

  saveCard(data) {
    this.constructor.dispatchNewEvent(EVENTS.saveArticleData, { detail: data });
  }

  deleteCard(data) {
    this.constructor.dispatchNewEvent(EVENTS.deleteArticleData, { detail: data });
  }

  generateCard(params) {
    const newCard = this.template.cloneNode(true).content;

    if (params.feed === CONFIG.params.savefeed) {
      const saveDate = new Date(params.data.date);
      newCard.querySelector(CONFIG.elements.cardDate).textContent = `${saveDate.getDate()} ${CONFIG.months[saveDate.getMonth()]} ${saveDate.getFullYear()}`;
    } else {
      newCard.querySelector(CONFIG.elements.cardDate).textContent = `${params.data.date.getDate()} ${CONFIG.months[params.data.date.getMonth()]} ${params.data.date.getFullYear()}`;
    }
    newCard.querySelector(CONFIG.elements.cardTitle).textContent = params.data.title;
    newCard.querySelector(CONFIG.elements.cardTag).textContent = params.data.keyword;
    newCard.querySelector(CONFIG.elements.cardImage).src = params.data.image;
    newCard.querySelector(CONFIG.elements.cardText).textContent = params.data.text;
    newCard.querySelector(CONFIG.elements.cardLink).textContent = params.data.source;
    newCard.querySelector(CONFIG.elements.cardLink).href = params.data.link;

    this._manageSaveButton(newCard, params);

    return newCard;
  }

  _manageSaveButton(card, params) {
    const link = card.querySelector(CONFIG.elements.cardLink).href;
    const saveButtonIcon = card.querySelector(CONFIG.elements.icon);
    const saveButton = card.querySelector(CONFIG.elements.cardButton);
    this.isLoggedIn = params.authStatus;
    let isSaved = false;

    if (this.isLoggedIn) {
      isSaved = this._checkCardForSave(params);
      this._addLoggedinUnsavedStyle(saveButtonIcon, saveButton);
      saveButton.disabled = false;
    }
    if (isSaved && (params.feed === CONFIG.params.articlefeed)) {
      this._addSavedCardStyle(saveButtonIcon, saveButton);
    }

    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (params.feed === CONFIG.params.savefeed) {
        this.deleteCard(params.data);
      } else if (isSaved && (params.feed === CONFIG.params.articlefeed)) {
        this.deleteCard(params.data);
      } else {
        this.saveCard(params.data);
      }
    });
    document.addEventListener(EVENTS.savedArticle, (event) => {
      if (event.detail.link === link) {
        isSaved = true;
        this._addSavedCardStyle(saveButtonIcon, saveButton);
      }
    });
    document.addEventListener(EVENTS.deletedArticle, (event) => {
      if (event.detail.link === link) {
        if (params.feed === 'savefeed') {
          isSaved = false;
        } else if (isSaved && (params.feed === 'articlefeed')) {
          this._addLoggedinUnsavedStyle(saveButtonIcon, saveButton);
          isSaved = false;
        }
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _checkCardForSave(params) {
    const idKey = Object.keys(params.savedLinks)[Object
      .values(params.savedLinks).indexOf(params.data.link)];
    return params.savedLinks[idKey] === (params.data.link);
  }

  // eslint-disable-next-line class-methods-use-this
  _addLoggedinUnsavedStyle(icon, button) {
    icon.classList.remove(CONFIG.elements.status.iconSaved);
    icon.classList.add(CONFIG.elements.status.iconSave);
    button.classList.add(CONFIG.elements.cardStatuses.cardButtonSave);
    button.classList.remove(CONFIG.elements.cardStatuses.cardButtonSaveLoggedOut);
  }

  // eslint-disable-next-line class-methods-use-this
  _addSavedCardStyle(icon, button) {
    button.classList.add(CONFIG.elements.cardStatuses.cardButtonSaved);
    button.classList.remove(
      CONFIG.elements.cardStatuses.cardButtonSaveLoggedOut,
      CONFIG.elements.cardStatuses.cardButtonSave,
    );
    icon.classList.add(CONFIG.elements.status.iconSaved);
    icon.classList.remove(CONFIG.elements.status.iconSave);
  }
}

export default CardGenerator;
