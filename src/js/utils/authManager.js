import EVENTS from '../constants/events';

class AuthManager {
  constructor(props) {
    this.api = props.api;
    this.header = props.header;
  }

  async init() {
    await this._render();
  }

  async _requestUserData() {
    return this.api.getUsername().catch(() => { });
  }

  async _render() {
    let userData = this._requestUserData();

    document.addEventListener(EVENTS.authUpdated, (event) => {
      console.log(userData)
    })
  }
}

export default AuthManager;