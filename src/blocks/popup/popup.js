import Component from '../Component';
import config from '../../scripts/config';

export default class Popup extends Component {
  constructor(element) {
    super(element);
    this.closeButton = this.element.querySelector(config.elements.popupCloseButton);
    this.closeButton.onclick = this.close.bind(this);
  }

  open() {
    this.element.classList.add('popup_is-active');
    document.querySelector(config.elements.root).classList.add(config.elements.status.noscroll);
  }

  close() {
    this.element.classList.remove('popup_is-active');
    document.querySelector(config.elements.root).classList.remove(config.elements.status.noscroll);
  }
  test() {
    console.log('your a fucking idiot')
  }
}
