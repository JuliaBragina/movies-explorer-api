const Movies = require('../models/movie');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { ConflictError } = require('../utils/errors/ConflictError');
const { CREATED } = require('../utils/statusCode');
const {
  CONFLICT_MOVIE_MESSAGE,
  NOT_FOUND_MESSAGE, FORBIDDEN_MESSAGE, SUCCES_MOVIE,
} = require('../utils/messages');

const getMovie = (req, res, next) => {
  const userId = req.user.id;
  Movies.find({ owner: userId })
    .then((movie) => res.send(movie))
    .catch(next);
};

const findMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    thumbnail,
    nameRU,
    nameEN,
    owner: req.user.id,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { movieId } = req.body;
  Movies.findOne({ $and: [{ owner: req.user.id }, { movieId }] })
    .then((result) => {
      if (!result) {
        findMovie(req, res, next);
      } else {
        throw new ConflictError(CONFLICT_MOVIE_MESSAGE);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movies.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      if (movie.owner.equals(req.user.id)) {
        return movie.delete()
          .then(() => res.send({ message: SUCCES_MOVIE }))
          .catch(next);
      }
      throw new ForbiddenError(FORBIDDEN_MESSAGE);
    })
    .catch(next);
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
