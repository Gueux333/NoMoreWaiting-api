'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Controller de la route '/'

exports.default = {
  // Controller des views
  getIndex: function getIndex(req, res) {
    res.render('index');
  },

  // Controller des Apis
  getIndexApi: function getIndexApi(req, res) {
    res.status(200).send('Hello World');
  }
};