const mongoose = require('mongoose')

 function connect() {
    try {
        mongoose.connect('mongodb+srv://pisces2305:Dat20011003@cluster0.113a0.mongodb.net/DA_Web?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect sucessfuly!')
    } catch (error) {
        console.log('Connect failure!')
    }
}

module.exports = { connect }