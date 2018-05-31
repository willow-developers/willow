const fs = require('fs');
const path = require('path');
const ls = require('local-storage');
const metascraper = require('metascraper');
const got = require('got');
const knex = require('../database/index');

// HELPER FUNCTIONS:
const formatNewProjectData = require('./helper_functions/formatNewProjectData');
const formatProjectData = require('./helper_functions/formatProjectData');
const filterAndFormatBeforeSaving = require('./helper_functions/filterAndFormatBeforeSaving');
const { saveNodes, saveLinks, saveProject } = require('./helper_functions/saveNodesAndLinks');
const createExampleProject = require('./helper_functions/createExampleProject');

exports.createNewProject = (req, res) => {
    let { user, title, createProjectMilestones } = req.body.data;
 
    let projectData = { project_name: title, owner_id: user.google_id, zoomx: 0, zoomy: 0, zoomscale: 1 };

    knex('projects')
        .insert(projectData, 'id')
        .then(project_id => {
            // project_id is a single-value array containing the project_id, thus ->
            let { nodes, links } = formatNewProjectData(project_id[0], user.google_id, title, createProjectMilestones);

            console.log({ nodes, links });

            saveNodes(nodes)
                .then(() => {
                    saveLinks(links)
                        .then(() => {
                            let data = { project_id: project_id[0] };
                            res.status(200).send(data);
                        });
                });
        }).catch(err => {
            console.log('err: ', err);
            res.status(500).send(err);
        });
};

exports.fetchProjects = (req, res) => {
    
    // update as needed!!
    let owner_id = req.query.userID;

    // to go to Jun's google account:
    // owner_id = '110227128753222443119';

    knex('projects')
        .where('owner_id', owner_id)
        .then(result => {
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
    var { nodes, links, project} = req.body.project;
    let { nodesToUpdate, linksToUpdate } = filterAndFormatBeforeSaving(nodes, links);
    
    saveNodes(nodesToUpdate)
        .then(() => saveLinks(linksToUpdate))
        .then(() => saveProject(project))
        .then(() => res.status(200).send('success!'))
        .catch((err) => res.status(500).send('error: ', err));
};

exports.getBookmarkMetadata = async (req, res) => {
    const { targetUrl } = req.query;
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({html, url});
    res.send(metadata);
};

exports.deleteProject = (req, res) => {
    knex('projects')
        .where({ 'id': req.body.projectID, 'owner_id': req.user[0].google_id })
        .del()
        .then(result => res.status(200).send('success!'))
        .catch(err => res.status(500).send({ err }));
};