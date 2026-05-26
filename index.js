const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');

const {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handler');

const app = express();

const PORT = process.env.PORT || 3000;

const WHITE_LIST = [
  'http://localhost:8080',
  'http://127.0.0.1:5500',
  'https://myapp.co',
];

/**
 * Middlewares
 */
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const isAllowedOrigin =
        WHITE_LIST.includes(origin) || !origin;

      if (isAllowedOrigin) {
        return callback(null, true);
      }

      return callback(new Error('Origin not allowed'));
    },
  })
);

/**
 * Health check
 */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API running successfully',
  });
});

app.get('/new-path', (req, res) => {
  res.status(200).json({
    message: 'New path response',
  });
});

/**
 * Routes
 */
routerApi(app);

/**
 * Error handlers
 */
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

/**
 * Server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
