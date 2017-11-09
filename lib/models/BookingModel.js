"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; // Model de la route '/bookings'

var Schema = new _mongoose2.default.Schema({
  username: { type: String }, // le nom de l'utilisateur
  showId: { type: String }, // l'id du show
  seats: { type: Number }, // le nombre de places achetées
  createdAt: { type: Date }, // la date de création de la réservation
  updatedAt: { type: Date } // la date de modification de la réservation
});

var Model = _mongoose2.default.model('Booking', Schema);

exports.default = {
  getBookings: function getBookings() {
    return Model.find({}).exec();
  },

  getBooking: function getBooking(_id) {
    return Model.findOne({ _id: _id }).exec();
  },

  createBooking: function createBooking(booking) {
    return Model.create({
      username: booking.username,
      showId: booking.showId,
      seats: booking.seats,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  updateBooking: function updateBooking(_id, booking) {
    return Model.findOneAndUpdate({ _id: _id }, {
      username: booking.username,
      showId: booking.showId,
      seats: booking.seats,
      updatedAt: new Date()
    }, { upsert: true }).exec();
  },

  deleteBookings: function deleteBookings() {
    return Model.remove({}).exec();
  },

  deleteBooking: function deleteBooking(_id) {
    return Model.remove({ _id: _id }).exec();
  }
};