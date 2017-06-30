'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var headers = {
  'User-Agent': 'request'
};

var GDAX = function () {
  function GDAX() {
    _classCallCheck(this, GDAX);
  }

  _createClass(GDAX, null, [{
    key: 'getCurrency',

    /**
     * Calls GDAX API to get price
     *
     * @param {string} Currency Currency to fetch
     * @return {Promise}
     */
    value: function getCurrency(currency) {
      return new Promise(function (resolve) {
        (0, _request2.default)({ url: 'https://api.gdax.com/products/' + currency + '-USD/ticker', headers: headers }, function (err, response, body) {
          var output = JSON.parse(body);
          if (!output.price) resolve('Currency not found on GDAX.');
          resolve(currency + ': $' + output.price);
        });
      });
    }

    /**
     * Gets price of Bitcoin from GDAX
     *
     * @return {Promise}
     */

  }, {
    key: 'getBitcoinPrice',
    value: function getBitcoinPrice() {
      return new Promise(function (resolve) {
        (0, _request2.default)({ url: 'https://api.gdax.com/products/BTC-USD/ticker', headers: headers }, function (err, response, body) {
          resolve(JSON.parse(body));
        });
      });
    }

    /**
     * Gets price of Ethereum from GDAX
     *
     * @return {Promise}
     */

  }, {
    key: 'getEthereumPrice',
    value: function getEthereumPrice() {
      return new Promise(function (resolve) {
        (0, _request2.default)({ url: 'https://api.gdax.com/products/ETH-USD/ticker', headers: headers }, function (err, response, body) {
          resolve(JSON.parse(body));
        });
      });
    }

    /**
     * Gets price of Litecoin from GDAX
     *
     * @return {Promise}
     */

  }, {
    key: 'getLitecoinPrice',
    value: function getLitecoinPrice() {
      return new Promise(function (resolve) {
        (0, _request2.default)({ url: 'https://api.gdax.com/products/LTC-USD/ticker', headers: headers }, function (err, response, body) {
          resolve(JSON.parse(body));
        });
      });
    }

    /**
     * Get all prices from GDAX for all currencies
     *
     * @return {Promise}
     */

  }, {
    key: 'getAllPrices',
    value: function getAllPrices() {
      return new Promise(function (resolve) {
        Promise.all([GDAX.getBitcoinPrice(), GDAX.getEthereumPrice(), GDAX.getLitecoinPrice()]).then(function (res) {
          resolve(res.join(', '));
        });
      });
    }
  }]);

  return GDAX;
}();

exports.default = GDAX;