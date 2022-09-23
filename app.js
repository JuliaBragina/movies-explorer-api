require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');
const router = require('./routes');
const { NotFoundError } = require('./utils/errors/NotFoundError');
const { pathMongo } = require('./utils/config');

const { PORT = 3000 } = process.env;
const { PATH_MONGO = pathMongo } = process.env;

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(cookieParser());
app.use(helmet());

mongoose.connect(PATH_MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(() => {
  throw new NotFoundError('Страница не найдена.');
});

app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);

app.listen(PORT);
