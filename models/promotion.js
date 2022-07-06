const mongoose = require('mongoose')

const Promo = mongoose.Schema({
    promoteur : {type: String , require: false},
    promu : {type : String , require: false}
})

module.exports = mongoose.model('Promotion',Promo)