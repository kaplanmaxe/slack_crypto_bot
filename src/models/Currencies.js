import Base from './Base';

export default class Currencies extends Base {
  /**
   * @constructor
   */
  constructor(db) {
    super(db, 'currencies');
    this.database = db;
  }

  /**
   * Returns properties of currencies given.
   *
   * @param {array} currencies Currencies to look for
   * @return {Promise}
   */
  getCurrencyNames(currencies) {
    return new Promise(resolve => {
      super.find({
        symbol: { $in: currencies.map(res => { return res.symbol; }) },
      })
      .then(res => {
        const cmpSymbols = res.map(fetch => { return fetch.symbol; });
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; j < currencies.length; j++) {
            if (cmpSymbols.indexOf(currencies[j].symbol) > -1
              && res[i].symbol === currencies[j].symbol
            ) {
              currencies[j].name = res[i].name;
            }
          }
        }
        resolve(currencies);
      });
    });
  }
}
