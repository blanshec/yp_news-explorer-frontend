import Component from '../../Component';
import CONFIG from '../../../js/constants/config';

class Errorbox extends Component {
  constructor(element) {
    super(element);
    this.textField = this.element.querySelector(CONFIG.elements.errorTextField);

    this.closeButton = this.element.querySelector(CONFIG.elements.errorCloseButton);
    this.closeButton.onclick = this.hide.bind(this);
  }

  trigger(message) {
    this.textField.textContent = message;
    this.element.classList.add(CONFIG.elements.status.errorboxAnim);
    this.show();
  }
}

export default Errorbox;
