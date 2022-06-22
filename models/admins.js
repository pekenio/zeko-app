const mongoose = require('mongoose')
const Admins = mongoose.Schema({
    name: {type: String , require: true}
})

module.exports = mongoose.model('Admins',Admins)