const mongoose = require('mongoose');
const Product = require('../models/Product');
const { multipleMongooseToObject } = require('../../ulti/mongoose');

class SiteController {
  //[GET] /
  index(req, res, next) {
    Product.find({})
      .then(products => {
        Product.find({ featured: true }).limit(9)
        .then(featuredproducts => {
          Product.find({ checkdiscount: true }).limit(4)
          .then(discountproducts => {
            var tempproducts = products.reverse();
            var newproducts = [];
            for(var i = 0; i < 10; i++) {
              newproducts.push(tempproducts[i]);
            }
            res.render('home', { discountproducts: multipleMongooseToObject(discountproducts), 
            newproducts: multipleMongooseToObject(newproducts),
            featuredproducts: multipleMongooseToObject(featuredproducts) })
          })
        })
      })
      .catch(next);
  }
  filter (req, res, next) {
    var filter = req.body.filter;
    Product.find({})
    .then((err, products) => {
      if(err) console.log(err);
      if(filter == "new") {
        products = products.reverse();
        res.render("products", { products })
      }
      if(filter == "up") {
        products.sort(function (a, b) {
          return b.price - a.price;
        });
        res.render("products", { products })
      }

      if(filter == "up") {
        products.sort(function (a, b) {
          return a.price - b.price;
        });
        res.render("products", { products })
      }
    })
    .catch(next);
  }
  cart (req,res) {
    res.render('cart', { cart : req.session.cart })
  }
}

module.exports = new SiteController();
