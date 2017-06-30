import GDAX from './GDAX/GDAX';
import Slack from './Slack/Slack';
import env from '../env';

GDAX.getAllPrices()
.then(res => {
  console.log(res);
  Slack.setPurpose(env.channel_id_ticker, res);
  process.exit();
});
