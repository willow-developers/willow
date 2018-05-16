const fs = require('fs');
const path = require('path');
const ls = require('local-storage');
const metascraper = require('metascraper');
const got = require('got');

// HELPER FUNCTIONS:
const formatNewProjectData = require('./helper_functions/formatNewProjectData');
const formatProjectData = require('./helper_functions/formatProjectData');
const filterAndFormatBeforeSaving = require('./helper_functions/filterAndFormatBeforeSaving');
const { saveNodes, saveLinks } = require('./helper_functions/saveNodesAndLinks');

const knex = require('../database/index');

exports.test = (req, res) => {
    const dataPath = path.join(path.dirname(__dirname),'/dummy_data/graph_data.json');
    
    fs.readFile(dataPath, (err, data) => {
        console.log(data);
        if (err) console.error(err);
        res.send(JSON.parse(data));
    })
};

exports.createNewProject = (req, res) => {
    let { user, title, milestones } = req.body.data;
 

    let projectData = {
        project_name: title,
        owner_id: user.google_id,
    };

    knex('projects')
        .insert(projectData, 'id')
        .then(project_id => {
            // project_id is a single-value array containing the project_id, thus ->
            let { nodes, links } = formatNewProjectData(project_id[0], user.google_id, title, milestones);

            console.log('nodes and links: ', { nodes, links });

            // TO DO: Finish functionality to save nodes/links:
            saveNodesAndLinks(nodes, [])
                .then(result => {
                    console.log('result of save nodes: ', result);

                    saveNodesAndLinks([], links)
                        .then(result => {
                            console.log('result of save links!!', result);
                            res.status(200).send(result);
                        });
                });

            // res.status(200).send(result);
        }).catch(err => {
            console.log('err: ', err);
            res.status(500).send(err);
        });
};

exports.fetchProjects = (req, res) => {
    // update as needed!!
    let owner_id = req.query.userID;

    knex('projects')
        .where('owner_id', owner_id)
        .then(result => {
            console.log('result: ', result);
            res.status(200).send(result);
        })
        .catch(err => {
            console.log('err: ', err);
            res.status(500).send(err);
        });
};

exports.getProjectData = (req, res) => {
    let projectID = req.query.projectID;

    Promise.all([
        knex('projects').where('id', projectID),
        knex('nodes').where('project_id', projectID),
        knex('links').where('project_id', projectID),
        knex('labels')
    ]).then(results => {
        let projectData = {
            project: results[0][0],
            nodes: results[1],
            links: results[2],
            labels: results[3],
        };
        let formattedData = formatProjectData(projectData);
        res.status(200).send(formattedData);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
};

exports.saveProject = (req, res) => {
    var { nodes, links } = req.body.project;

    // /* The function below returns an object as follows:
    // data = { nodes: [nodes that need updating], links: [links that need updating] }; */
    let { nodesToUpdate, linksToUpdate } = filterAndFormatBeforeSaving(nodes, links);

    console.log('NODES TO UPDATE: ', nodesToUpdate);
    console.log('LINKS TO UPDATE: ', linksToUpdate);
    saveNodes(nodesToUpdate)
        .then(() => saveLinks(linksToUpdate))
        .then(() => res.status(200).send('success!'))
        .catch((err) => console.error(err));
};


exports.getBookmarkMetadata = async (req, res) => {
    const { targetUrl } = req.query;
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({html, url});
    // console.log(metadata)
    res.send(metadata);
};