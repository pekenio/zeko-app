const express = require('express')
const route = express.Router()
const userControll = require('../controller/user')

route.post('/singnin/',userControll.singnin,userControll.updateOtpcode)
route.post('/login/',userControll.updateOtpcode,userControll.login)
route.post('/find/',userControll.getUser)
route.put('/updateprofil/info/',userControll.updateProfilInfo)
route.put('/updateprofil/email/',userControll.updateEmail,userControll.updateOtpcode)
route.post('/otpcode/',userControll.updateOtpcode,userControll.sendOtpCode)

module.exports = route