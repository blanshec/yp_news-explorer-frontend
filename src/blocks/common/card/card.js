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

    if (params.feed === 'savefeed') {
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
    const saveButtonIcon = card.querySelector(CONFIG.elements.icon);
    const saveButton = card.querySelector(CONFIG.elements.cardButton);
    this.isLoggedIn = params.authStatus;
    let isSaved = this._checkCardForSave(params);

    if (this.isLoggedIn) {
      this._addLoggedunUnsavedStyle(saveButtonIcon, saveButton);
      saveButton.disabled = false;
    }
    if (isSaved && (params.feed === 'articlefeed')) {
      this._addSavedCardStyle(saveButtonIcon, saveButton);
    }

    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (params.feed === 'savefeed') {
        this.deleteCard(params.data);
        isSaved = false;
      } else if (isSaved && (params.feed === 'articlefeed')) {
        this.deleteCard(params.data);
        isSaved = false;
        this._addLoggedunUnsavedStyle(saveButtonIcon, saveButton);
      } else {
        this.saveCard(params.data);
        isSaved = true;
        this._addSavedCardStyle(saveButtonIcon, saveButton);
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
  _addLoggedunUnsavedStyle(icon, button) {
    icon.classList.remove(CONFIG.elements.status.iconSaved);
    icon.classList.add(CONFIG.elements.status.iconSave);
    button.classList.add('card__button_save');
    button.classList.remove('card__button_save-loggedout');
  }

  // eslint-disable-next-line class-methods-use-this
  _addSavedCardStyle(icon, button) {
    button.classList.add('card__button_saved');
    button.classList.remove('card__button_save-loggedout', 'card__button_save');
    icon.classList.add(CONFIG.elements.status.iconSaved);
    icon.classList.remove(CONFIG.elements.status.iconSave);
  }
}

export default CardGenerator;
