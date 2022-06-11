const express = require('express')
const multer = require('../config/firebase')
const route = express.Router()
const userControll = require('../controller/user')
const userAuth = require('../middlewares/auth')

route.post('/singnin/',userControll.singnin,userControll.sendOtpCode)
route.post('/login/',userControll.updateOtpcode,userControll.login)
route.post('/getuser/',userAuth.authentification,userControll.getUser)
route.put('/updateprofil/info/',userAuth.authentification,userControll.updateProfilInfo)
route.post('/updateprofil/avatar/',userAuth.authentification,multer,userControll.updateProfilAvatar)
route.put('/updateprofil/email/',userAuth.authentification,userControll.updateEmail,userControll.updateOtpcode)
route.post('/otpcode/',userAuth.authentification,userControll.updateOtpcode,userControll.sendOtpCode)

module.exports = route