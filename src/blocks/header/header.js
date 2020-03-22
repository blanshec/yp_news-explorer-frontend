import Component from '../Component';

import CONFIG from '../../js/constants/config';

class Header extends Component {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.headerButton = props.headerButton;
    this.menuItemSaved = document.querySelector(CONFIG.elements.headerItemSaved);
    this.headerMenuButton = document.querySelector(CONFIG.elements.headerMenu);

    this._handleMobileMenu();
  }

  _handleMobileMenu() {
    this.headerMenuButton.addEventListener('click', () => {
      // Control color theme on pages where its needed (light themed pages)
      if (this.element.classList.contains(CONFIG.elements.status.headerThemeLight)) {
        document
          .querySelector(CONFIG.elements.headerHeading)
          .classList.toggle(CONFIG.elements.status.headerHeadingDark);
        document
          .querySelector(CONFIG.elements.headerHeading)
          .classList.toggle(CONFIG.elements.status.headerHeadingLight);
        this.headerMenuButton
          .querySelector(CONFIG.elements.icon)
          .classList.toggle(CONFIG.elements.status.headerMenuDark);
        this.headerMenuButton
          .querySelector(CONFIG.elements.icon)
          .classList.toggle(CONFIG.elements.status.headerMenuLight);
      }

      // Open mobile menu. Change button icon
      document
        .querySelector(CONFIG.elements.headerNavigation)
        .classList.toggle(CONFIG.elements.status.headerNavInactive);
      this.headerMenuButton
        .querySelector('.icon')
        .classList.toggle('icon__hamburger');
      this.headerMenuButton
        .querySelector('.icon')
        .classList.toggle('icon__close');
      document
        .querySelector(CONFIG.elements.root)
        .classList.toggle(CONFIG.elements.status.noscroll);
    });
  }

  render(event) {
    if (!event) {
      this.menuItemSaved.classList.remove(CONFIG.elements.status.nodisplay);
      return;
    }

    if (event.detail.isLoggedIn) {
      this.menuItemSaved.classList.remove(CONFIG.elements.status.nodisplay);
    } else {
      this.menuItemSaved.classList.add(CONFIG.elements.status.nodisplay);
    }
  }
}

export default Header;
