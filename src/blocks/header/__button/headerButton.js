import Component from '../../Component';
import EVENTS from '../../../js/constants/events';
import config from '../../../js/constants/config';

export default class HeaderButton extends Component {
  constructor(props) {
    super(props.element);
    this.api = props.api;
  }

  openPopup() {
    this.constructor._dispatchNewEvent(EVENTS.headerButtonClicked);
  }

  async signOutUser() {
    await this.api.signOut()
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка выхода');
        return res.json();
      })
      .then(() => {
        localStorage.removeItem('username');
        this.constructor._dispatchNewEvent(EVENTS.authUpdated, {
          detail: {
            isLoggedIn: false,
          },
        });
      })
      .catch(() => {
        throw new Error();
      });
  }

  async render(event) {
    if (!event) {
      this.element.textContent = localStorage.getItem('username');
      this._addLogoutIcon();
      return;
    }

    if (event.detail.isLoggedIn) {
      await this._requestUserData();
      this._addLogoutIcon();
    } else {
      this.element.textContent = 'Авторизоваться';
    }
  }

  _addLogoutIcon() {
    const icon = document.createElement('i');
    icon.classList.add('icon', 'icon__logout');

    if (this.element.classList.contains(config.elements.status.buttonThemeDark)) {
      this.element.textContent = `${localStorage.getItem('username')}`;
      icon.classList.add(config.elements.status.buttonIconDark);
      this.element.appendChild(icon);
    } else {
      this.element.textContent = `${localStorage.getItem('username')}`;
      icon.classList.add(config.elements.status.buttonIconLight);
      this.element.appendChild(icon);
    }
  }

  async _requestUserData() {
    return this.api.getUsername()
      .then((res) => {
        localStorage.setItem('username', res);
      })
      .catch(() => { });
  }
}
