'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  extname: '.hbs',
  layoutsDir: _path2.default.resolve('./src/views/layouts'),
  defaultLayout: 'main',
  helpers: {
    list: function list(items, options) {
      var out = '';
      for (var i = 0, l = items.length; i < l; i++) {
        out = out + options.fn(items[i]);
      }
      return out;
    },
    selected: function selected(foo, bar) {
      console.log('foo', foo, 'bar', bar);
      return foo == bar ? ' selected' : ' ';
    }
  }
};