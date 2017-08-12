import request from 'request';
import { roundPrice } from '../index';

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
        resolve(`${currency}: $${roundPrice(output.price)}`);
      });
    });
  }

  /**
   * Gets price of Bitcoin from GDAX
   *
   * @return {Promise}
   */
  static getBitcoinPrice() {
    return new Promise(resolve => {
      request({ url: 'https://api.gdax.com/products/BTC-USD/ticker', headers }, (err, response, body) => {
        resolve(JSON.parse(body));
      });
    });
  }

  /**
   * Gets price of Ethereum from GDAX
   *
   * @return {Promise}
   */
  static getEthereumPrice() {
    return new Promise(resolve => {
      request({ url: 'https://api.gdax.com/products/ETH-USD/ticker', headers }, (err, response, body) => {
        resolve(JSON.parse(body));
      });
    });
  }

  /**
   * Gets price of Litecoin from GDAX
   *
   * @return {Promise}
   */
  static getLitecoinPrice() {
    return new Promise(resolve => {
      request({ url: 'https://api.gdax.com/products/LTC-USD/ticker', headers }, (err, response, body) => {
        resolve(JSON.parse(body));
      });
    });
  }

  /**
   * Get all prices from GDAX for all currencies
   *
   * @return {Promise}
   */
  static getAllPrices() {
    return new Promise(resolve => {
      Promise.all([
        GDAX.getBitcoinPrice(),
        GDAX.getEthereumPrice(),
        GDAX.getLitecoinPrice(),
      ]).then(res => {
        resolve(`BTC: ${res[0].price}, ETH: ${res[1].price}, LTC: ${res[2].price}`);
      });
    });
  }
}
