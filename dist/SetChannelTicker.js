'use strict';

var _GDAX = require('./GDAX/GDAX');

var _GDAX2 = _interopRequireDefault(_GDAX);

var _Slack = require('./Slack/Slack');

var _Slack2 = _interopRequireDefault(_Slack);

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_GDAX2.default.getAllPrices().then(function (res) {
  console.log(res);
  _Slack2.default.setPurpose(_env2.default.channel_id_ticker, res);
  process.exit();
});