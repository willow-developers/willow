import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from '../config/keys';
var connectionDetails;

process.env.NODE_ENV === 'production'?
  connectionDetails = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  } :
  connectionDetails = {
    host: '127.0.0.1',
    user: 'willow_admin',
    password: 'qwerty',
    database: 'willow',    
  };

const knex = require('knex')({
  client: 'pg',
  version: 10.3,
  connection: connectionDetails,
});

module.exports = knex;