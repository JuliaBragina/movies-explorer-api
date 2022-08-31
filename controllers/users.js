const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { BadRequestError } = require('../utils/errors/BadRequestError');
const { ConflictError } = require('../utils/errors/ConflictError');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');

const { JWT_SECRET = 'dev-secret' } = process.env;

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
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные не прошли валидацию на сервере.'));
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
        .then((user) => res.status(201).send({
          email: user.email,
          name: user.name,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с такими данными уже существует.'));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные для создания пользователя.'));
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
        return Promise.reject(new NotFoundError('Неправильные почта или пароль'));
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError('Неверные логин или пароль'));
      }
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
      return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'None' })
        .send({ message: 'Токен выписан' });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUserMe,
  updateUser,
  login,
};
