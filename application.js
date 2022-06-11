const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const multipart = require('connect-multiparty');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/assets/'));
mongoose.connect('mongodb+srv://coulibaly:Coulibal7@cluster0.fmdjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

  // var options = {
  //   explorer: true,
  //   swaggerOptions: {
  //     urls: [
  //       {
  //         url: 'http://petstore.swagger.io/v2/swagger.json',
  //         name: 'Spec1'
  //       },
  //       {
  //         url: 'http://petstore.swagger.io/v2/swagger.json',
  //         name: 'Spec2'
  //       }
  //     ]
  //   }
  // }
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, multipart/form-data, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(multipart())

app.use('/user',userRoute)

app.listen(process.env.PORT || 3000)