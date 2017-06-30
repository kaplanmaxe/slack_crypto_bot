import request from 'request';

export default class Bittrex {
  /**
   * Fetches market data from Bittrex
   *
   * @return {Promise}
   */
  static getMarketData() {
    return new Promise((resolve, reject) => {
      request('https://bittrex.com/api/v1.1/public/getmarketsummaries', (err, response, body) => {
        if (err) return reject(err);
        const res = JSON.parse(body).result;
        resolve({
          best: Bittrex.sortMarkets(res, 'DESC'),
          worst: Bittrex.sortMarkets(res, 'ASC'),
        });
      });
    });
  }

  /**
   * Sorts markets in either ASC or DESC order
   * @param  {array} res array of raw market data
   * @param  {string} order ASC|DESC
   * @return {string}
   */
  static sortMarkets(res, order) {
    let result = [];
    if (order === 'DESC') {
      result = res.sort((a, b) => {
        return Bittrex.calculateDiff(b) - Bittrex.calculateDiff(a);
      });
    } else if (order === 'ASC') {
      result = res.sort((a, b) => {
        return Bittrex.calculateDiff(a) - Bittrex.calculateDiff(b);
      });
    }
    return result.filter(data => {
      return data.MarketName.includes('BTC-');
    });
  }

  /**
   * Calculate current percentage diff on the day
   * @param  {object} data Market data of current currency pair
   * @return {integer}
   */
  static calculateDiff(data) {
    data.Diff = ((data.Bid - data.PrevDay) / data.PrevDay) * 100;
    return data.Diff !== 1 && data.Diff !== Infinity ? data.Diff : 0;
  }

  /**
   * Returns data on top 5 Currency pairs
   *
   * @param {array} data Market data of all currency pairs
   * @return {array}
   */
  static getTopFive(data) {
    return data.slice(0, 5)
      .map(res => {
        return {
          marketName: res.MarketName,
          symbol: res.MarketName.split('-')[1],
          diff: res.Diff.toFixed(2),
          name: null,
        };
      });
  }
}
