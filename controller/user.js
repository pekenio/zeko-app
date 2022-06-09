const User = require("../models/user");
const mailer = require("../config/email");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
exports.singnin = (requ,resp,next)=>{
   User.findOne({email : requ.body.email})
   .then(user =>{
       if(user){
           resp.status(200).json({error : 'utilisateur existe deja'})
       }else{
            const Newuser =  new User({
                name : requ.body.name,
                lastName : requ.body.lastName,
                email : requ.body.email,
                age : requ.body.age,
                adresse : requ.body.adresse,
                pays : requ.body.pays,
                sexe : requ.body.sexe,
                password : '',
                profimage : '',
                pseudo : '',
                auth : 0,
                biographie : ''
            })
            Newuser.save()
            .then(success =>{
                if(success){
                    resp.status(201).json({cree : 'Utilisateur cree avec succes'})
                }
            })
            .catch(err =>{
                resp.status(400).json({err:err})
            })
       }
   })
}

exports.login = (requ,resp,next)=>{
    User.findOne({email : requ.body.email})
    .then(result=>{
        if(result){
            if(result.password.trim() !== ""){
                const accestoken =  jwt.sign({userId : result._id},'pekenio2022',{ expiresIn: '24h' })
                resp.status(200).json({accestoken})
            }else{
    
               resp.status(300).json({err : 'Inscription non finalisee nous vous envoyons un mail pour la finaliser'})
               this.sendOtpCode()
            }
        }else{
            resp.status(404).json({err:"Utilisateur non trouve"})
        }
    })
    .catch(err=>{
        resp.status(500).json({err})
    })
}

exports.getUser = (requ,resp,next)=>{
    User.findById(requ.body.id).exec()
    .then(response =>{
        resp.status(200).json({response})
    })
}

exports.updateProfilInfo = (requ,resp,next)=>{
    User.updateOne({_id : requ.body.userId},{
        _id : requ.body.userId ,
        name : requ.body.name , 
        lastName : requ.body.lastName,
        biographie : requ.body.biographie
    })
    .then(effectue =>{
        if(effectue){
            resp.status(200).json({success : 'Votre modification a ete une reussite'})
        }else{
            resp.status(400).json({error : 'Une erreur est survenue'})
        }
    })
    .catch(err=>{
        resp.status(500).json({err})
    })
}

exports.updateProfilName = ()=>{
    User.updateOne({_id : requ.body.userId},{
        _id : requ.body.userId,
        proflimage : requ.body.profimage
    })
}

exports.updateEmail = (requ,resp,next)=>{
    User.updateOne({_id : requ.body.userId , otpcode : requ.body.otpcode},{
        _id : requ.body.userId,
        email : requ.body.email
    })
    .where({otpcode : requ.body.otpcode})
    .then(success =>{
        if(success.matchedCount > 0){
            next()
        }else{
            resp.status(404).json({error : "Code d'authentification incorrect"})
        }
    })
    .catch(err =>{
        resp.status(500).json({err})
    })
}

exports.updateOtpcode = (requ,resp,next)=>{
    const token =  randomstring.generate({
        length : 6,
        charset : 'numeric'
    })
    User.updateOne({_id : requ.body.userId},{
        _id : requ.body.userId,
        otpcode : token
    })
    .then(success =>{
        next()
    })
    .catch(err =>{
        resp.status(400).json({err})
    })
}

exports.sendOtpCode = (requ,resp,next)=>{
    User.findOne({_id : requ.body.userId})
    .then(result =>{
        if(result){
            mailer.send(result.email,"Code d'authentification","Votre code d'authentification est "+ result.otpcode)
            resp.status(200).json({success : 'Code transfere'})
        }else{
            resp.status(400).json({result : 'Une erreur vient de se produire'})
        }
    })
    .catch(err =>{
        resp.status(500).json({err})
    })

}

exports.deleteOtpCode = (requ,resp,next)=>{
    User.updateOne({_id : requ.body.userId},{
        _id : requ.body.userId,
        otpcode : ''
    })
    .then(success =>{
        if(success.matchedCount > 0){
            next()
        }
    })
    .catch(err =>{
        resp.status(500).json({err})
    })
}