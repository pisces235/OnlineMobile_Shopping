const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product');
const { multipleMongooseToObject, mongooseToObject } = require('../../ulti/mongoose');


class UserController {
  //[GET] /
  login(req, res) {
    var messages = req.flash('error');
    res.render("login", { csrfToken:  req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  }
  register(req, res) {
    var messages = req.flash('error');
    res.render("register", { csrfToken:  req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  }
  register_post(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phoneNumber = req.body.phoneNumber;

    body('name', 'Name is required').notEmpty();
    body('email', 'Email is required').isEmail();
    body('password', 'Password is required').isLength({ min: 8 }).notEmpty();
    body('phoneNumber', 'Phone number is required').notEmpty();

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('register',  { errors: errors.array() });
    } else {
      User.findOne({ email: email }, (err, user) => {
        if(err) console.log(err);

        if(user) {
          req.flash('danger', 'Email đã được sử dụng, vui lòng chọn email khác');
          res.redirect('/user/register');
        } else {
          var User = new User({
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(User.password, salt, (err, hash) => {
              if(err) console.log(err);

              User.password = hash;

              User.save((err) => {
                if(err) console.log(err);
                else {
                  req.flash('success', 'Bạn đã đăng ký thành công');
                  res.redirect('/user/login')
                }
              })
            })
          })

        }
      })
    }

  }
  add(req, res) {
    var id = req.params.id;
    var qty = req.query.qty;
    Product.findOne({ _id: id }, (err, product) => {
      var price = 0;
      if(product.checkdiscount == true) price = product.price - (product.price * product.discount /100);
      else price = product.price;
      if(err) console.log(err);
      product = mongooseToObject(product);
      if (typeof req.session.cart == "undefined") {
        if(typeof qty != "undefined") {
          req.session.cart = [];
          req.session.cart.push({
            id: product._id,
            name: product.name,
            qty: parseInt(qty),
            price: product.price,
            image: product.image
          });
        } else {
          req.session.cart = [];
          req.session.cart.push({
            id: product._id,
            name: product.name,
            qty: 1,
            price: price,
            image: product.image
          });
        }
      } else {
        var cart = req.session.cart;
        var newItem = true;

        for (var i =0 ; i< cart.length; i++) {
          if(cart[i].id == id) {
            if(typeof qty == "string") {
              cart[i].qty += parseInt(qty);
              newItem = false;
              break;
            } else {
              cart[i].qty += 1;
              newItem = false;
              break;
            }
            
          }
        }

        if (newItem) {
          if(typeof qty == "string") {
            req.session.cart.push({
              id: product._id,
              name: product.name,
              qty: parseInt(qty),
              price: price,
              image: product.image
            });
          } else {
            req.session.cart.push({
              id: product._id,
              name: product.name,
              qty: 1,
              price: price,
              image: product.image
            });
          }
        }
        
      }
      if(typeof qty == "string") {
        req.session.sessionFlash = {
          type: 'info',
          message: "Đã thêm " + qty + " " + product.name.toString() +" vào giỏ hàng"
        }
      } else {
        req.session.sessionFlash = {
          type: 'info',
          message: product.name.toString() +" đã thêm vào giỏ hàng"
        }
      }
      res.redirect("back");
    });
    
  }
  update(req, res) {
    var id = req.params.id;
    var cart = req.session.cart;
    var qty = req.query.qty;
    var action = req.query.action;
    
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        cart[i].qty= qty;
        if(action == "clear") {
          cart.splice(i, 1);
              if(cart.length == 0) 
                delete req.session.cart;
        }
      }
    }
    
    
    res.redirect('back');
  }
  logout(req, res, next) {
    req.logout();
    res.redirect('/')
  }
}

module.exports = new UserController();