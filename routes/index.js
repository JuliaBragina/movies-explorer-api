const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createUser, login, logout,
} = require('../controllers/users');
const { validSignup, validSignin } = require('../utils/validation');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signup', validSignup, createUser);
router.post('/signin', validSignin, login);
router.get('/signout', logout);

router.use(auth);

router.use(usersRouter);
router.use(moviesRouter);

module.exports = router;
