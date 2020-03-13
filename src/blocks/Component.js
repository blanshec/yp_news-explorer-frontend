export default class Component {
  constructor(element) {
    this.element = element;
  }

  static _dispatchNewEvent(event, props) {
    return document.dispatchEvent(new CustomEvent(event, props));
  }
}
