const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { VALIDATOR_ERROR_IMAGE, VALIDATOR_ERROR_TRAILERLINK, VALIDATOR_ERROR_THUMBNAIL } = require('./messages');

const validSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validUsersMe = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(VALIDATOR_ERROR_IMAGE);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(VALIDATOR_ERROR_TRAILERLINK);
    }),
    movieId: Joi.number().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(VALIDATOR_ERROR_THUMBNAIL);
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validSignup,
  validSignin,
  validUsersMe,
  validMovies,
  validMovieId,
};
