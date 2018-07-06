"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Extended version of % with negative integer support.
function mod(n, m) {
  var q = n % m;
  return q < 0 ? q + m : q;
}

exports.default = mod;