import request from 'request';
import { intrinioUsername, intrinioPassword } from '../../env';
import { roundPrice } from '../index';

export default class Intrinio {
  /**
   * Gets stock data given symbol
   *
   * @param {string} symbol Symbol of stock to fetch
   * @return {Promise}
   */
  static getStock(symbol) {
    return new Promise(resolve => {
      request({
        url: `https://api.intrinio.com/data_point?identifier=${symbol.toUpperCase()}&item=last_price,percent_change`,
        headers: {
          Authorization: `Basic ${new Buffer(`${intrinioUsername}:${intrinioPassword}`).toString('base64')}`,
        },
      }, (err, res, body) => {
        const data = JSON.parse(body).data;
        if (data[0].value === 'nm' || data[1].value === 'na') return resolve('Stock not found.');
        resolve(`${data[0].identifier}: $${roundPrice(data[0].value)} (${(data[1].value * 100)}%)`);
      });
    });
  }

  /**
   * Parses message and returns stock
   *
   * @param {string} msg Msg to parse
   * @return {string}
   */
  static parseSymbol(msg) {
    return msg.split(' ')[1];
  }
}
