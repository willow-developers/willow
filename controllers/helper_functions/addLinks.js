module.exports = addLinks = (nodes, links) => {
  links[0].source_id = nodes[0].hash_id;
  links[0].target_id = nodes[1].hash_id;

  links[1].source_id = nodes[1].hash_id;
  links[1].target_id = nodes[2].hash_id;

  links[2].source_id = nodes[2].hash_id;
  links[2].target_id = nodes[3].hash_id;

  links[3].source_id = nodes[3].hash_id;
  links[3].target_id = nodes[4].hash_id;

  links[4].source_id = nodes[4].hash_id;
  links[4].target_id = nodes[5].hash_id;

  links[5].source_id = nodes[5].hash_id;
  links[5].target_id = nodes[6].hash_id;

  links[6].source_id = nodes[6].hash_id;
  links[6].target_id = nodes[7].hash_id;

  links[7].source_id = nodes[7].hash_id;
  links[7].target_id = nodes[8].hash_id;

  links[8].source_id = nodes[8].hash_id;
  links[8].target_id = nodes[9].hash_id;

  return links;
};