const { AYTH_ERROR } = require('./errorCodes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AYTH_ERROR;
  }
}

module.exports = {
  UnauthorizedError,
};
