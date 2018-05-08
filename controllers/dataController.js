const fs = require('fs');
const path = require('path');
const ls = require('local-storage');
const metascraper = require('metascraper');
const got = require('got');

// HELPER FUNCTIONS:
const formatProjectData = require('./helper_functions/formatProjectData');
const filterAndFormatBeforeSaving = require('./helper_functions/filterAndFormatBeforeSaving');
const saveNodesAndLinks = require('./helper_functions/saveNodesAndLinks');

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
    let { project_name, owner_id, nodes, links } = req.query;
    let projectData = { project_name, owner_id };

    knex('projects').insert(projectData).then(result => {
        // TO DO: Finish functionality to save nodes/links:
        // saveNodesAndLinks(nodes, links)
        //     .then(result => {
        //         console.log('result: ', result);
        //         res.status(200).send(result);
        //     });

        console.log('result: ', result);
        res.status(200).send(result);
    }).catch(err => {
        console.log('err: ', err);
        res.status(500).send(err);
    });
};

exports.fetchProjects = (req, res) => {
    // update as needed!!
    let owner_id = req.query.user;

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
    let projectID = req.query.id;

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
    // delete/update later if client sends an object, testing with string in Postman for now
    if (typeof req.query.project === 'string') {
        var { nodes, links } = JSON.parse(req.query.project);
    } else if (req.query) {
        var { nodes, links } = req.query.project;
    }

    // /* The function below returns an object as follows:
    // data = { nodes: [nodes that need updating], links: [links that need updating] }; */
    let { nodesToUpdate, linksToUpdate } = filterAndFormatBeforeSaving(nodes, links);

    saveNodesAndLinks(nodesToUpdate, linksToUpdate)
        .then(response => {
            console.log('res: ', response);
            res.status(200).send('success!');
        }).catch(err => {
            console.log('err: ', err);
            res.status(500).send('error!!');
        });
};

exports.getBookmarkMetadata = async (req, res) => {
    const { targetUrl } = req.query;
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({html, url});
    console.log(metadata)
    res.send(metadata);
};