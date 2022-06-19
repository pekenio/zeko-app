const express = require('express')
const multer = require('../config/multer')
const route = express.Router()
const userControll = require('../controller/user')
const userAuth = require('../middlewares/auth')
const deleteAvatars = require('../middlewares/deleteFile')

route.post('/singnin/',userControll.singnin,userControll.sendOtpCode)
route.post('/login/',userControll.login)
route.post('/getuser/',userAuth.authentification,userControll.getUser)
route.put('/updateprofil/info/',userAuth.authentification,multer,userControll.deleteAvatars,userControll.updateProfilInfo)
route.put('/updateprofil/email/',userAuth.authentification,userControll.updateEmail,userControll.updateOtpcode)
route.put('/updateprofil/newpassword/',userAuth.authentification,userControll.updatePassword)
route.post('/otpcode/',userAuth.authentification,userControll.updateOtpcode,userControll.sendOtpCode)
route.post('/updateprofil/findpseudo/',userAuth.authentification,userControll.findPseudo)
route.put('/updateprofil/newpseudo/',userAuth.authentification,userControll.updatePseudo)

module.exports = route