import Component from '../../Component';
import CONFIG from '../../../js/constants/config';

class CardGenerator extends Component {
  constructor() {
    super();
    this.cardContainer = document.querySelector(CONFIG.elements.cardContainer);
    this.template = document.querySelector(CONFIG.elements.cardTemplate);
  }

  _generateCard(data) {
    const newCard = this.template.cloneNode(true).content;

    newCard.querySelector(CONFIG.elements.cardDate).textContent = data.date;
    newCard.querySelector(CONFIG.elements.cardTitle).textContent = data.title;
    newCard.querySelector(CONFIG.elements.cardImage).src = data.imgUrl;
    newCard.querySelector(CONFIG.elements.cardText).textContent = data.text;
    newCard.querySelector(CONFIG.elements.cardLink).textContent = data.link;
    return newCard;
  }

  addCard(data) {
    this.cardContainer.appendChild(this._generateCard(data));
  }
}

export default CardGenerator;
