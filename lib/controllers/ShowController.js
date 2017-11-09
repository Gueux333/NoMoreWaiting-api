"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _ShowModel = require("../models/ShowModel");

var _ShowModel2 = _interopRequireDefault(_ShowModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shows = function shows() {
  // On fait appel à la fonction getShows du model
  // Celle ci renvoie tous les shows présents en base
  return _ShowModel2.default.getShows().then(function (data) {
    // On récupère ici data qui est une liste de shows

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noShowsError'
      throw new Error('noShowsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _show = _step.value;

        // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
        response[response.length] = {
          id: _show._id,
          name: _show.name,
          venue: _show.venue,
          description: _show.description,
          capacity: _show.capacity,
          price: _show.price,
          image: _show.image,
          date: _show.date,
          lat: _show.lat,
          lng: _show.lng,
          quality: _show.quality
        };
      }

      // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
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

    return _lodash2.default.sortBy(response, 'name');
  });
};

// Récupération du model
// Controller de la route '/shows'


var show = function show(_id) {
  // On fait appel à la fonction getShow du model
  // Celle ci renvoie le show dont l'id est _id
  return _ShowModel2.default.getShow(_id).then(function (data) {
    // On récupère ici data qui est une liste de shows

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noShowError'
      throw new Error('noShowError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    var response = {
      id: data._id,
      name: data.name,
      venue: data.venue,
      description: data.description,
      capacity: data.capacity,
      price: data.price,
      image: data.image,
      date: data.date,
      lat: data.lat,
      lng: data.lng,
      quality: data.quality
    };
    return response;
  });
};

var createShow = function createShow(show) {
  // On fait appel à la fonction createShow du model
  // Celle ci renvoie le show dont l'id est _id
  return _ShowModel2.default.createShow(show);
};

var updateShow = function updateShow(id, show) {
  // On fait appel à la fonction updateShow du model
  // Celle ci renvoie le show dont l'id est _id
  return _ShowModel2.default.updateShow(id, show);
};

var deleteShow = function deleteShow(id) {
  // On fait appel à la fonction deleteShow du model
  // Celle ci renvoie le show dont l'id est _id
  return _ShowModel2.default.deleteShow(id);
};

exports.default = {
  // Controller des views
  getShows: function getShows(req, res) {
    shows().then(function (data) {
      // data contient une liste de shows
      res.render('show/shows', { shows: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getShow: function getShow(req, res) {
    show(req.params.id).then(function (data) {
      res.render('show/show', { show: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCreateShow: function getCreateShow(req, res) {
    res.render('show/createShow');
  },

  postCreateShow: function postCreateShow(req, res) {
    var show = {
      name: req.body.name,
      venue: req.body.venue,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      lat: req.body.lat,
      lng: req.body.lng,
      quality: req.body.quality
    };

    createShow(show).then(function (data) {
      res.redirect('/shows');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateShow: function getUpdateShow(req, res) {
    show(req.params.id).then(function (data) {
      res.render('show/updateShow', { show: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateShow: function postUpdateShow(req, res) {
    var show = {
      name: req.body.name,
      venue: req.body.venue,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      lat: req.body.lat,
      lng: req.body.lng,
      quality: req.body.quality
    };

    updateShow(req.params.id, show).then(function (data) {
      res.redirect('/shows');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteShow: function getDeleteShow(req, res) {
    deleteShow(req.params.id).then(function (data) {
      res.redirect('/shows');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getShowsApi: function getShowsApi(req, res) {
    shows().then(function (data) {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de shows
      res.send(data);
    }, function (err) {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getShowApi: function getShowApi(req, res) {
    show(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateShowApi: function postCreateShowApi(req, res) {
    var show = {
      name: req.body.name,
      venue: req.body.venue,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      lat: req.body.lat,
      lng: req.body.lng,
      quality: req.body.quality
    };

    createShow(show).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateShowApi: function postUpdateShowApi(req, res) {
    var show = {
      name: req.body.name,
      venue: req.body.venue,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      quality: req.body.quality
    };

    updateShow(req.params.id, show).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteShowApi: function postDeleteShowApi(req, res) {
    deleteShow(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};