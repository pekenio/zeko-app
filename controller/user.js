const User = require("../models/user");
const mailer = require("../config/email");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require('bcrypt')
const pathAvatars = "./assets/avatars/";
const randomstring = require("randomstring");


exports.singnin = (requ, resp, next) => {
  User.findOne({ email: requ.body.email }).then((user) => {
    if (user) {
      resp.status(200).json({status: false, error: "utilisateur existe deja" });
    } else {
        bcrypt.hash(requ.body.password,10)
        .then(hash=>{
          
          const Newuser = new User({
            name: requ.body.name,
            email: requ.body.email,
            age: requ.body.age,
            pays: requ.body.pays,
            adresse: '',
            sexe: '',
            password: hash,
            profimage: '',
            pseudo: '',
            auth: 0,
            biographie: "",
          });

          Newuser.save()
            .then((success) => {
              if (success) {
                resp.status(201).json({status: true, success: "Utilisateur cree avec succes" });
              }
            })
            .catch((err) => {
              resp.status(400).json({status: false, err: err });
            });
      })
      .catch((err) => {
        resp.status(500).json({status: false, err: err });
      });
      
    }
  });
};

exports.login = (requ, resp, next) => {
  User.findOne({ email: requ.body.email })
    .then(result => {
      if (result) {
        bcrypt.compare(requ.body.password,result.password)
        .then(valide =>{
          if(valide){
            const accestoken = jwt.sign({ userId: result._id }, "pekenio2022", {
              expiresIn: "360h",
            });
            resp
              .status(200)
              .json({
                status: true,
                accesID: result._id,
                AuthCode: accestoken,
                nom: result.name,
                prenom: result.lastName,
                age: result.age,
                biographie: result.biographie,
                email: result.email,
                sexe: result.sexe,
                adresse: result.adresse,
                pays: result.pays,
                pseudo: result.pseudo,
              });
          }else{
            resp
            .status(200)
            .json({ status: false, err: "Le mot de passe est incorrect" });
          }
        })
        
      } else {
        resp.status(200).json({ status: false, err: "Utilisateur non trouve" });
      }
    })
    .catch((err) => {
      resp.status(500).json({ status: false, err: "Une erreur est survenue" });
    });
};

exports.getUser = (requ, resp, next) => {
  User.findById(requ.body.userId)
    .exec()
    .then((response) => {
      resp
        .status(200)
        .json({
          status: true,
          nom: response.name,
          prenom: response.lastName,
          age: response.age,
          biographie: response.biographie,
          email: response.email,
          sexe: response.sexe,
          adresse: response.adresse,
          pays: response.pays,
          pseudo: response.pseudo,
          avatar:'http://localhost:3000/user/avatars/'+response.proflimage
        });
    })
    .catch((err) => {
      resp.status(500).json({ status: false, err });
    });
};

exports.updateProfilInfo = (requ, resp, next) => {
  if (requ.body.imgName) {
    User.updateOne(
      { _id: requ.body.userId },
      {
        _id: requ.body.userId,
        name: requ.body.name,
        biographie: requ.body.biographie,
        proflimage: requ.body.imgName,
      }
    )
      .then((effectue) => {
        if (effectue.matchedCount > 0) {
          resp
            .status(200)
            .json({
              status: true,
              success: "Votre modification a ete effectuee avec succes",
            });
        } else {
          resp
            .status(200)
            .json({ status: false, err: "Une erreur est survenue" });
        }
      })
      .catch((err) => {
        resp.status(500).json({ err });
      });
  } else {
    User.updateOne(
      { _id: requ.body.userId },
      {
        _id: requ.body.userId,
        name: requ.body.name,
        lastName: requ.body.lastName,
        biographie: requ.body.biographie,
      }
    )
      .then((effectue) => {
        if (effectue.matchedCount > 0) {
          resp
            .status(200)
            .json({
              status: true,
              success: "Votre modification a ete effectuee avec succes",
            });
        } else {
          resp
            .status(200)
            .json({ status: false, err: "Une erreur est survenue" });
        }
      })
      .catch((err) => {
        resp.status(500).json({ err });
      });
  }
};
exports.findPseudo = (requ,resp,next) =>{
    User.findOne({ pseudo: requ.body.pseudo })
    .then((use) => {
        if(use){
            if(use._id == requ.body.userId){
                resp.status(200).json({ status: true, err: 'Ce pseudo vous appartient deja' });
            }else{
                resp.status(200).json({ status: true, err: 'Ce pseudo est deja pris' });
            }
            
        }else{
            resp.status(200).json({ status: true,success: 'Pseudo disponible' })
        }
        
    })
    .catch((err) => {
        resp.status(500).json({ err });
    });
}
exports.updatePseudo = (requ, resp, next) => {
    User.updateOne(
        { _id: requ.body.userId },
        {
          _id: requ.body.userId,
          pseudo:requ.body.pseudo
        }
    )
    .then(resp.status(200).json({ status: true, success: 'Votre pseudo a bien été enregistré' }))
    .catch((err) => {
        resp.status(200).json({ status: false, err });
    })
}

exports.deleteAvatars = (requ, resp, next) => {
  if (requ.body.imgName !== undefined && requ.body.imgName !=='') {
    User.findOne({ _id: requ.body.userId })
      .then((use) => {
        if(use.proflimage !== '' && use.proflimage !== undefined){
            fs.unlink(pathAvatars.replace("//", "/") + use.proflimage, (err) => {
            if (err) {
                resp.status(200).json({ status: false, err });
                next()
            } else {
                next()
            }
            })
        }else{
            next()
        }
        
      })
      .catch((err) => {
        next()
      });
  } else {
    next();
  }
}

/**En cas d'unique modification */

// exports.updateProfilAvatar = (requ, resp, next) => {
//   if (requ.body.imgName) {
//     User.updateOne(
//       { _id: requ.body.userId },
//       {
//         proflimage: requ.body.imgName,
//       }
//     )
//       .then((success) => {
//         if (success) {
//           resp
//             .status(200)
//             .json({ status: true, success: "Photo enregistree avec succes" });
//         } else {
//           resp
//             .status(200)
//             .json({
//               status: false,
//               err: "Votre image n'a pas pu etre enregistree",
//             });
//         }
//       })
//       .catch((err) => {
//         resp.status(500).json({ status: false, err: err });
//       });
//   } else {
//     resp
//       .status(200)
//       .json({ status: false, err: "Veillez choisir une image svp" });
//   }
// };

exports.updateEmail = (requ, resp, next) => {
  User.updateOne(
    { _id: requ.body.userId },
    {
      _id: requ.body.userId,
      email: requ.body.email,
    }
  )
    .where({ otpcode: requ.body.otpcode })
    .then((success) => {
      if (success.matchedCount > 0) {
        resp.status(200).json({ status: true, success: "Votre adresse email a ete modifiee avec succes" });
        next()
      } else {
        resp.status(200).json({ status: false, err: "Code incorrect" });
      }
    })
    .catch((err) => {
      resp.status(500).json({ status: false, err });
    });
}

exports.updatePassword = (reau,resp,next) =>{
  User.findOne({ _id: requ.body.userId })
    .then((result) => {
      if (result) {
        bcrypt.compare(requ.body.lastPassword,result.password)
        .then(valide =>{
          if(valide){
            bcrypt.hash(requ.body.newPassword,10)
            .then(hash =>{
              User.updateOne({_id : requ.body.userId},{
                _id : requ.body.userId,
                password : hash
              })
            })
          }else{
            resp
            .status(200)
            .json({ status: false, err: "Le mot de passe est incorrect" });
          }

        })
        .catch((err) => {
          resp.status(500).json({ status: false, err });
        });
        
      } else {
        resp.status(200).json({ status: false, err: "Utilisateur non trouve" });
      }
    })
    .catch((err) => {
      resp.status(500).json({ status: false, err });
    });
}

exports.updateOtpcode = (requ, resp, next) => {
  const token = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  User.updateOne(
    { _id: requ.body.userId },
    {
      _id: requ.body.userId,
      otpcode: token,
    }
  )
    .then(success => {
      next()
    })
    .catch((err) => {
      resp.status(500).json({ status: false, err });
    });
};

exports.updateAuth = (requ,resp,next) => {
  User.updateOne(
    { _id: requ.body.userId },
    {
      _id: requ.body.userId,
      auth: requ.body.auth,
    }
  )
  .then(success => {
    if(success.matchedCount > 0){
      resp.status(200).json({ status: true, success: 'Modification effectuee' });
    }else{
      resp.status(200).json({ status: false, err: "Une erreur est survenue" });
    }
    
  })
  .catch((err) => {
    resp.status(500).json({ status: false, err });
  });
}
exports.sendOtpCode = (requ, resp, next) => {
  User.findOne({ _id: requ.body.userId })
    .then((result) => {
      if (result) {
        mailer.send(
          result.email,
          "Code d'authentification",
          "Votre code d'authentification est " + result.otpcode
        );
        resp.status(200).json({ status: true, success: "Code transfere" });
      } else {
        resp
          .status(200)
          .json({ status: false, result: "Une erreur vient de se produire" });
      }
    })
    .catch((err) => {
      resp.status(500).json({ status: false, err });
    });
};

exports.deleteOtpCode = (requ, resp, next) => {
  User.updateOne(
    { _id: requ.body.userId },
    {
      _id: requ.body.userId,
      otpcode: "",
    }
  )
    .then((success) => {
      if (success.matchedCount > 0) {
        next();
      }
    })
    .catch((err) => {
      resp.status(500).json({ status: false, err });
    });
};
