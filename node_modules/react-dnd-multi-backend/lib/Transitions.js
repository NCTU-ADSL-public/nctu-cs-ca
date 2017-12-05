'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTML5DragTransition = exports.TouchTransition = undefined;

var _createTransition = require('./createTransition');

var _createTransition2 = _interopRequireDefault(_createTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TouchTransition = exports.TouchTransition = (0, _createTransition2.default)('touchstart', function (event) {
  return event.touches != null; // eslint-disable-line no-eq-null, eqeqeq
});

var HTML5DragTransition = exports.HTML5DragTransition = (0, _createTransition2.default)('dragstart', function (event) {
  if (event.type) {
    return event.type.indexOf('drag') !== -1 || event.type.indexOf('drop') !== -1;
  }
  return false;
});