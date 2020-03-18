import Component from '../../Component';
import CONFIG from '../../../js/constants/config';
import EVENTS from '../../../js/constants/events';

class CardGenerator extends Component {
  constructor() {
    super();
    this.cardContainer = document.querySelector(CONFIG.elements.cardContainer);
    this.template = document.querySelector(CONFIG.elements.cardTemplate);
  }

  generateCard(params) {
    const newCard = this.template.cloneNode(true).content;

    newCard.querySelector(CONFIG.elements.cardDate)
      .textContent = `${params.data.date.getDate()} ${CONFIG.months[params.data.date.getMonth()]} ${params.data.date.getFullYear()}`;
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
    let isSaved = false;
    if (params.savedLinks) {
      isSaved = params.savedLinks.includes(params.data.title);
    }

    if (this.isLoggedIn) {
      saveButton.classList.add('card__button_save');
      saveButton.classList.remove('card__button_save-loggedout');
      saveButton.disabled = false;
    }
    if (isSaved) {
      saveButton.classList.add('card__button_saved');
      saveButton.classList.remove('card__button_save-loggedout', 'card__button_save');
      saveButtonIcon.classList.add(CONFIG.elements.status.iconSaved);
      saveButtonIcon.classList.remove(CONFIG.elements.status.iconSave);
    }
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.saveCard(params.data);
    });

  }

  saveCard(data) {
    this.constructor.dispatchNewEvent(EVENTS.saveNewsData, { detail: data });
  }
}

export default CardGenerator;
