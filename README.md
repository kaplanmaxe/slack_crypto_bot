# Slack Crypto Bot

### Installation

Set up cron job for AltCoins.js as well as SetChannelTicker.js

Cryptocheck MUST be installed globally on the server this runs on.

`npm install -g cryptocheck`

### Docker

Run:

```
docker network create cbb_mongo30
docker network create cbb_redis32
```

Then run `docker-compose up -d`

### Development
Install dependencies:

`npm install`

Set up env file with proper values.

`cp env.dist.js env.js`

While developing, open CLI and run:

`gulp`
