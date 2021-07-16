const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const Product = require('../models/Product');
const { multipleMongooseToObject, mongooseToObject } = require('../../ulti/mongoose');

class UserController {
  //[GET] /
  login(req, res) {
      res.render('login');
  }
  signin(req, res) {
      res.render('register');
  }
  add(req, res) {
    var id = req.params.id;
    var qty = req.query.qty;
    Product.findOne({ _id: id }, (err, product) => {
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
            price: product.price,
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
              price: product.price,
              image: product.image
            });
          } else {
            req.session.cart.push({
              id: product._id,
              name: product.name,
              qty: 1,
              price: product.price,
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
}

module.exports = new UserController();