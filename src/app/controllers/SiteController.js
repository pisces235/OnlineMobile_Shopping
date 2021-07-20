const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
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
  checkout (req, res) {
    res.render('checkout', { cart: req.session.cart });
  }
  order (req, res) {
    var cart = req.session.cart;
    var fullname = req.query.fullname;
    var email = req.query.email;
    var phoneNumber = req.query.phoneNumber;
    var address = req.query.address;
    if( fullname == '') {
      req.session.sessionFlash = {
        type: 'danger',
        message: "Vui lòng nhập họ tên"
      }
      res.redirect('back')
    }
    if( email == '') {
      req.session.sessionFlash = {
        type: 'danger',
        message: "Vui lòng nhập email"
      }
      res.redirect('back')
    }
    if( phoneNumber == '') {
      req.session.sessionFlash = {
        type: 'danger',
        message: "Vui lòng nhập số điện thoại"
      }
      res.redirect('back')
    }
    if( address == '') {
      req.session.sessionFlash = {
        type: 'danger',
        message: "Vui lòng nhập địa chỉ"
      }
      res.redirect('back')
    }

    User.findOne({ _id: req.user._id }, (err, user) => {
      if(err) console.log(err);
      user.orders.push({cart: cart, fullname: fullname, email:email, phoneNumber:phoneNumber, address: address});
      user.save();
    })
    delete req.session.cart;
    res.render('orders');
  }
}

module.exports = new SiteController();
