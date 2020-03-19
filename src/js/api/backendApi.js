/* eslint-disable class-methods-use-this */
import ERRORS from '../constants/errorMessages';

export default class BackendApi {
  constructor(props) {
    this.props = props;
  }

  async _request(url, requestData) {
    try {
      const response = await fetch(url, requestData);
      if (!response.ok) {
        throw ERRORS.badRequest;
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
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

  async saveArticle(data) {
    await this._request(this.props.articles, this._postRequest(data));
  }

  async getArticles() {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
    };
    return fetch(this.props.articles, data)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const resultToReturn = await res.json();
        return resultToReturn;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
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
