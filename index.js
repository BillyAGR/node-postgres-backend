const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, ormErrorHandler, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Its not permited'));
    }
  }
}

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hi my server in express');
});

app.get('/new-path', (req, res) => {
  res.send('Hi, i am new path');
});

app.listen(port, () => {
  console.log('Mi port' + port);
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
