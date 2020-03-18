const CONFIG = {
  backendApi: {
    baseUrl: 'https://api.newsexplo.gq',
    login: 'https://api.newsexplo.gq/signin',
    logout: 'https://api.newsexplo.gq/logout',
    signup: 'https://api.newsexplo.gq/signup',
    getUser: 'https://api.newsexplo.gq/users/me',
    articles: 'https://api.newsexplo.gq/articles',
  },
  newsApi: {
    newsUrl: 'https://newsapi.org/v2/everything?sortBy=popularity&apiKey=9463a3af98f2474a93847c50157b49d3&language=ru&pageSize=100',
  },
  elements: {
    status: {
      // Common statuses
      noscroll: 'noscroll',
      nodisplay: 'nodisplay',

      // Header statuses
      headerNavInactive: 'header__navigation_inactive',
      headerThemeDark: 'header_dark',
      headerThemeLight: 'header_light',
      headerHeadingDark: 'header__heading_dark',
      headerHeadingLight: 'header__heading_light',
      buttonThemeDark: 'header__button_dark',
      buttonThemeLight: 'header__button_light',

      // Icon statuses
      headerMenuDark: 'icon__hamburger_dark',
      headerMenuLight: 'icon__hamburger_light',
      buttonIconDark: 'icon__logout_dark',
      buttonIconLight: 'icon__logout_light',
      iconSave: 'icon__save',
      iconSaved: 'icon__saved',
    },

    // Common adds for classList.add/remove/toggle
    commonAdds: {
      iconElement: 'icon',
      linkElement: 'link',
      titleElement: 'title',
    },

    // Common elements
    root: '.root',
    icon: '.icon',
    errorBox: '.errrorbox',

    // Header elements
    header: '.header',
    headerButton: '.header__button',
    headerMenu: '.header__menu',
    headerHeading: '.header__heading',
    headerItemSaved: '.header__item-saved',
    headerNavigation: '.header__navigation',

    // Popup elements
    popup: '.popup',
    popupSignup: '.popup__signup',
    popupLogin: '.popup__login',
    popupMessage: '.popup__message',
    popupCloseButton: '.popup__button_close',
    popupTitle: '.popup__title',
    popupForm: '.popup__form',
    popupFieldset: '.popup__fieldset',
    popupInput: '.popup__input',
    popupLabel: '.popup__label',
    popupError: '.popup__error',
    popupErrorEmail: '.popup__error_email',
    popupErrorUsername: '.popup__error_username',
    popupErrorPassword: '.popup__error_password',
    popupButtonSubmit: '.popup__button_submit',
    popupLink: '.popup__link',

    // Search elements
    searchForm: '.search__form',
    searchInput: '.search__input',
    searchButton: '.search__button',
    searchError: '.search__error',

    // Articles elements
    articlesMain: '.articles',
    articlesContainer: '.articles__container',
    articlesNotFound: '.articles__not-found',
    articlesPreloader: '.articles__search',
    articlesShowmoreButton: '.articles__button',

    // Card elements
    cardContainer: '.articles__cards-container',
    cardTemplate: '#card-template',
    card: '.card',
    cardButton: '.card__button',
    cardDate: '.card__date',
    cardTitle: '.card__title',
    cardTag: '.card__tag',
    cardImage: '.card__image',
    cardText: '.card__text',
    cardLink: '.card__link',
  },
  months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  params: {
    validPasswordMinLength: 8,
    validPasswordMaxLength: 30,
    validNameMinLength: 2,
    validNameMaxLength: 30,
    validateSearchMinLength: 1,
    validateSearchMaxLength: 30,
    searchTimeSpan: 604800000,
    pageSize: 6,
  },
};

export default CONFIG;
