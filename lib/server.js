"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require("serve-favicon");

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _HandlebarsConfig = require("./helpers/HandlebarsConfig");

var _HandlebarsConfig2 = _interopRequireDefault(_HandlebarsConfig);

var _SeedDbController = require("./controllers/SeedDbController");

var _SeedDbController2 = _interopRequireDefault(_SeedDbController);

var _HomeController = require("./controllers/HomeController");

var _HomeController2 = _interopRequireDefault(_HomeController);

var _ShowController = require("./controllers/ShowController");

var _ShowController2 = _interopRequireDefault(_ShowController);

var _BookingController = require("./controllers/BookingController");

var _BookingController2 = _interopRequireDefault(_BookingController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration du serveur


// Récupération des controllers


// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku
var viewsPath = __dirname + '/views/'; // Récupération des librairies de base permettant de faire un serveur d'API

var server = (0, _express2.default)();
server.use(_bodyParser2.default.json());
server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use((0, _cookieParser2.default)());
server.use((0, _serveFavicon2.default)(_path2.default.resolve('./src/assets/favicon.png')));

server.use(_express2.default.static(_path2.default.resolve('./src/assets')));
server.set('views', _path2.default.resolve('./src/views'));
server.engine('.hbs', (0, _expressHandlebars2.default)(_HandlebarsConfig2.default));
server.set('view engine', '.hbs');

server.set('port', process.env.PORT || 5000);
server.listen(server.get('port'), function () {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée
_mongoose2.default.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + _config2.default.bddUri, {}, function (err, res) {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + _config2.default.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + _config2.default.bddUri);
  }
});

// Routes pour initialiser la base
server.post('/seeddb', _SeedDbController2.default.seedDb);

// Routes pour les vues
server.get('/', _HomeController2.default.getIndex);

server.get('/shows', _ShowController2.default.getShows);
server.get('/shows/id/:id', _ShowController2.default.getShow);
server.get('/shows/create', _ShowController2.default.getCreateShow);
server.post('/shows/create', _ShowController2.default.postCreateShow);
server.get('/shows/update/:id', _ShowController2.default.getUpdateShow);
server.post('/shows/update/:id', _ShowController2.default.postUpdateShow);
server.get('/shows/delete/:id', _ShowController2.default.getDeleteShow);

server.get('/bookings', _BookingController2.default.getBookings);
server.get('/bookings/id/:id', _BookingController2.default.getBooking);
server.get('/bookings/create', _BookingController2.default.getCreateBooking);
server.post('/bookings/create', _BookingController2.default.postCreateBooking);
server.get('/bookings/update/:id', _BookingController2.default.getUpdateBooking);
server.post('/bookings/update/:id', _BookingController2.default.postUpdateBooking);
server.get('/bookings/delete/:id', _BookingController2.default.getDeleteBooking);

// Routes pour les APIs
server.get('/api/', _HomeController2.default.getIndexApi);

server.get('/api/shows', _ShowController2.default.getShowsApi);
server.get('/api/shows/id/:id', _ShowController2.default.getShowApi);
server.post('/api/shows/create', _ShowController2.default.postCreateShowApi);
server.post('/api/shows/update/:id', _ShowController2.default.postUpdateShowApi);
server.post('/api/shows/delete/:id', _ShowController2.default.postDeleteShowApi);

server.get('/api/bookings', _BookingController2.default.getBookingsApi);
server.get('/api/bookings/id/:id', _BookingController2.default.getBookingApi);
server.post('/api/bookings/create', _BookingController2.default.postCreateBookingApi);
server.post('/api/bookings/update/:id', _BookingController2.default.postUpdateBookingApi);
server.post('/api/bookings/delete/:id', _BookingController2.default.postDeleteBookingApi);