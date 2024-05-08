const redis = require('redis');
const { promisify } = require('util');
require('dotenv').config();

let getAsync;
let setAsync;

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled');
    return null;
  };
  getAsync = redisIsDisabled;
  setAsync = redisIsDisabled;
} else {
  const client = redis.createClient({
    url: REDIS_URL
  });

  getAsync = promisify(client.get).bind(client);
  setAsync = promisify(client.set).bind(client);
}

module.exports = {
  getAsync,
  setAsync
};
