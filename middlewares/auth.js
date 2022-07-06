const jwt = require('jsonwebtoken')
const Admins = require('../models/admins')
exports.authentification = (requ,resp,next) => {
    const token = requ.headers.token
    jwt.verify(token,'pioupiou',(err,decodeToken) =>{
        if(err){
            resp.status(500).json({status:false,err : "Accès refusé"})
        }else{
            const id = decodeToken.adminId
            Admins.findOne({ _id : id})
            .then(success =>{
                if(success){
                    next()
                }else{
                    resp.status(200).json({status:false,err : "Accès refusé"})
                }
            })
            .catch(err =>{
                resp.status(404).json({status:false,err : "Une erreur est survenue"})
            })
        }
    })
}
