'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _env = require('../../env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Intrinio = function () {
  function Intrinio() {
    _classCallCheck(this, Intrinio);
  }

  _createClass(Intrinio, null, [{
    key: 'getStock',

    /**
     * Gets stock data given symbol
     *
     * @param {string} symbol Symbol of stock to fetch
     * @return {Promise}
     */
    value: function getStock(symbol) {
      return new Promise(function (resolve) {
        (0, _request2.default)({
          url: 'https://api.intrinio.com/data_point?identifier=' + symbol.toUpperCase() + '&item=last_price,percent_change',
          headers: {
            Authorization: 'Basic ' + new Buffer(_env.intrinioUsername + ':' + _env.intrinioPassword).toString('base64')
          }
        }, function (err, res, body) {
          var data = JSON.parse(body).data;
          if (data[0].value === 'nm' || data[1].value === 'na') resolve('Stock not found.');
          resolve(data[0].identifier + ': ' + data[0].value + ' (' + data[1].value * 100 + '%)');
        });
      });
    }

    /**
     * Parses message and returns stock
     *
     * @param {string} msg Msg to parse
     * @return {string}
     */

  }, {
    key: 'parseSymbol',
    value: function parseSymbol(msg) {
      return msg.split(' ')[1];
    }
  }]);

  return Intrinio;
}();

exports.default = Intrinio;