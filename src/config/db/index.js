const mongoose = require('mongoose')

 function connect() {
    try {
        mongoose.connect('mongodb+srv://pisces2305:Dat@20011003cluster0.113a0.mongodb.net/DA_Web?retryWrites=true&w=majority', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        })
        console.log('Connect sucessfuly!')
    } catch (error) {
        console.log('Connect failure!')
    }
}

module.exports = { connect }