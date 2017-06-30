'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Currencies = function (_Base) {
  _inherits(Currencies, _Base);

  /**
   * @constructor
   */
  function Currencies(db) {
    _classCallCheck(this, Currencies);

    var _this = _possibleConstructorReturn(this, (Currencies.__proto__ || Object.getPrototypeOf(Currencies)).call(this, db, 'currencies'));

    _this.database = db;
    return _this;
  }

  /**
   * Returns properties of currencies given.
   *
   * @param {array} currencies Currencies to look for
   * @return {Promise}
   */


  _createClass(Currencies, [{
    key: 'getCurrencyNames',
    value: function getCurrencyNames(currencies) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _get(Currencies.prototype.__proto__ || Object.getPrototypeOf(Currencies.prototype), 'find', _this2).call(_this2, {
          symbol: { $in: currencies.map(function (res) {
              return res.symbol;
            }) }
        }).then(function (res) {
          var cmpSymbols = res.map(function (fetch) {
            return fetch.symbol;
          });
          for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < currencies.length; j++) {
              if (cmpSymbols.indexOf(currencies[j].symbol) > -1 && res[i].symbol === currencies[j].symbol) {
                currencies[j].name = res[i].name;
              }
            }
          }
          resolve(currencies);
        });
      });
    }
  }]);

  return Currencies;
}(_Base3.default);

exports.default = Currencies;