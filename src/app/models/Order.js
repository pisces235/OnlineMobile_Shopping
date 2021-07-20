const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    cart: {
        type: Array,
        require: true
    },
    user: {
        type: Object,
        require: true
    }
});

module.exports = mongoose.model('Order', Order);