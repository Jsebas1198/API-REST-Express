const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;
//error middleware

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');
//middleware for post method
app.use(express.json());

//we  create a whitelist of origins that are allowed to access the api
const whitelist = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://127.0.0.1:5500',
  'http://myapp.com',
];

const options = {
  origin: function (origin, callback) {
    //|| !origin is for cors to accept the same origin request
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

//cors function as a middleware, for this configurations we accept any origin that calls the api
// app.use(cors());

//with this configuration we control who can access our api
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!, my first server on EXPRESS');
});

app.get('/new-route', (req, res) => {
  res.send('Hi, a new route');
});

routerApi(app);

//it should be in a secuential order and ager the router
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// app.get('/categories', (req, res) => {
//   res.send('Hello World!');
// });

// //http://localhost:3000/users/?limit=10&offset=90
// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({ limit, offset });
//   } else {
//     res.send('No limit and offset');
//   }
// });

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   });
// });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
