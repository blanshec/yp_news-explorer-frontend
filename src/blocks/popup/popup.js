import Component from '../Component';
import CONFIG from '../../js/constants/config';

export default class Popup extends Component {
  constructor(element) {
    super(element);
    this.closeButton = this.element.querySelector(CONFIG.elements.popupCloseButton);
    this.closeButton.onclick = this.close.bind(this);
  }

  open() {
    this.element.classList.remove(CONFIG.elements.status.nodisplay);
    document.querySelector(CONFIG.elements.root).classList.add(CONFIG.elements.status.noscroll);
  }

  close() {
    this.element.classList.add(CONFIG.elements.status.nodisplay);
    document.querySelector(CONFIG.elements.root).classList.remove(CONFIG.elements.status.noscroll);
  }
}
