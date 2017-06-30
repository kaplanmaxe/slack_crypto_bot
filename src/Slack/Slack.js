import { WebClient } from '@slack/client';
import env from '../../env';

const web = new WebClient(env.bot_token);

export default class Slack {
  /**
   * Sends message to slack channel
   *
   * @param {string} channel Channel ID
   * @param {string} text Text to send
   * @return {Promise}
   */
  static sendMessage(channel, text) {
    return new Promise((resolve, reject) => {
      web.chat.postMessage(channel, text, (err, res) => {
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
  static setPurpose(channel, text) {
    return new Promise((resolve, reject) => {
      web.channels.setTopic(channel, text, err => {
        !err ? resolve() : reject();
      });
    });
  }

  /**
   * Formats altcoins
   *
   * @param {array} data Array of coins
   * @param {string} type BEST|WORST
   */
  static formAltcoinMessage(data, type) {
    let tweet = `${type} Markets (BTC)\n\n`;
    for (let i = 0; i < data.length; i++) {
      tweet += `$${data[i].symbol}: ${data[i].diff}%\n`;
    }
    return tweet;
  }
}
