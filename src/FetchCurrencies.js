import CoinMarketCap from './CoinMarketCap/CoinMarketCap';
import Database from './Database';
import Currencies from './models/Currencies';

let db;
Database.connect()
.then(database => {
  db = database;
  return new Currencies(database);
})
.then(currencies => {
  currencies.remove();
  CoinMarketCap.getCurrencies()
  .then(data => {
    currencies.insert(data);
    console.log('Currency data inserted successfully!');
    db.close();
    process.exit();
  });
});
