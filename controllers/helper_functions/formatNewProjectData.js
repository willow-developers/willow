module.exports = formatNewProjectData = (project_id, google_id, title, milestones) => {
  let nodes = Object.values(milestones);

  // EDIT THESE VALUES TO ADJUST DEFAULT LOCATION OF NEW PROJECT NODES
  let svgWidth = 1100;
  let svgHeight = 640;
  let leftAndRightPadding = 100;

  // Calculated using values as outlined above
  let length = nodes.length;
  let nodeGap = (svgWidth - (leftAndRightPadding * 2)) / (length + 1);
  let yLocation = svgHeight / 2;
  let firstXLocation = leftAndRightPadding;
  let lastXLocation = svgWidth - leftAndRightPadding;

  nodes = nodes.map((node, idx) => {
    let xLocation = leftAndRightPadding + (nodeGap * (idx + 1));

    return {
      hash_id: google_id + '-' + project_id + '-' +  Date.now() + '-' + idx, // need to make
      owner_id: google_id,
      project_id: project_id, // get from project
      label_id: 3, // subtask label, see schema
      node_description: node, // from projectDetails
      node_status: null, // see schema for example
      node_data: null, // see schema for example
      status: 'new', // see schema for example
      x: xLocation,
      y: yLocation,
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
    x: firstXLocation,
    y: yLocation,
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
    x: lastXLocation,
    y: yLocation,
  });
  
  // generate links --- FORMAT: (source_id, hash_id, target_id, label_id, project_id)
  let links = [];
  for (var i = 0; i < nodes.length - 1; i++) {
    links.push({
      source_id: nodes[i].hash_id,
      hash_id: google_id + '-' + project_id + '-' + 'LINK' + '-' + i + '-' + Date.now(),
      target_id: nodes[i + 1].hash_id,
      label_id: 8,
      project_id: project_id,
      status: 'new',
    });
  }
  
  return { nodes, links };
};