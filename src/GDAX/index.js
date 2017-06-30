import { RtmClient, RTM_EVENTS } from '@slack/client';
import env from '../../env';
import GDAX from './GDAX';
import Slack from '../Slack/Slack';

const rtm = new RtmClient(env.bot_token);

rtm.on(RTM_EVENTS.MESSAGE, message => {
  const msg = message.text.toLowerCase();
  if (msg.indexOf('!gdax') === 0) {
    GDAX.getCurrency(msg.split(' ')[1].toUpperCase().trim())
    .then(res => {
      return Slack.sendMessage(message.channel, res);
    });
  }
});

rtm.start();