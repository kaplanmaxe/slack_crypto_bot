'use strict';

var _CoinMarketCap = require('./CoinMarketCap/CoinMarketCap');

var _CoinMarketCap2 = _interopRequireDefault(_CoinMarketCap);

var _Database = require('./Database');

var _Database2 = _interopRequireDefault(_Database);

var _Currencies = require('./models/Currencies');

var _Currencies2 = _interopRequireDefault(_Currencies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = void 0;
_Database2.default.connect().then(function (database) {
  db = database;
  return new _Currencies2.default(database);
}).then(function (currencies) {
  currencies.remove();
  _CoinMarketCap2.default.getCurrencies().then(function (data) {
    currencies.insert(data);
    console.log('Currency data inserted successfully!');
    db.close();
    process.exit();
  });
});