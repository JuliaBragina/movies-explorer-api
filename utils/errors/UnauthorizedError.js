const { AUTH_ERROR } = require('../statusCode');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR;
  }
}

module.exports = {
  UnauthorizedError,
};
