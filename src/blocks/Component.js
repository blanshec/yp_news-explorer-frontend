export default class Component {
  constructor(element) {
    this.element = element;
  }

  static dispatchNewEvent(event, props) {
    return document.dispatchEvent(new CustomEvent(event, props));
  }
}
