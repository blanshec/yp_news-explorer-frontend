import Popup from './popup';
import EVENTS from '../../scripts/events';

export default class PopupSignup extends Popup {
  constructor(props) {
    super(props.element);
    document.addEventListener(EVENTS.headerButtonClicked, this.open.bind(this));
  }
}
