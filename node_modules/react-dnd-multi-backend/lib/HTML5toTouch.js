'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _reactDndTouchBackend = require('react-dnd-touch-backend');

var _reactDndTouchBackend2 = _interopRequireDefault(_reactDndTouchBackend);

var _Transitions = require('./Transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  backends: [{
    backend: _reactDndHtml5Backend2.default
  }, {
    backend: (0, _reactDndTouchBackend2.default)({ enableMouseEvents: true }),
    preview: true,
    transition: _Transitions.TouchTransition
  }]
};