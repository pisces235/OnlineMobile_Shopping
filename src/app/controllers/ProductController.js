class ProductController {
  //[GET] /products
  index(req, res) {
    res.render('products');
  }
}

module.exports = new ProductController();
