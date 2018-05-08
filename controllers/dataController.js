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

exports.postUser = (req, res) => {

    // UPDATE TO REQ.BODY.__________ for each line OR format req.body before sending
    let userData = {
        first_name: 'Steve',
        last_name: 'Jones',
        username: 'steveJones',
        email: 'steveJones@aol.com',
        hashed_password: '123456',
    };

    knex('users').insert(userData).then(result => {
        console.log('result: ', result);
        res.status(200).send(result);
    }).catch(err => {
        console.log('err: ', err);
        res.status(500).send(err);
    });
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

exports.currentUser = (req, res) => {
    const checkUser = ls('user');
    if (checkUser === null) {
        res.send('');
    } else {
        res.send({ user: 1 });
    }
};

exports.login = (req, res) => {
    ls('user', 1)
    res.send({ user: 1 });
};

exports.signup = (req, res) => {
    ls('user', 1)
    res.send({ user: 1 });
};

exports.logout = (req, res) => {
    ls.remove('user');
    res.send('');
};

exports.getBookmarkMetadata = async (req, res) => {
    const { targetUrl } = req.query;
    
    // targetUrl = 'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance';
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({html, url});
    console.log(metadata)
    res.send(metadata);
};
