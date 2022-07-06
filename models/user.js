const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const User = mongoose.Schema({
    name : {type : String,required : true},
    email : {type : String , required : true , unique:true},
    age : {type : Number , required : true},
    adresse : {type : String , required : false},
    pays : {type : String , required : true},
    sexe : {type : String , required : false},
    password : {type : String , required : true},
    proflimage : {type : String , required : false},
    pseudo : {type : String , required : false},
    auth : {type : Number,required : false},
    otpcode : {type : Number,required : false},
    promotCode:{type: String , require: true},
    promu:{type: Number , required: true},
    biographie : {type : String , required : false}
})

mongoose.plugin(uniqueValidator)
module.exports = mongoose.model('User',User)