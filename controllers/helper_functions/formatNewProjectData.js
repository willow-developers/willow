module.exports = formatNewProjectData = (project_id, google_id, title, milestones) => {
  let nodes, links;

  // console.log(project_id, milestones);

  // don't forget about nodes for start and end (use project title)
  nodes = Object.values(milestones);

  nodes = nodes.map((node, idx) => {
    // console.log('mapping!!', node, idx);

    return {
      hash_id: google_id + '-' + project_id + '-' +  Date.now() + '-' + idx, // need to make
      owner_id: google_id,
      project_id: project_id, // get from project
      label_id: 3, // subtask label, see schema
      node_description: node, // from projectDetails
      node_status: null, // see schema for example
      node_data: null, // see schema for example
      status: 'new', // see schema for example
      x: 0,
      y: 0,
    };
  });

  // add start node to the nodes array
  nodes.unshift({
    hash_id: google_id + '-' + project_id + '-' + Date.now() + '-' + 'START',
    owner_id: google_id,
    project_id: project_id, // get from project
    label_id: 1, // subtask label, see schema
    node_description: title, // from projectDetails
    node_status: null, // see schema for example
    node_data: null, // see schema for example
    status: 'new', // see schema for example
    x: 0,
    y: 0,
  });

  // add final node to the nodes array
  nodes.push({
    hash_id: google_id + '-' + project_id + '-' + Date.now() + '-' + 'END',
    owner_id: google_id,
    project_id: project_id, // get from project
    label_id: 2, // subtask label, see schema
    node_description: title, // from projectDetails
    node_status: null, // see schema for example
    node_data: null, // see schema for example
    status: 'new', // see schema for example
    x: 0,
    y: 0,
  });

  // console.log('nodes: ', nodes);
  
  // generate links --- FORMAT: (source_id, hash_id, target_id, label_id, project_id)
  links = [];
  for (var i = 0; i < nodes.length - 1; i++) {
    console.log('nodes[i]', nodes[i]);
    links.push({
      source_id: nodes[i].hash_id,
      hash_id: google_id + '-' + project_id + '-' + 'LINK' + '-' + i + '-' + Date.now(),
      target_id: nodes[i + 1].hash_id,
      label_id: 8,
      project_id: project_id,
      status: 'new',
    });
  }

  // console.log('links and nodes', { links, nodes });

  return { nodes, links };
}