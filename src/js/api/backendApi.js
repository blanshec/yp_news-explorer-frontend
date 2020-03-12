/* eslint-disable class-methods-use-this */

export default class BackendApi {
  constructor(props) {
    this.props = props;
  }

  _request(url, requestData) {
    return fetch(url, requestData)
      .then(async (res) => {
        if (!res.ok) {
          const message = await res.json().then((answer) => answer.message);
          throw new Error(message);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  _postRequest(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    };
  }

  async signUp(data) {
    await this._request(this.props.signup, this._postRequest(data));
  }

  async signIn(data) {
    await this._request(this.props.login, this._postRequest(data));
  }

  async signOut() {
    localStorage.removeItem('token');
  }

  async getUsername() {
    await this._request(this.props.getUser, { credentials: 'include' });
  }
}
