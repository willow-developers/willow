const knex = require('../../database/index');
const { saveNodes, saveLinks } = require('./saveNodesAndLinks');

exports.createExampleProject = owner_id => {
  let projectData = {
    project_name: 'Example Project: \'Get A Software Engineering Job \'',
    owner_id: owner_id,
    zoomx: 0,
    zoomy: 0,
    zoomscale: 1
  };

  // EXAMPLE DATA:
  let nodes = [
    ['110227128753222443119', 1, 2, 'Start', '110227128753222443119-1-1526666246059', 90, 360],
    ['110227128753222443119', 1, 3, 'LEARN CODING', '110227128753222443119-1-1526666518332', 210, 360],
    ['110227128753222443119', 1, 3, 'CREATE PROJECTS', '110227128753222443119-1-1526666530347', 330, 360],
    ['110227128753222443119', 1, 4, 'COMPLETE 3 PROJECTS', '110227128753222443119-1-1526666538043', 450, 360],
    ['110227128753222443119', 1, 3, 'WORK ON RESUME', '110227128753222443119-1-1526666546220', 570, 360],
    ['110227128753222443119', 1, 4, 'FINISH RESUME', '110227128753222443119-1-1526666554173', 690, 360],
    ['110227128753222443119', 1, 3, 'APPLY JOBS', '110227128753222443119-1-1526666561262', 810, 360],
    ['110227128753222443119', 1, 4, '10 APPLICATIONS A DAY', '110227128753222443119-1-1526666567924', 930, 360],
    ['110227128753222443119', 1, 3, 'ACCEPT OFFER', '110227128753222443119-1-1526666577917', 1050, 360],
    ['110227128753222443119', 1, 4, '1 SOFTWARE ENGINEERING JOB', '110227128753222443119-1-1526666585388', 1170, 360],
  ];

  let links = [
    ['110227128753222443119-1-LINK-1526666792406', '110227128753222443119-1-1526666246059', '110227128753222443119-1-1526666518332', 8, 1],
    ['110227128753222443119-1-LINK-1526667033871', '110227128753222443119-1-1526666518332', '110227128753222443119-1-1526666530347', 8, 1],
    ['110227128753222443119-1-LINK-1526667080481', '110227128753222443119-1-1526666530347', '110227128753222443119-1-1526666538043', 9, 1],
    ['110227128753222443119-1-LINK-1526667164851', '110227128753222443119-1-1526666538043', '110227128753222443119-1-1526666546220', 8, 1],
    ['110227128753222443119-1-LINK-1526667233141', '110227128753222443119-1-1526666546220', '110227128753222443119-1-1526666554173', 9, 1],
    ['110227128753222443119-1-LINK-1526667276982', '110227128753222443119-1-1526666554173', '110227128753222443119-1-1526666561262', 8, 1],
    ['110227128753222443119-1-LINK-1526667394532', '110227128753222443119-1-1526666561262', '110227128753222443119-1-1526666567924', 9, 1],
    ['110227128753222443119-1-LINK-1526667440078', '110227128753222443119-1-1526666567924', '110227128753222443119-1-1526666577917', 8, 1],
    ['110227128753222443119-1-LINK-1526667488879', '110227128753222443119-1-1526666577917', '110227128753222443119-1-1526666585388', 9, 1],
  ];

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
        x: 390,
        y: 460,
        status: 'new',
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

      // add link

      saveNodes(formattedNodes)
        .then(nodesResult => {
          console.log({ nodesResult });
          saveLinks(formattedLinks)
            .then(linksResult => {
              console.log({ linksResult });
            });
        });
      });
};


// SCHEMA:

// CREATE TABLE nodes (
//   id SERIAL,
//   hash_id varchar(100),
//   owner_id varchar(100),
//   project_id INTEGER,
//   label_id INTEGER,
//   node_description varchar(100),
//   node_status varchar(100), -- Completed, In Progress, Closed/Cancelled, etc.
//   x double PRECISION,
//   y double PRECISION,
//   node_data jsonb,
//   PRIMARY KEY (hash_id),
//   FOREIGN KEY (owner_id) REFERENCES users (google_id) ON DELETE CASCADE,
//   FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
//   FOREIGN KEY (label_id) REFERENCES labels (id) ON DELETE CASCADE
// );

// CREATE TABLE links (
//   id SERIAL,
//   hash_id varchar(100),
//   project_id INT,
//   source_id varchar(100),
//   target_id varchar(100),
//   label_id INTEGER,
//   link_data jsonb,
//   PRIMARY KEY (id),
//   FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
//   FOREIGN KEY (source_id) REFERENCES nodes (hash_id) ON DELETE CASCADE,
//   FOREIGN KEY (target_id) REFERENCES nodes (hash_id) ON DELETE CASCADE,
//   FOREIGN KEY (label_id) REFERENCES labels (id) ON DELETE CASCADE
// );

// -- JUNS PROJECT
// -- START NODE: (1) START ACTION NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   0 VALUES ('110227128753222443119', 1, 2, 'Start', '110227128753222443119-1-1526666246059', 90.94002532959, 262.297256469727);
// -- LEARN CODING: (2) NEXT ACTION NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   1 VALUES ('110227128753222443119', 1, 3, 'LEARN CODING', '110227128753222443119-1-1526666518332', 200.689067840576, 257.106170654297);
// -- CREATE PROJECTS: (3) NEXT ACTION NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   2 VALUES ('110227128753222443119', 1, 3, 'CREATE PROJECTS', '110227128753222443119-1-1526666530347', 319.770111083984, 253.362060546875);
// -- 3 PROJECTS: (4) ONE TIME OBJECTIVE NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   3 VALUES ('110227128753222443119', 1, 4, '3 PROJECTS', '110227128753222443119-1-1526666538043', 439.1513671875, 247.504089355469);
// -- CREATE RESUME: (5) NEXT ACTION NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   4 VALUES ('110227128753222443119', 1, 3, 'CREATE RESUME', '110227128753222443119-1-1526666546220', 558.706481933594, 239.820358276368);
// -- 1 RESUME: (6) ONE TIME OBJECTIVE NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   5 VALUES ('110227128753222443119', 1, 4, '1 RESUME', '110227128753222443119-1-1526666554173', 646.566528320312, 236.411743164062);
// -- APPLY JOBS: (7) NEXT ACTION NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   6 VALUES ('110227128753222443119', 1, 3, 'APPLY JOBS', '110227128753222443119-1-1526666561262', 756.64166259766, 235.180099487305);
// -- 10 JOBS A DAY: (8) RECURRING OBJECTIVE NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   7 VALUES ('110227128753222443119', 1, 4, '10 JOBS A DAY', '110227128753222443119-1-1526666567924', 851.739318847657, 233.895263671875);
// -- ACCEPT OFFER: (9) NEXT ACTION NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   8 VALUES ('110227128753222443119', 1, 3, 'ACCEPT OFFER', '110227128753222443119-1-1526666577917', 968.410255432125, 228.826263427735);
// -- GET SOFTWARE ENGINEERING JOB (END): (10) ONE TIME OBJECTIVE NODE
// INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
//   9 VALUES ('110227128753222443119', 1, 4, '1 SOFTWARE ENGINEERING JOB', '110227128753222443119-1-1526666585388', 1057.27120971679, 223.168312072754);


// -- LINKS:
// -- JUN'S PROJECT
// -- START TO LEARN CODING : THEN
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   0 VALUES ('110227128753222443119-1-1526666246059', '110227128753222443119-1-1526666518332', 8, 1);
// -- LEARN CODING TO CREATE PROJECTS : THEN
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   1 VALUES ('110227128753222443119-1-1526666518332', '110227128753222443119-1-1526666530347', 8, 1);
// -- CREATE PROJECTS TO 3 PROJECTS : SHOULD
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   2 VALUES ('110227128753222443119-1-1526666530347', '110227128753222443119-1-1526666538043', 9, 1);
// -- 3 PROJECTS TO CREATE RESUME : THEN
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   3 VALUES ('110227128753222443119-1-1526666538043', '110227128753222443119-1-1526666546220', 8, 1);
// -- CREATE RESUME TO 1 RESUME : SHOULD
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   4 VALUES ('110227128753222443119-1-1526666546220', '110227128753222443119-1-1526666554173', 9, 1);
// -- 1 RESUME TO APPLY JOBS : THEN
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   5 VALUES ('110227128753222443119-1-1526666554173', '110227128753222443119-1-1526666561262', 8, 1);
// -- APPLY JOBS TO 10 JOBS A DAY : SHOULD
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   6 VALUES ('110227128753222443119-1-1526666561262', '110227128753222443119-1-1526666567924', 9, 1);
// -- 10 JOBS A DAY TO ACCEPT OFFER : THEN
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   7 VALUES ('110227128753222443119-1-1526666567924', '110227128753222443119-1-1526666577917', 8, 1);
// -- ACCEPT OFFER TO GET SOFTWARE ENGINEERING JOB : SHOULD
// INSERT INTO links (source_id, target_id, label_id, project_id)
//   8 VALUES ('110227128753222443119-1-1526666577917', '110227128753222443119-1-1526666585388', 9, 1);
