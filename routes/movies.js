const router = require('express').Router();
const { validMovies, validMovieId } = require('../utils/validation');
const {
  getMovie, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovie);
router.post('/movies', validMovies, createMovie);
router.delete('/movies/:movieId', validMovieId, deleteMovie);

module.exports = router;
