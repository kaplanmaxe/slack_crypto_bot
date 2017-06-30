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
      web.chat.postMessage(channel, text, err => {
        !err ? resolve() : reject();
      });
    });
  }
}
