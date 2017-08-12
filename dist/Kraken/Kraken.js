'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _index = require('../index');

var _env = require('../../env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kraken = function () {
  function Kraken() {
    _classCallCheck(this, Kraken);
  }

  _createClass(Kraken, null, [{
    key: 'getCurrency',

    /**
     * Gets currency pair price
     *
     * @param {string} asset Asset to check price of
     */
    value: function getCurrency(asset) {
      return new Promise(function (resolve) {
        (0, _request2.default)('https://api.kraken.com/0/public/Ticker?pair=' + asset + _env.currency, function (err, response, body) {
          var output = JSON.parse(body);
          if (output.error.length > 0) return resolve('Asset not found.');
          // Kraken's output is a little weird. Always take the first object key.
          resolve(asset + ': $' + (0, _index.roundPrice)(output.result[Object.keys(output.result)[0]].c[0]));
        });
      });
    }
  }]);

  return Kraken;
}();

exports.default = Kraken;