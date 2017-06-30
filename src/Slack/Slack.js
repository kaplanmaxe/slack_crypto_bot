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

  /**
   * Sets purpose of channel
   *
   * @param {string} channel Channel ID
   * @param {string} text Text to set purpose to
   * @return {Promise}
   */
  static setPurpose(channel, text) {
    return new Promise((resolve, reject) => {
      console.log(web.channels.setTopic);
      web.channels.setTopic(channel, text, err => {
        console.log('here', err);
        !err ? resolve() : reject();
      });
    });
  }
}
