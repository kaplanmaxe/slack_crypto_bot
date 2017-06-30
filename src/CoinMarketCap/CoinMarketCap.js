import request from 'request';

export default class CoinMarketCap {
  /**
   * Gets price of currency on CoinMarketCap
   * TODO: fix so it doesn't fetch all currencies from API and only fetches one needed.
   *
   * @param {string} currency Currency to fetch
   * @return {Promise}
   */
  static getSingleTicker(currency) {
    return new Promise(resolve => {
      request('https://api.coinmarketcap.com/v1/ticker/', (err, resp, body) => {
        const output = JSON.parse(body);
        for (let i = 0; i < output.length; i++) {
          if (output[i].symbol.toUpperCase() === currency.toUpperCase()) {
            resolve(
              `${output[i].name}: $${output[i].price_usd} (${output[i].percent_change_24h}%)`
            );
          }
        }
      });
    });
  }
}