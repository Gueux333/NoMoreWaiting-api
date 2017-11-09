"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _BookingModel = require("../models/BookingModel");

var _BookingModel2 = _interopRequireDefault(_BookingModel);

var _ShowModel = require("../models/ShowModel");

var _ShowModel2 = _interopRequireDefault(_ShowModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Récupération du model
// Controller de la route '/bookings'
var bookings = function bookings() {
  return _BookingModel2.default.getBookings().then(function (data) {
    if (data === null) {
      throw new Error('noBookingsError');
    }

    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _booking = _step.value;

        response[response.length] = {
          id: _booking._id,
          username: _booking.username,
          showId: _booking.showId,
          seats: _booking.seats,
          createdAt: _booking.createdAt,
          updatedAt: _booking.updatedAt
        };
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

    return _lodash2.default.sortBy(response, 'username');
  });
};

var booking = function booking(_id) {
  return _BookingModel2.default.getBooking(_id).then(function (data) {
    if (data === null) {
      throw new Error('noBookingError');
    }

    var response = {
      id: data._id,
      username: data.username,
      showId: data.showId,
      seats: data.seats,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
    return response;
  });
};

var createBooking = function createBooking(booking) {
  return _BookingModel2.default.createBooking(booking);
};

var updateBooking = function updateBooking(id, booking) {
  return _BookingModel2.default.updateBooking(id, booking);
};

var deleteBooking = function deleteBooking(id) {
  return _BookingModel2.default.deleteBooking(id);
};

exports.default = {
  // Controller des views
  getBookings: function getBookings(req, res) {
    bookings().then(function (data) {
      res.render('booking/bookings', { bookings: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getBooking: function getBooking(req, res) {
    booking(req.params.id).then(function (data) {
      res.render('booking/booking', { booking: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCreateBooking: function getCreateBooking(req, res) {
    _ShowModel2.default.getShows().then(function (data) {
      res.render('booking/createBooking', { shows: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateBooking: function postCreateBooking(req, res) {
    var booking = {
      username: req.body.username,
      showId: req.body.showId,
      seats: req.body.seats
    };

    createBooking(booking).then(function (data) {
      res.redirect('/bookings');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateBooking: function getUpdateBooking(req, res) {
    Promise.all([booking(req.params.id), _ShowModel2.default.getShows()]).then(function (data) {
      res.render('booking/updateBooking', { booking: data[0], shows: data[1] });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateBooking: function postUpdateBooking(req, res) {
    var booking = {
      username: req.body.username,
      showId: req.body.showId,
      seats: req.body.seats
    };

    updateBooking(req.params.id, booking).then(function (data) {
      res.redirect('/bookings');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteBooking: function getDeleteBooking(req, res) {
    deleteBooking(req.params.id).then(function (data) {
      res.redirect('/bookings');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // Controller des Apis
  getBookingsApi: function getBookingsApi(req, res) {
    bookings().then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getBookingApi: function getBookingApi(req, res) {
    booking(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateBookingApi: function postCreateBookingApi(req, res) {
    var booking = {
      username: req.body.username,
      showId: req.body.showId,
      seats: req.body.seats
    };

    createBooking(booking).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateBookingApi: function postUpdateBookingApi(req, res) {
    var booking = {
      username: req.body.username,
      showId: req.body.showId,
      seats: req.body.seats
    };

    updateBooking(req.params.id, booking).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteBookingApi: function postDeleteBookingApi(req, res) {
    deleteBooking(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};