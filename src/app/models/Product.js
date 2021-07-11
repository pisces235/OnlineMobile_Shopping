const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    capacity: {
        type: Array
    },
    price: {
         type:Number,
         require: true
     },
     color: {
         type: Array
     },
    desc: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    rate: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        require: true
    },
    hotest: {
        type: Boolean,
        require: true
    },
    gallery: {
        type: Array
    }
});