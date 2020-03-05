/* eslint-disable class-methods-use-this */

export default class BackendApi {
  constructor(props) {
    this.props = props;
  }

  signUp(data) {
    console.log(data)
    return fetch(this.props.signup,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
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
