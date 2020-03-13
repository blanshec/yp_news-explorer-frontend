import Component from '../Component';

import config from '../../js/constants/config';

class Header extends Component {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.headerButton = props.headerButton;
    this.menuItemSaved = document.querySelector(config.elements.headerItemSaved);
    this.headerMenuButton = document.querySelector(config.elements.headerMenu);

    this._handleMobileMenu();
  }

  _handleMobileMenu() {
    this.headerMenuButton.addEventListener('click', () => {
      // Control color theme on pages where its needed (light themed pages)
      if (this.element.classList.contains(config.elements.status.headerThemeLight)) {
        document
          .querySelector(config.elements.headerHeading)
          .classList.toggle(config.elements.status.headerHeadingDark);
        document
          .querySelector(config.elements.headerHeading)
          .classList.toggle(config.elements.status.headerHeadingLight);
        this.headerMenuButton
          .querySelector(config.elements.iconElement)
          .classList.toggle(config.elements.status.headerMenuDark);
        this.headerMenuButton
          .querySelector(config.elements.iconElement)
          .classList.toggle(config.elements.status.headerMenuLight);
      }

      // Open mobile menu. Change button icon
      document
        .querySelector(config.elements.headerNavigation)
        .classList.toggle(config.elements.status.headerNavInactive);
      this.headerMenuButton
        .querySelector('.icon')
        .classList.toggle('icon__hamburger');
      this.headerMenuButton
        .querySelector('.icon')
        .classList.toggle('icon__close');
      document
        .querySelector(config.elements.root)
        .classList.toggle(config.elements.status.noscroll);
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
