import Component from '../../Component';
import EVENTS from '../../../scripts/events';

export default class HeaderButton extends Component {
  constructor(props) {
    super(props.element);
    this.element.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent(EVENTS.headerButtonClicked));
    });
  }
}
