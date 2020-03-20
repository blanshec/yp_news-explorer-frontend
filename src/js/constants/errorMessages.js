const ERRORS = {
  // API Errors
  unreachable: 'Ошибка соеденения. Провертье подключение к сети',
  badRequest: 'Ошибка запроса',
  badSignup: 'Ошибка регистрации пользователя',
  badSignin: 'Невероное имя пользователя или пароль',
  badSignout: 'Ошибка при выходе пользователя',
  badSearchQuery: 'Ошибка запроса новостей',
  badSavedArticlesRequest: 'Ошибка запроса сохраненных статей',
  unableAuth: 'Используются HTTP Cookie. Нельзя залогиниться из localhost',
  unableSaveArticle: 'Невозможно сохранить статью',
  unableDeleteArticle: 'Невозможно удалить статью',
  searchQueryTooLong: 'Поисковый запрос слишком длинный',

  // Validation Errors
  inputOutOfBound: 'Слишком много полей ввода',
  emailIsInvalid: 'Неверный формат ввода',
  emailRequired: 'Введите email',
  passwordIsInvalid: 'Длина пароля должна быть от 8-ми до 30-ти символов',
  passwordRequired: 'Введите пароль',
  usernameRequired: 'Введите имя пользователя',
  usernameIsInvalid: 'Имя пользователя должно быть от 2-ух до 30-ти символов',
  searchQueryIsInvalid: 'Поисковый запрос должен быть от 1-го до 30-ти символов',
};

export default ERRORS;
