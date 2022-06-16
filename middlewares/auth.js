const jwt = require('jsonwebtoken')
const User = require('../models/user')
exports.authentification = (requ,resp,next) => {
    const token = requ.headers.token
    jwt.verify(token,'pekenio2022',(err,decodeToken) =>{
        if(err){
            resp.status(500).json({status:false,err : "Le token d'authentification est ivalide"})
        }else{
            const id = decodeToken.userId
            User.findOne({_userId : id})
            .then(sucees =>{
                if(sucees){
                    next()
                }else{
                    resp.status(200).json({status:false,err : "Utilisateur non inconnu"})
                }
            })
            .catch(err =>{
                resp.status(404).json({status:false,err : "Une erreur est survenue"})
            })
        }
    })
}