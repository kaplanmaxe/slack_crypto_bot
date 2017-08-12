import request from 'request';
import { roundPrice } from '../index';
import { currency } from '../../env';

export default class Kraken {
  /**
   * Gets currency pair price
   *
   * @param {string} asset Asset to check price of
   */
  static getCurrency(asset) {
    return new Promise(resolve => {
      request(`https://api.kraken.com/0/public/Ticker?pair=${asset}${currency}`, (err, response, body) => {
        const output = JSON.parse(body);
        if (output.error.length > 0) return resolve('Asset not found.');
        // Kraken's output is a little weird. Always take the first object key.
        resolve(`${asset}: $${roundPrice(output.result[Object.keys(output.result)[0]].c[0])}`);
      });
    });
  }
}
