const knex = require('../../database/index');

exports.saveNodes = (nodes) => {
  return Promise.all(nodes.map(entry => {
    // console.log('processing node: ', entry.hash_id);
    if (entry.status === 'new') {
      delete entry.status;
      return knex('nodes').insert(entry).then(() => 1);
    } else if (entry.status === 'updated') {
      delete entry.status;
      return knex('nodes').where('hash_id', '=', entry.hash_id).update(entry).then(() => 1);
    } else if (entry.status === 'delete') {
      return knex('nodes').where('hash_id', '=', entry.hash_id).del().then(() => 1);
    }
  })).catch((err) => console.log('err: ', err))
}

exports.saveLinks = (links) => {
  // console.log('LINKS: ', links);
  return Promise.all(links.map(entry => {
    if (entry.status === 'new') {
      delete entry.status;
      return knex('links').insert(entry);
    } else if (entry.status === 'updated') {
      delete entry.status;
      return knex('links').where('hash_id', '=', entry.hash_id).update(entry);
    } else if (entry.status === 'delete') {
      return knex('links').where('hash_id', '=', entry.hash_id).del();
    }
  })).catch(err => console.log('err: ', err))
}

exports = saveNodesAndLinks = (nodes, links) => {
  let allUpdates = [...nodes, ...links];

  return Promise.all(allUpdates.map(entry => {

    // if the entry is a node --> update 'Nodes' table
    if (entry.hasOwnProperty('node_data')) {
      if (entry.status === 'new') {
        delete entry.status;
        console.log('new node before inserting: ', entry);
        return knex('nodes').insert(entry);
      } else if (entry.status === 'updated') {
        delete entry.status;
        console.log('updated node before updating: ', entry);
        return knex('nodes').where('hash_id', '=', entry.hash_id).update(entry);
      } else if (entry.status === 'delete') {
        return knex('nodes').where('hash_id', '=', entry.hash_id).del();
      }

      // else: update 'Links' table
    } else {
      if (entry.status === 'new') {
        delete entry.status;
        console.log('new link before inserting: ', entry);

        // updating link
        // return knex('links').insert(entry);

        // looking for node!!
        return knex.select().table('nodes');
        
      } else if (entry.status === 'updated') {
        delete entry.status;
        console.log('updated link before updating: ', entry);

        // updating link
        // return knex('links').where('hash_id', '=', entry.hash_id).update(entry);

        // looking for node!!
        return knex.select().table('nodes');

      } else if (entry.status === 'delete') {
        return knex('links').where('hash_id', '=', entry.hash_id).del();
      }
    }
  }));
};