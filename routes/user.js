const express = require('express')
const firebase = require('../config/multer')
const route = express.Router()
const userControll = require('../controller/user')
const userAuth = require('../middlewares/auth')
const deleteAvatars = require('../middlewares/deleteFile')

route.post('/singnin/',userControll.singnin,userControll.sendOtpCode)
route.post('/login/',userControll.updateOtpcode,userControll.login)
route.post('/getuser/',userAuth.authentification,userControll.getUser)
route.put('/updateprofil/info/',userAuth.authentification,userControll.updateProfilInfo)
route.put('/updateprofil/avatar/',userAuth.authentification,firebase,userControll.updateProfilAvatar)
route.put('/updateprofil/email/',userAuth.authentification,userControll.updateEmail,userControll.updateOtpcode)
route.post('/otpcode/',userAuth.authentification,userControll.updateOtpcode,userControll.sendOtpCode)

module.exports = route