const productsRouter = require('./products');

function route(app) {
  app.get('/products', productsRouter);
}

module.exports = route;
