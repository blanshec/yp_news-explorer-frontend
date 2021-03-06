import EVENTS from '../constants/events';

class stateManager {
  constructor(props) {
    this.header = props.header;
    this.headerButton = props.header.headerButton;
    this.usernameExists = !!localStorage.getItem('username');
  }

  initHandlers() {
    if (this.usernameExists) {
      this._renderHeader();
    }

    document.addEventListener(EVENTS.authUpdated, (event) => {
      this.usernameExists = !!localStorage.getItem('username');
      this._renderHeader(event);
    });
    this.headerButton.element.addEventListener('click', () => {
      this.usernameExists = !!localStorage.getItem('username');
      this._handleHeaderButton();
    });
  }

  _renderHeader(event) {
    this.header.render(event);
    this.headerButton.render(event);
  }

  _handleHeaderButton() {
    if (this.usernameExists) {
      this.headerButton.signOutUser();
    } else {
      this.headerButton.openPopup();
    }
  }
}

export default stateManager;
