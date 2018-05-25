const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = require('../config/keys');
var connectionDetails;

process.env.NODE_ENV === 'production' ?
  connectionDetails = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  } :
  connectionDetails = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,    
  };

const knex = require('knex')({
  client: 'pg',
  version: 10.3,
  connection: connectionDetails,
});

module.exports = knex;
