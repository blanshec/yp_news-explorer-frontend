const config = {
  backendApi: {
    baseUrl: 'https://api.newsexplo.gq',
    login: 'https://api.newsexplo.gq/signin',
    signup: 'https://api.newsexplo.gq/signup',
    getUser: 'https://api.newsexplo.gq/users/me',
    articles: 'https://api.newsexplo.gq/articles',
  },
  elements: {
    status: {
      noscroll: 'noscroll',
    },
    root: '.root',
    header: '.header',
    headerButton: '.header__button',
    popup: '.popup',
    popupSignup: '.popup__signup',
    popupLogin: '.popup__login',
    popupCloseButton: '.popup__button_close',
  },
};

export default config;
