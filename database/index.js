var connectionDetails;

process.env.NODE_ENV === 'production'?
  connectionDetails = {
    // TBD
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