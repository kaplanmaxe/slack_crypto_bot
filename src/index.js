import { RtmClient, RTM_EVENTS } from '@slack/client';
import env from '../env';
import { exec } from 'child_process';
import Slack from './Slack/Slack';
import Intrinio from './Intrinio/Intrinio';

const rtm = new RtmClient(env.bot_token);

rtm.on(RTM_EVENTS.MESSAGE, message => {
  const msg = message.text.toLowerCase();
  // TODO: make more robust so command doesn't have to go in beginning
  // of sentence
  if (msg.indexOf('!gdax') === 0) {
    exec(`cryptocheck gdax ${parseCurrency(msg)}`, (err, stdout) => {
      return Slack.sendMessage(message.channel, stdout);
    });
  } else if (msg.indexOf('!cmc') === 0) {
    exec(`cryptocheck cmc ${parseCurrency(msg)}`, (err, stdout) => {
      return Slack.sendMessage(message.channel, stdout);
    });
  } else if (msg.indexOf('!kraken') === 0) {
    exec(`cryptocheck kraken ${parseCurrency(msg)}`, (err, stdout) => {
      return Slack.sendMessage(message.channel, stdout);
    });
  } else if (msg.indexOf('!stock') === 0) {
    Intrinio.getStock(Intrinio.parseSymbol(msg))
    .then(res => {
      Slack.sendMessage(message.channel, res);
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
export function roundPrice(price) {
  // If price is below 0, do not round and show all decimal places
  if (String(price).split('.')[0] === '0') return price;
  return Number(price).toFixed(2);
}

rtm.start();
