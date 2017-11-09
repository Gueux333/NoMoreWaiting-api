'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Chargement du fichier de configuration de production ou de développement

var configFile = '';

if (process.env.NODE_ENV === "production") {
  configFile = 'prod.js';
} else {
  configFile = 'dev.js';
}

exports.default = require("./config/" + configFile).default;