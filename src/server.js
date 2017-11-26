// Récupération des librairies de base permettant de faire un serveur d'API
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import exphbs from "express-handlebars";
import moment from "moment";

// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku
import config from "./config";
import HandlebarsConfig from "./helpers/HandlebarsConfig";

// Récupération des controllers
import SeedDbController from "./controllers/SeedDbController";
import HomeController from "./controllers/HomeController";
import PlaceController from "./controllers/PlaceController";
import UserUpdateController from "./controllers/UserUpdateController";
//import AroundController from "./controllers/AroundController";

// Configuration du serveur
const viewsPath = __dirname + '/views/';
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(favicon(path.resolve('./src/assets/favicon.png')));

server.use(express.static(path.resolve('./src/assets')));
server.set('views', path.resolve('./src/views'));
server.engine('.hbs', exphbs(HandlebarsConfig));
server.set('view engine', '.hbs');

server.set('port', (process.env.PORT || 5000));
server.listen(server.get('port'), () => {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée
mongoose.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + config.bddUri, {}, (err, res) => {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + config.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + config.bddUri);
  }
});


// Routes pour initialiser la base
server.post('/seeddb', SeedDbController.seedDb);

// Routes pour les vues
server.get('/', HomeController.getIndex);

server.get('/places', PlaceController.getPlaces);
server.get('/places/around/:mylat/:mylng', PlaceController.getPlacesAround);
server.get('/places/id/:id', PlaceController.getPlace);
server.get('/places/create', PlaceController.getCreatePlace);
server.post('/places/create', PlaceController.postCreatePlace);
server.get('/places/update/:id', PlaceController.getUpdatePlace);
server.post('/places/update/:id', PlaceController.postUpdatePlace);
server.get('/places/delete/:id', PlaceController.getDeletePlace);

// Pas de majuscules dans les URLs ;)
server.get('/userupdates', UserUpdateController.getUserUpdates);
server.get('/userupdates/id/:id', UserUpdateController.getUserUpdate);
server.get('/userupdates/create', UserUpdateController.getCreateUserUpdate);
server.post('/userupdates/create', UserUpdateController.postCreateUserUpdate);
server.get('/userupdates/update/:id', UserUpdateController.getUpdateUserUpdate);
server.post('/userupdates/update/:id', UserUpdateController.postUpdateUserUpdate);
server.get('/userupdates/delete/:id', UserUpdateController.getDeleteUserUpdate);

// Nouvelle route 
//server.get('/arounds', AroundController.getArounds);
//server.get('/arounds/id/:id', AroundController.getAround);
//server.get('/arounds/create', AroundController.getCreateAround);
//server.post('/arounds/create', AroundController.postCreateAround);
//server.get('/arounds/update/:id', AroundController.getUpdateAround);
//server.post('/arounds/update/:id', AroundController.postUpdateAround);
//server.get('/arounds/delete/:id', AroundController.getDeleteAround);

// Routes pour les APIs
server.get('/api/', HomeController.getIndexApi);

server.get('/api/places', PlaceController.getPlacesApi);
server.get('/api/places/around/:mylat/:mylng', PlaceController.getPlacesAroundApi);
server.get('/api/places/id/:id', PlaceController.getPlaceApi);
server.post('/api/places/create', PlaceController.postCreatePlaceApi);
server.post('/api/places/update/:id', PlaceController.postUpdatePlaceApi);
server.post('/api/places/delete/:id', PlaceController.postDeletePlaceApi);

server.get('/api/userupdates', UserUpdateController.getUserUpdatesApi);
server.get('/api/userupdates/id/:id', UserUpdateController.getUserUpdateApi);
server.post('/api/userupdates/create', UserUpdateController.postCreateUserUpdateApi);
server.post('/api/userupdates/update/:id', UserUpdateController.postUpdateUserUpdateApi);
server.post('/api/userupdates/delete/:id', UserUpdateController.postDeleteUserUpdateApi);

//server.get('/api/arounds', AroundController.getAroundsApi);
//server.get('/api/arounds/id/:id', AroundController.getAroundApi);
//server.post('/api/arounds/create', AroundController.postCreateAroundApi);
//server.post('/api/arounds/update/:id', AroundController.postUpdateAroundApi);
//server.post('/api/arounds/delete/:id', AroundController.postDeleteAroundApi);
