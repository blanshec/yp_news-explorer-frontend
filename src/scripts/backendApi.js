/* eslint-disable class-methods-use-this */

export default class BackendApi {
  constructor(props) {
    this.props = props;
  }

  static request(url, requestData) {
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

  static getRequest(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // eslint-disable-next-line quote-props
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    };
  }

  async signUp(data) {
    await this.request(this.props.signup, this.getRequest(data));
  }

  async signIn() {
    const result = await this.request(this.props.login, this.getRequest(data));
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
  }

  async signOut() {
    localStorage.removeItem('token');
  }
}