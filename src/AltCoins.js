import Database from './Database';
import Bittrex from './Bittrex/Bittrex';
import Slack from './Slack/Slack';
import Currencies from './models/Currencies';
import { altcoinSlackChannel } from '../env';

const Models = {
  Currencies: null,
};
let db;
Database.connect()
.then(database => {
  db = database;
  Models.Currencies = new Currencies(database);
});

Bittrex.getMarketData()
.then(res => {
  res.best = Bittrex.getTopFive(res.best);
  res.worst = Bittrex.getTopFive(res.worst);
  // Doing it this way is more efficient so we only have to call method once.
  return Models.Currencies.getCurrencyNames(res.best.concat(res.worst));
})
.then(res => {
  Slack.sendMessage(altcoinSlackChannel, Slack.formAltcoinMessage(res.slice(5, 10), 'Worst'));
  Slack.sendMessage(altcoinSlackChannel, Slack.formAltcoinMessage(res.slice(0, 5), 'Best'));
  db.close();
  process.exit();
});
