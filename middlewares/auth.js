const jwt = require('jsonwebtoken')
const User = require('../models/user')
exports.authentification = (requ,resp,next) => {
    const token = requ.body.token
    jwt.verify(token,'pekenio2022',(err,decodeToken) =>{
        if(err){
            resp.status(500).json({err : "Le token d'authentification est ivalide"})
        }else{
            const id = decodeToken.userId
            User.findOne({_userId : id})
            .then(sucees =>{
                if(sucees){
                    next()
                }else{
                    resp.status(500).json({err : "Utilisateur non inconnu"})
                }
            })
            .catch(err =>{
                resp.status(404).json({erreur : "Une erreur est survenue"})
            })
        }
    })
}