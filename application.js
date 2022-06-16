const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsdoc = YAML.load('./api.yaml');


app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/assets/'));
mongoose.connect('mongodb+srv://coulibaly:Coulibal7@cluster0.fmdjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, multipart/form-data, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use('/user',userRoute)

app.listen(process.env.PORT || 3000)