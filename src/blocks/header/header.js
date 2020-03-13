import Component from '../Component';
import HeaderButton from './__button/headerButton';
import config from '../../js/constants/config';

class Header extends Component {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.menuItemSaved = document.querySelector(config.elements.headerItemSaved);
    this.headerButton = new HeaderButton({
      api: this.api,
      element: document.querySelector(config.elements.headerButton),
    });
  }

  render(event) {
    if (!event) {
      this.menuItemSaved.classList.remove(config.elements.status.nodisplay);
      return;
    }

    if (event.detail.isLoggedIn) {
      this.menuItemSaved.classList.remove(config.elements.status.nodisplay);
    } else {
      this.menuItemSaved.classList.add(config.elements.status.nodisplay);
    }
  }
}

export default Header;
