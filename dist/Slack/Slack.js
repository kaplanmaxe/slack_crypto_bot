'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _client = require('@slack/client');

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var web = new _client.WebClient(_env2.default.bot_token);

var Slack = function () {
  function Slack() {
    _classCallCheck(this, Slack);
  }

  _createClass(Slack, null, [{
    key: 'sendMessage',

    /**
     * Sends message to slack channel
     *
     * @param {string} channel Channel ID
     * @param {string} text Text to send
     * @return {Promise}
     */
    value: function sendMessage(channel, text) {
      return new Promise(function (resolve, reject) {
        web.chat.postMessage(channel, text, function (err) {
          !err ? resolve() : reject();
        });
      });
    }

    /**
     * Sets purpose of channel
     *
     * @param {string} channel Channel ID
     * @param {string} text Text to set purpose to
     * @return {Promise}
     */

  }, {
    key: 'setPurpose',
    value: function setPurpose(channel, text) {
      return new Promise(function (resolve, reject) {
        console.log(web.channels.setTopic);
        web.channels.setTopic(channel, text, function (err) {
          console.log('here', err);
          !err ? resolve() : reject();
        });
      });
    }
  }]);

  return Slack;
}();

exports.default = Slack;