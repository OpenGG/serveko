"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const promisify = fn => (...args) => new Promise((resolve, reject) => fn(...args, (err, result) => {
  if (err) {
    reject(err);
  } else {
    resolve(result);
  }
}));
exports.default = promisify;