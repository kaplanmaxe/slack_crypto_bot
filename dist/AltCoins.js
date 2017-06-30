'use strict';

var _Database = require('./Database');

var _Database2 = _interopRequireDefault(_Database);

var _Bittrex = require('./Bittrex/Bittrex');

var _Bittrex2 = _interopRequireDefault(_Bittrex);

var _Slack = require('./Slack/Slack');

var _Slack2 = _interopRequireDefault(_Slack);

var _Currencies = require('./models/Currencies');

var _Currencies2 = _interopRequireDefault(_Currencies);

var _env = require('../env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Models = {
  Currencies: null
};
var db = void 0;
_Database2.default.connect().then(function (database) {
  db = database;
  Models.Currencies = new _Currencies2.default(database);
});

_Bittrex2.default.getMarketData().then(function (res) {
  res.best = _Bittrex2.default.getTopFive(res.best);
  res.worst = _Bittrex2.default.getTopFive(res.worst);
  // Doing it this way is more efficient so we only have to call method once.
  return Models.Currencies.getCurrencyNames(res.best.concat(res.worst));
}).then(function (res) {
  _Slack2.default.sendMessage(_env.altcoinSlackChannel, _Slack2.default.formAltcoinMessage(res.slice(5, 10), 'Worst'));
  _Slack2.default.sendMessage(_env.altcoinSlackChannel, _Slack2.default.formAltcoinMessage(res.slice(0, 5), 'Best'));
  db.close();
  process.exit();
});