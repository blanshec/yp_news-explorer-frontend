import Component from '../../Component';
import EVENTS from '../../../js/constants/events';
import config from '../../../js/constants/config';

export default class HeaderButton extends Component {
  constructor(props) {
    super(props.element);
    this.element.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent(EVENTS.headerButtonClicked));
    });
    this._render();
  }


  _render() {
    this.element.addEventListener(EVENTS.authUpdated, () => {
      const { isLoggedIn } = event.detail;
      if (isLoggedIn) {
        this.element.textContent = 'is-logged';
      } else {
        console.log('fuck');
      }
    });
  }
}
