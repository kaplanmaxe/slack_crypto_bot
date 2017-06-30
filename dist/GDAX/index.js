'use strict';

var _client = require('@slack/client');

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

var _GDAX = require('./GDAX');

var _GDAX2 = _interopRequireDefault(_GDAX);

var _Slack = require('../Slack/Slack');

var _Slack2 = _interopRequireDefault(_Slack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rtm = new _client.RtmClient(_env2.default.bot_token);

rtm.on(_client.RTM_EVENTS.MESSAGE, function (message) {
  var msg = message.text.toLowerCase();
  if (msg.indexOf('!gdax') === 0) {
    _GDAX2.default.getCurrency(msg.split(' ')[1].toUpperCase().trim()).then(function (res) {
      return _Slack2.default.sendMessage(message.channel, res);
    });
  }
});

rtm.start();