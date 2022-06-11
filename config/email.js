const nodemailer = require('nodemailer');

exports.send = (to,subject,text)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 2525,
        auth: {
            user: 'azizcoulibaly009@gmail.com',
            pass: '31F3F1EC92D89695DF5E254510B11816D5D1'
        }
    });

       transporter.sendMail({
        from: 'azizcoulibaly009@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: text, // html body
      });
      
      
}


