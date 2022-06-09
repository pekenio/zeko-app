const nodemailer = require('nodemailer');

exports.send = (to,subject,text)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'nmzr3ilb4knjs4yc@ethereal.email',
            pass: 'qsmDzQQXXM9GZNTXj9'
        }
    });

       transporter.sendMail({
        from: 'mail@zeko.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: text, // html body
      });
      
      
}


