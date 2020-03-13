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
      credentials: 'include',
      body: JSON.stringify(data),
    };
  }

  async signOut() {
    return fetch(this.props.logout,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка при выходе: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async signUp(data) {
    await this._request(this.props.signup, this._postRequest(data));
  }

  async signIn(data) {
    await this._request(this.props.login, this._postRequest(data));
  }


  async getUsername() {
    return fetch(this.props.getUser, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка чтения ${res.status}`);
        return res.json();
      })
      .then((userData) => userData.username)
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
