const mongoose = require('mongoose');
const Product = require('../models/Product');
const { multipleMongooseToObject, mongooseToObject } = require('../../ulti/mongoose');

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

class ProductController {
  //[GET] /products
  index(req, res, next) {
    Product.find({})
      .then(products => {
        Product.find({ featured: true }).limit(5)
        .then(featuredproducts => {
          Product.find({ checkdiscount: true }).limit(5)
          .then(discountproducts => {
            res.render('products', { products: multipleMongooseToObject(products), 
            discountproducts: multipleMongooseToObject(discountproducts),
            featuredproducts: multipleMongooseToObject(featuredproducts) });
          })
        })
      })
      .catch(next);
  }
  show(req, res, next) {
    var id = req.params.id;
    Product.findOne({ _id: id }, (err, product) => {
      if(err) console.log(err);
      res.render("detail", { product: mongooseToObject(product) })
    })
  }
  filter (req, res, next) {
    var filter = req.body.filter;
    Product.find({})
      .then(products => {
        Product.find({ featured: true }).limit(5)
        .then(featuredproducts => {
          Product.find({ checkdiscount: true }).limit(5)
          .then(discountproducts => {
            if(filter == "new") {
              products = products.reverse();
            }
            if(filter == "up") {
              products.sort(function (a, b) {
                return a.price - b.price;
              });
            }
      
            if(filter == "down") {
              products.sort(function (a, b) {
                return b.price - a.price;
              });
            }
            res.render('products', { products: multipleMongooseToObject(products), 
            discountproducts: multipleMongooseToObject(discountproducts),
            featuredproducts: multipleMongooseToObject(featuredproducts),
            filter:filter });
          })
        })
      })
      .catch(next);
  }
  search (req, res, next) {
    req.session.search = req.query.search;
    Product.find({})
      .then(products => {
        Product.find({ featured: true }).limit(5)
        .then(featuredproducts => {
          Product.find({ checkdiscount: true }).limit(5)
          .then(discountproducts => {
            var list = [];
            products = multipleMongooseToObject(products);
            for(var i = 0; i < products.length; i++) {
              if(removeAccents(products[i].name.toLowerCase()).indexOf(removeAccents(req.session.search).toLowerCase()) != -1) {
                list.push(products[i]);
              }
            }
            res.render('search', { products: list, 
            discountproducts: multipleMongooseToObject(discountproducts),
            featuredproducts: multipleMongooseToObject(featuredproducts),});
          })
        })
      })
      .catch(next);
  }
  filter_search (req, res, next) {
    var filter = req.body.filter;
    Product.find({})
      .then(products => {
        Product.find({ featured: true }).limit(5)
        .then(featuredproducts => {
          Product.find({ checkdiscount: true }).limit(5)
          .then(discountproducts => {
            var list = [];
            products = multipleMongooseToObject(products);
            for(var i = 0; i < products.length; i++) {
              if(removeAccents(products[i].name.toLowerCase()).indexOf(removeAccents(req.session.search).toLowerCase()) != -1) {
                list.push(products[i]);
              }
            }
            if(filter == "new") {
              list = list.reverse();
            }
            if(filter == "up") {
              list.sort(function (a, b) {
                return a.price - b.price;
              });
            }
      
            if(filter == "down") {
              list.sort(function (a, b) {
                return b.price - a.price;
              });
            }
            res.render('search', { products: list, 
            discountproducts: multipleMongooseToObject(discountproducts),
            featuredproducts: multipleMongooseToObject(featuredproducts),
            filter:filter });
          })
        })
      })
      .catch(next);
  }
}

module.exports = new ProductController();
