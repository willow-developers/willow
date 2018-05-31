const knex = require('../../database/index');
const { saveNodes, saveLinks } = require('./saveNodesAndLinks');
const { reactData, nodes, links } = require('./exampleProjectData');

exports.createExampleProject = owner_id => {
  let projectData = {
    project_name: 'Example Project: \'Get A Software Engineering Job \'',
    owner_id: owner_id,
    zoomx: 0,
    zoomy: 0,
    zoomscale: 1
  };

  return knex('projects')
    .insert(projectData, 'id')
    .then(project_id => {
      let date = Date.now();

      // project_id is a single-value array containing the project_id, thus ->
      let adjProjID = project_id[0];

      let formattedNodes = nodes.map((node, idx) => {
        return {
          owner_id: owner_id,
          project_id: adjProjID,
          label_id: node[2],
          node_description: node[3],
          hash_id: `${date}-${owner_id}-${idx}`,
          x: node[5],
          y: node[6],
          status: 'new',
        };
      });

      // add exploratory node about React
      formattedNodes.push({
        owner_id: owner_id,
        project_id: adjProjID,
        label_id: 1,
        node_description: 'React',
        hash_id: `${date}-${owner_id}-REACT`,
        x: 510,
        y: 460,
        status: 'new',
        node_data: reactData
      });

      let formattedLinks = links.map((link, idx) => {
        return {
          hash_id: `${date}-${owner_id}-${idx}`,
          source_id: formattedNodes[idx].hash_id,
          target_id: formattedNodes[idx + 1].hash_id,
          label_id: link[3],
          project_id: adjProjID,
          status: 'new',
        };
      });

      formattedLinks.push({
        hash_id: `${date}-${owner_id}-reactLink`,
        source_id: formattedNodes[3].hash_id,
        target_id: formattedNodes[10].hash_id,
        label_id: 6,
        project_id: adjProjID,
        status: 'new',
      });

      saveNodes(formattedNodes)
        .then(nodesResult => {
          saveLinks(formattedLinks);
        });
      });
};
