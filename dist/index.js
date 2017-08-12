'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundPrice = roundPrice;

var _client = require('@slack/client');

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _GDAX = require('./GDAX/GDAX');

var _GDAX2 = _interopRequireDefault(_GDAX);

var _Slack = require('./Slack/Slack');

var _Slack2 = _interopRequireDefault(_Slack);

var _CoinMarketCap = require('./CoinMarketCap/CoinMarketCap');

var _CoinMarketCap2 = _interopRequireDefault(_CoinMarketCap);

var _Kraken = require('./Kraken/Kraken');

var _Kraken2 = _interopRequireDefault(_Kraken);

var _Intrinio = require('./Intrinio/Intrinio');

var _Intrinio2 = _interopRequireDefault(_Intrinio);

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
  } else if (msg.indexOf('!kraken') === 0) {
    _Kraken2.default.getCurrency(parseCurrency(msg)).then(function (res) {
      _Slack2.default.sendMessage(message.channel, res);
    });
  } else if (msg.indexOf('!stock') === 0) {
    _Intrinio2.default.getStock(_Intrinio2.default.parseSymbol(msg)).then(function (res) {
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

/**
 * Rounds dollar amount to more human readable Number
 *
 * @param {integer} price Price of asset
 * @return {string}
 */
function roundPrice(price) {
  // If price is below 0, do not round and show all decimal places
  if (price.split('.')[0] === '0') return price;
  return Number(price).toFixed(2);
}

rtm.start();