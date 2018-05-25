const knex = require('../../database/index');

exports.saveNodes = (nodes) => {
  return Promise.all(nodes.map(entry => {
    if (entry.status === 'new') {
      delete entry.status;
      return knex('nodes').insert(entry);
    } else if (entry.status === 'updated') {
      delete entry.status;
      return knex('nodes').where('hash_id', '=', entry.hash_id).update(entry);
    } else if (entry.status === 'delete') {
      return knex('nodes').where('hash_id', '=', entry.hash_id).del();
    }
  })).catch((err) => console.log('err: ', err))
};

exports.saveLinks = (links) => {
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
};

exports.saveProject = (project) => {
  return knex('projects').where('id', '=', project.id).update(project).catch(err => console.log('err: ', err))
};