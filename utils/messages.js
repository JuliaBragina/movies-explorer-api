const FORBIDDEN_MESSAGE = 'Удалять чужие фильмы нельзя.';
const NOT_FOUND_MESSAGE = 'Запрашиваемый фильм не найден.';
const CONFLICT_USER_MESSAGE = 'Пользователь с такими данными уже существует.';
const CONFLICT_MOVIE_MESSAGE = 'Фильм уже добавлен в коллекцию.';
const BAD_REQUEST_USER_UPDATE_MESSAGE = 'Переданы некорректные данные для обновления данных пользователя.';
const BAD_REQUEST_USER_CREATE_MESSAGE = 'Переданы некорректные данные для создания пользователя.';
const AUTH_ERROR_WRONG_LOGIN_MESSAGE = 'Неправильные логин или пароль.';
const AUTH_ERROR_MESSAGE = 'Необходима авторизация.';
const SUCCES_USER = 'Токен выписан.';
const SUCCES_MOVIE = 'Фильм удален из избранного.';
const LOGOUT = 'Выход';
const VALIDATOR_ERROR_IMAGE = 'Поле image заполнено некорректно.';
const VALIDATOR_ERROR_TRAILERLINK = 'Поле trailerLink заполнено некорректно.';
const VALIDATOR_ERROR_THUMBNAIL = 'Поле thumbnail заполнено некорректно.';

module.exports = {
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_USER_MESSAGE,
  CONFLICT_MOVIE_MESSAGE,
  BAD_REQUEST_USER_UPDATE_MESSAGE,
  BAD_REQUEST_USER_CREATE_MESSAGE,
  AUTH_ERROR_WRONG_LOGIN_MESSAGE,
  AUTH_ERROR_MESSAGE,
  SUCCES_USER,
  SUCCES_MOVIE,
  LOGOUT,
  VALIDATOR_ERROR_IMAGE,
  VALIDATOR_ERROR_TRAILERLINK,
  VALIDATOR_ERROR_THUMBNAIL,
};
