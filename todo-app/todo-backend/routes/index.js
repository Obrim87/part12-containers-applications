const express = require('express');
const router = express.Router();
const redis = require('../redis');
require('dotenv').config();

let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    mongo_url: process.env.MONGO_URL,
    redis: process.env.REDIS_URL,
    hello: 'hello',
    visits
  });
});

module.exports = router;
