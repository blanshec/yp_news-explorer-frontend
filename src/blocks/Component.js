import CONFIG from '../js/constants/config';

export default class Component {
  constructor(element) {
    this.element = element;
  }

  static dispatchNewEvent(event, props) {
    return document.dispatchEvent(new CustomEvent(event, props));
  }

  show() {
    this.element.classList.remove(CONFIG.elements.status.nodisplay);

  }

  hide() {
    this.element.classList.add(CONFIG.elements.status.nodisplay);
  }
}
