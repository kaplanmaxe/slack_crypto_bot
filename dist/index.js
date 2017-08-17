'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundPrice = roundPrice;

var _client = require('@slack/client');

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _child_process = require('child_process');

var _Slack = require('./Slack/Slack');

var _Slack2 = _interopRequireDefault(_Slack);

var _Intrinio = require('./Intrinio/Intrinio');

var _Intrinio2 = _interopRequireDefault(_Intrinio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rtm = new _client.RtmClient(_env2.default.bot_token);

rtm.on(_client.RTM_EVENTS.MESSAGE, function (message) {
  var msg = message.text.toLowerCase();
  // TODO: make more robust so command doesn't have to go in beginning
  // of sentence
  if (msg.indexOf('!gdax') === 0) {
    (0, _child_process.exec)('cryptocheck gdax ' + parseCurrency(msg), function (err, stdout) {
      return _Slack2.default.sendMessage(message.channel, stdout);
    });
  } else if (msg.indexOf('!cmc') === 0) {
    (0, _child_process.exec)('cryptocheck cmc ' + parseCurrency(msg), function (err, stdout) {
      return _Slack2.default.sendMessage(message.channel, stdout);
    });
  } else if (msg.indexOf('!kraken') === 0) {
    (0, _child_process.exec)('cryptocheck kraken ' + parseCurrency(msg), function (err, stdout) {
      return _Slack2.default.sendMessage(message.channel, stdout);
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
  if (String(price).split('.')[0] === '0') return price;
  return Number(price).toFixed(2);
}

rtm.start();