/* eslint-disable class-methods-use-this */

export default class BackendApi {
  constructor(props) {
    this.props = props;
  }

  _request(url, requestData) {
    return fetch(url, requestData)
      .then(async (res) => {
        if (!res.ok) {
          console.log(requestData);
          const message = await res.json().then((answer) => answer.message);
          throw new Error(message);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  _getRequest(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        credentials: 'include',
      },
      body: JSON.stringify(data),
    };
  }

  async signUp(data) {
    await this._request(this.props.signup, this._getRequest(data));
  }

  async signIn(data) {
    const result = await this._request(this.props.login, this._getRequest(data));
    console.log(result)
    if (result.token) {
      console.log(result.token)
      localStorage.setItem('token', result.token);
    }
  }

  async signOut() {
    localStorage.removeItem('token');
  }

  getUsername() {
    const dataRequest = {
      method: 'GET',
      credentials: 'include',
    };
    console.log(dataRequest)
    return fetch(this.props.getUser, dataRequest)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
