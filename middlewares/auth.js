const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');
const { jwtSecretKey } = require('../utils/config');
const { AUTH_ERROR_MESSAGE } = require('../utils/messages');

const { JWT_SECRET = jwtSecretKey } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError(AUTH_ERROR_MESSAGE);
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw new UnauthorizedError(AUTH_ERROR_MESSAGE);
  }

  req.user = payload;
  next();
};
