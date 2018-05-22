module.exports = formatNewProjectData = (project_id, google_id, title, createProjectMilestones) => {

  // EDIT THESE VALUES TO ADJUST DEFAULT LOCATION OF NEW PROJECT NODES
  let svgWidth = 1100;
  let svgHeight = 640;
  let leftAndRightPadding = 100;

  // Calculated using values as outlined above -- do not modify unless refactoring completely/starting over
  let length = createProjectMilestones.length;
  let nodeGap = (svgWidth - (leftAndRightPadding * 2)) / (length + 1);
  let yLocation = svgHeight / 2;
  let firstXLocation = leftAndRightPadding;
  let lastXLocation = svgWidth - leftAndRightPadding;

  let nodes = createProjectMilestones.map((milestone, idx) => {
    let { item, label } = milestone;
    let xLocation = leftAndRightPadding + (nodeGap * (idx + 1));
    
    let labelForSchema;
    if (label === 'Action') labelForSchema = 3;
    else if (label === 'Objective') labelForSchema = 4;

    return {
      hash_id: google_id + '-' + project_id + '-' +  Date.now() + '-' + idx, // need to make
      owner_id: google_id,
      project_id: project_id,
      label_id: labelForSchema,
      node_description: item,
      node_status: null,
      node_data: null,
      status: 'new',
      x: xLocation,
      y: yLocation,
    };
  });

  // add start node to the nodes array
  nodes.unshift({
    hash_id: google_id + '-' + project_id + '-' + Date.now() + '-' + 'START',
    owner_id: google_id,
    project_id: project_id,
    label_id: 2,
    node_description: title,
    node_status: null,
    node_data: null,
    status: 'new',
    x: firstXLocation,
    y: yLocation,
  });

  // add final node to the nodes array
  nodes.push({
    hash_id: google_id + '-' + project_id + '-' + Date.now() + '-' + 'END',
    owner_id: google_id,
    project_id: project_id,
    label_id: 5, 
    node_description: title, 
    node_status: null, 
    node_data: null, 
    status: 'new', 
    x: lastXLocation,
    y: yLocation,
  });
  
  let links = [];
  for (var i = 0; i < nodes.length - 1; i++) {
    links.push({
      source_id: nodes[i].hash_id,
      hash_id: google_id + '-' + project_id + '-' + 'LINK' + '-' + i + '-' + Date.now(),
      target_id: nodes[i + 1].hash_id,
      label_id: 9,
      project_id: project_id,
      status: 'new',
    });
  }
  
  return { nodes, links };
};