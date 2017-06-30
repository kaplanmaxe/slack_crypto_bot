import request from 'request';

const headers = {
  'User-Agent': 'request',
};

export default class GDAX {
  /**
   * Calls GDAX API to get price
   *
   * @param {string} Currency Currency to fetch
   * @return {Promise}
   */
  static getCurrency(currency) {
    return new Promise(resolve => {
      request({ url: `https://api.gdax.com/products/${currency}-USD/ticker`, headers }, (err, response, body) => {
        const output = JSON.parse(body);
        if (!output.price) resolve('Currency not found on GDAX.');
        resolve(`${currency}: $${output.price}`);
      });
    });
  }
}
