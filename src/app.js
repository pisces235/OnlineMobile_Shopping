const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');

const route = require('./routes/index');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();

const port = process.env.PORT || 3000;



app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

//route
route(app);

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});
