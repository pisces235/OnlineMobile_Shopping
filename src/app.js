const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const route = require('./routes/index');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
var store = new MongoDBStore({
  uri: 'mongodb+srv://pisces2305:Dat20011003@cluster0.113a0.mongodb.net/DA_Web?retryWrites=true&w=majority',
  collection: 'mySessions'
});

const port = process.env.PORT || 5000;



app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('dev'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: store,
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

//Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      vnd:  num => { 
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      discountprice: (num1, num2) => { 
        var price = num1 - (num1 * num2 / 100);
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      filter: (filter) => {
        var ret = `<select name='filter' id='filter'  onchange='this.form.submit()'>`;
        if(filter == "new" || typeof filter == "undefined")
          ret += `<option value='new' selected >Mới</option>
          <option value='up'>Giá tăng dần</option>
          <option value='down'>Giá giảm dần</option>`;
        if(filter == "up")
        ret += `<option value='new'  >Mới</option>
        <option value='up' selected>Giá tăng dần</option>
        <option value='down'>Giá giảm dần</option>`;

        if(filter == "down")
        ret += `<option value='new'  >Mới</option>
        <option value='up'>Giá tăng dần</option>
        <option value='down'  selected>Giá giảm dần</option>`;
        

        return ret + `</select>`;
      
      },
      itemtotal:(a, b) => {
        return a * b;
      },
      subtotal: (cart) => {
        var subtotal = 0;
        for(var i = 0; i < cart.length; i++) {
          subtotal += cart[i].price * cart[i].qty;
        }
        return subtotal;
      }
    }
  }),
);

app.get('*', (req, res, next) => {
  res.locals.cart = req.session.cart;
  res.locals.search = req.session.search;
  next(); 
})

//route
route(app);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});
