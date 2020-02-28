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
      nodisplay: 'nodisplay',
    },
    root: '.root',
    header: '.header',
    headerButton: '.header__button',
    popup: '.popup',
    popupSignup: '.popup__signup',
    popupLogin: '.popup__login',
    popupCloseButton: '.popup__button_close',
    popupTitle: '.popup__title',
    popupForm: '.popup__form',
    popupFieldset: '.popup__fieldset',
    popupInput: '.popup__input',
    popupLabel: 'popup__label',
    popupError: 'popup__error',
    popupButtonSubmit: 'popup__button_submit',
    popupLink: 'popup__link',
  },
};

export default config;
