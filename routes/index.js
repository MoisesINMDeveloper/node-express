const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
<<<<<<< HEAD
const orderRouter = require('./orders.router');
=======
>>>>>>> ebed3db7d7802dfb851b3f5c9c12d6ca12567074

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
<<<<<<< HEAD
  router.use('/orders', orderRouter);
=======
>>>>>>> ebed3db7d7802dfb851b3f5c9c12d6ca12567074
}

module.exports = routerApi;
