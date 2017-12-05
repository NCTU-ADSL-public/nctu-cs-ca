'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTransition = exports.TouchTransition = exports.HTML5DragTransition = exports.Preview = undefined;

var _MultiBackend = require('./MultiBackend');

var _MultiBackend2 = _interopRequireDefault(_MultiBackend);

var _Preview = require('./Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _Transitions = require('./Transitions');

var _createTransition = require('./createTransition');

var _createTransition2 = _interopRequireDefault(_createTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Preview = _Preview2.default;
exports.HTML5DragTransition = _Transitions.HTML5DragTransition;
exports.TouchTransition = _Transitions.TouchTransition;
exports.createTransition = _createTransition2.default;

exports.default = function (managerOrOptions) {
  if (managerOrOptions.getMonitor) {
    return new _MultiBackend2.default(managerOrOptions);
  }
  return function (manager) {
    return new _MultiBackend2.default(manager, managerOrOptions);
  };
};