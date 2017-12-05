"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (event, check) {
  return {
    _isMBTransition: true,
    event: event,
    check: check
  };
};