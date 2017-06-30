'use strict';

var _client = require('@slack/client');

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _GDAX = require('./GDAX/GDAX');

var _GDAX2 = _interopRequireDefault(_GDAX);

var _Slack = require('./Slack/Slack');

var _Slack2 = _interopRequireDefault(_Slack);

var _CoinMarketCap = require('./CoinMarketCap/CoinMarketCap');

var _CoinMarketCap2 = _interopRequireDefault(_CoinMarketCap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rtm = new _client.RtmClient(_env2.default.bot_token);

rtm.on(_client.RTM_EVENTS.MESSAGE, function (message) {
  var msg = message.text.toLowerCase();
  // TODO: make more robust so command doesn't have to go in beginning
  // of sentence
  if (msg.indexOf('!gdax') === 0) {
    _GDAX2.default.getCurrency(parseCurrency(msg)).then(function (res) {
      return _Slack2.default.sendMessage(message.channel, res);
    });
  } else if (msg.indexOf('!cmc') === 0) {
    _CoinMarketCap2.default.getSingleTicker(parseCurrency(msg)).then(function (res) {
      _Slack2.default.sendMessage(message.channel, res);
    });
  }
});

/**
 * Gets currency from command
 * @param {string} msg Message coming from slack
 * @return {string}
 */
function parseCurrency(msg) {
  return msg.split(' ')[1].toUpperCase().trim();
}

rtm.start();