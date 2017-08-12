'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bittrex = function () {
  function Bittrex() {
    _classCallCheck(this, Bittrex);
  }

  _createClass(Bittrex, null, [{
    key: 'getMarketData',

    /**
     * Fetches market data from Bittrex
     *
     * @return {Promise}
     */
    value: function getMarketData() {
      return new Promise(function (resolve, reject) {
        (0, _request2.default)('https://bittrex.com/api/v1.1/public/getmarketsummaries', function (err, response, body) {
          if (err) return reject(err);
          var res = JSON.parse(body).result;
          resolve({
            best: Bittrex.sortMarkets(res, 'DESC'),
            worst: Bittrex.sortMarkets(res, 'ASC')
          });
        });
      });
    }

    /**
     * Sorts markets in either ASC or DESC order
     * @param  {array} res array of raw market data
     * @param  {string} order ASC|DESC
     * @return {string}
     */

  }, {
    key: 'sortMarkets',
    value: function sortMarkets(res, order) {
      var result = [];
      if (order === 'DESC') {
        result = res.sort(function (a, b) {
          return Bittrex.calculateDiff(b) - Bittrex.calculateDiff(a);
        });
      } else if (order === 'ASC') {
        result = res.sort(function (a, b) {
          return Bittrex.calculateDiff(a) - Bittrex.calculateDiff(b);
        });
      }
      return result.filter(function (data) {
        return data.MarketName.includes('BTC-');
      });
    }

    /**
     * Calculate current percentage diff on the day
     * @param  {object} data Market data of current currency pair
     * @return {integer}
     */

  }, {
    key: 'calculateDiff',
    value: function calculateDiff(data) {
      data.Diff = (data.Bid - data.PrevDay) / data.PrevDay * 100;
      return data.Diff !== 1 && data.Diff !== Infinity ? data.Diff : 0;
    }

    /**
     * Returns data on top 5 Currency pairs
     *
     * @param {array} data Market data of all currency pairs
     * @return {array}
     */

  }, {
    key: 'getTopFive',
    value: function getTopFive(data) {
      return data.slice(0, 5).map(function (res) {
        return {
          marketName: res.MarketName,
          symbol: res.MarketName.split('-')[1],
          diff: res.Diff,
          name: null
        };
      });
    }
  }]);

  return Bittrex;
}();

exports.default = Bittrex;