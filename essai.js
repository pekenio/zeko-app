const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload')
const multiparty = require('connect-multiparty')
const multer  = require('multer')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const upload = multer({ dest: './public/data/uploads/' })

// const multipart = require('connect-multiparty');
// app.use(multipart())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// app.use(fileupload())
app.use(bodyparser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, multipart/form-data,form-data, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zeko-app API',
      version: '1.0.0',
    },
  },
  apis: ['essai.js']
};
const openapiSpecification = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  
app.post('/image/', multer);

app.listen(process.env.PORT || 4000)