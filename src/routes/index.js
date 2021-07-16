const siteRouter = require('./site');
const productsRouter = require('./products');
const userRouter = require('./user');

function route(app) {
  app.use('/user', userRouter);
  app.use('/products', productsRouter);
  app.use('/', siteRouter);
}

module.exports = route;
