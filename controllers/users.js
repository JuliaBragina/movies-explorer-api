const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError } = require('../utils/errors/BadRequestError');
const { ConflictError } = require('../utils/errors/ConflictError');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');
const { DUBLICATION_ERROR } = require('../utils/statusCode');
const { jwtSecretKey } = require('../utils/config');
const { CREATED } = require('../utils/statusCode');
const {
  BAD_REQUEST_USER_UPDATE_MESSAGE,
  CONFLICT_USER_MESSAGE,
  BAD_REQUEST_USER_CREATE_MESSAGE, AUTH_ERROR_WRONG_LOGIN_MESSAGE, SUCCES_USER, LOGOUT,
} = require('../utils/messages');

const { JWT_SECRET = jwtSecretKey } = process.env;

const getUserMe = (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user.id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(userId, { email, name }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_USER_UPDATE_MESSAGE));
        return;
      }
      if (err.code === DUBLICATION_ERROR) {
        next(new ConflictError(CONFLICT_USER_MESSAGE));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => res.status(CREATED).send({
          email: user.email,
          name: user.name,
        }))
        .catch((err) => {
          if (err.code === DUBLICATION_ERROR) {
            next(new ConflictError(CONFLICT_USER_MESSAGE));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestError(BAD_REQUEST_USER_CREATE_MESSAGE));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let userId;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(AUTH_ERROR_WRONG_LOGIN_MESSAGE));
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError(AUTH_ERROR_WRONG_LOGIN_MESSAGE));
      }
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true, secure: true,
      })
        .send({ message: SUCCES_USER });
    })
    .catch(next);
};

const logout = (req, res) => res.clearCookie('jwt').send({ message: LOGOUT });

module.exports = {
  createUser,
  getUserMe,
  updateUser,
  login,
  logout,
};
