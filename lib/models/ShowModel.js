"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ShowSeeds = require("../helpers/ShowSeeds");

var _ShowSeeds2 = _interopRequireDefault(_ShowSeeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; // Model de la route '/shows'

var Schema = new _mongoose2.default.Schema({
  name: { type: String }, // le nom du concert
  venue: { type: String }, // le nom de la salle
  description: { type: String }, // la description
  capacity: { type: Number }, // la capacité du show
  price: { type: Number }, // le prix
  image: { type: String }, // l'url de l'image
  date: { type: String }, // la date du concert
  lat: { type: String }, // latitude du lieu
  lng: { type: String },
  quality: { type: Number // Qualite du concert 
  } });

var Model = _mongoose2.default.model('Show', Schema);

exports.default = {
  seedShows: function seedShows() {
    var promises = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _ShowSeeds2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var show = _step.value;

        promises[promises.legth] = Model.create(show);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return Promise.all(promises);
  },

  getShows: function getShows() {
    return Model.find({}).exec();
  },

  getShow: function getShow(_id) {
    return Model.findOne({ _id: _id }).exec();
  },

  createShow: function createShow(show) {
    return Model.create({
      name: show.name,
      venue: show.venue,
      description: show.description,
      capacity: show.capacity,
      price: show.price,
      image: show.image,
      date: show.date,
      lat: show.lat,
      lng: show.lng,
      quality: show.quality
    });
  },

  updateShow: function updateShow(_id, show) {
    return Model.findOneAndUpdate({ _id: _id }, {
      name: show.name,
      venue: show.venue,
      description: show.description,
      capacity: show.capacity,
      price: show.price,
      image: show.image,
      date: show.date,
      lat: show.lat,
      lng: show.lng,
      quality: show.quality
    }, { upsert: true }).exec();
  },

  deleteShows: function deleteShows() {
    return Model.remove({}).exec();
  },

  deleteShow: function deleteShow(_id) {
    return Model.remove({ _id: _id }).exec();
  }
};