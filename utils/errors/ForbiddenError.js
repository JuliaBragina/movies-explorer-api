const { FORBIDDEN_ERROR } = require('../statusCode');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
}

module.exports = {
  ForbiddenError,
};
