const express = require('express')
const app = express();
const multer = require('multer')
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload')
const multipart = require('connect-multiparty');
app.use(multipart())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use(fileupload())
app.use(bodyparser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, multipart/form-data, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.post('/user/',(requ,resp,next)=>{
    resp.json({image:requ.files,autre:requ.body})
})

app.listen(process.env.PORT || 4000)