/* eslint-disable class-methods-use-this */
import ERRORS from '../constants/errorMessages';

export default class BackendApi {
  constructor(props) {
    this.props = props;
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

  _getRequest() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
    };
  }

  _deleteRequest() {
    return {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
    };
  }

  async signOut() {
    try {
      const response = await fetch(this.props.logout, this._getRequest());
      if (!response.ok) {
        throw ERRORS.badSignout;
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async signUp(data) {
    try {
      const response = await fetch(this.props.signup, this._postRequest(data));
      if (!response.ok) {
        throw ERRORS.badSignup;
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async signIn(data) {
    try {
      const response = await fetch(this.props.login, this._postRequest(data));
      if (response.status === 401) {
        throw ERRORS.unableAuth;
      }
      if (!response.ok) {
        throw ERRORS.badSignin;
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveArticle(data) {
    try {
      const response = await fetch(this.props.articles, this._postRequest(data));
      if (response.status === 401) {
        throw ERRORS.unableAuth;
      }
      if (!response.ok) {
        throw ERRORS.unableSaveArticle;
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteArticle(id) {
    try {
      const response = await fetch(`${this.props.articles}/${id}`, this._deleteRequest());
      if (response.status === 401) {
        throw ERRORS.unableAuth;
      }
      if (!response.ok) {
        throw ERRORS.unableDeleteArticle;
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getArticles() {
    try {
      const response = await fetch(this.props.articles, this._getRequest());
      if (response.status === 401) {
        throw ERRORS.unableAuth;
      }
      if (!response.ok) {
        throw ERRORS.badSavedArticlesRequest;
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsername() {
    try {
      const response = await fetch(this.props.getUser, { credentials: 'include' });
      if (response.status === 401) {
        throw ERRORS.unableAuth;
      }
      if (!response.ok) {
        throw ERRORS.badRequest;
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
