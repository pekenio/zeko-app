const fs = require('fs')
const User = require('../models/user')

exports.deleteAvatars = (requ,resp,next)=>{
    console.log(requ.body)
    User.findOne({ _id : requ.body.userId})
    .then(use =>{
        console.log(use)
    })
    .catch(err=>{
        resp.status(500).json({status:false,err})
    })
    
}