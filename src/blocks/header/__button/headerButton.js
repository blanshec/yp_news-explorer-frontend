import Component from '../../Component';
import EVENTS from '../../../js/constants/events';
import CONFIG from '../../../js/constants/config';

export default class HeaderButton extends Component {
  constructor(props) {
    super(props.element);
    this.api = props.api;
  }

  openPopup() {
    this.constructor.dispatchNewEvent(EVENTS.headerButtonClicked);
  }

  signOutUser() {
    this.api.signOut()
      .then(() => {
        localStorage.removeItem('username');
        this.constructor.dispatchNewEvent(EVENTS.authUpdated, {
          detail: {
            isLoggedIn: false,
          },
        });
      })
      .catch((error) => {
        this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
      });
  }

  async render(event) {
    if (!event) {
      this.element.textContent = localStorage.getItem('username');
      this._addLogoutIcon();
      return;
    }

    if (event.detail.isLoggedIn) {
      try {
        await this._requestUserData();
        this._addLogoutIcon();
      } catch (error) {
        this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
      }
    } else {
      this.element.textContent = 'Авторизоваться';
    }
  }

  _addLogoutIcon() {
    const icon = document.createElement('i');
    icon.classList.add('icon', 'icon__logout');

    if (this.element.classList.contains(CONFIG.elements.status.buttonThemeDark)) {
      this.element.textContent = `${localStorage.getItem('username')}`;
      icon.classList.add(CONFIG.elements.status.buttonIconDark);
      this.element.appendChild(icon);
    } else {
      this.element.textContent = `${localStorage.getItem('username')}`;
      icon.classList.add(CONFIG.elements.status.buttonIconLight);
      this.element.appendChild(icon);
    }
  }

  _requestUserData() {
    return this.api.getUsername()
      .then((res) => {
        localStorage.setItem('username', res.username);
      })
      .catch((error) => {
        this.constructor.dispatchNewEvent(EVENTS.errorTriggered, { detail: { message: error } });
      });
  }
}
