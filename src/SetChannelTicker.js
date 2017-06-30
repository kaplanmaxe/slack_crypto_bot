import GDAX from './GDAX/GDAX';
import Slack from './Slack/Slack';
import env from '../env';

GDAX.getAllPrices()
.then(res => {
  return Slack.setPurpose(env.tickerSlackChannel, res);
})
.then(() => {
  process.exit();
});
