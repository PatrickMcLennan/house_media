'use strict';

if (!process.env.POSTGRES_USER) require('dotenv').config();
const stringcase = require('knex-stringcase');

module.exports = stringcase({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
