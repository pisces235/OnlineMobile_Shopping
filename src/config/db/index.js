const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://pisces2305:Dat20011003@cluster0.113a0.mongodb.net/DA_Web?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Connect sucessfuly!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = { connect }