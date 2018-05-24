import React, { Component } from 'react';
import { connect } from 'react-redux';

import uuid from "node-uuid";
import { modalClose, modalOpen } from '../actions/modal';
import { closeBookmark, saveBookmark, resetBookmarks } from '../actions/bookmarks';
import { closeNoteView, addNote, resetNotes } from '../actions/notes';

import Modals from '../containers/Modal_NEW/Modals';
import ExplorativeNode from '../containers/ExplorativeNode';
// import Milestones from '../containers/Milestones/MilestoneColumn';

import { projectSave, projectGetData } from '../actions/project';

import * as d3 from 'd3';
import {getNodeColor} from './Willow_helper_functions/getNodeColor';
import {getLinkColor} from './Willow_helper_functions/getLinkColor';
import {getLinkLabelID} from './Willow_helper_functions/getLinkLabelID';
import {createNewNode} from './Willow_helper_functions/createNewNode';
import {createNewLink} from './Willow_helper_functions/createNewLink';

let d3State = {
    selectedNode: {},
    selectedLink: {},
    menuOpen: false,
    deleteMode: false,
    newLinkMode: false,
    newLinkMode2: false,
    newLinkMode3: false,
    contextMenuOpen: false,
    addNodeButtonPressed: false,
    newNodeX: 0,
    newNodeY: 0,
}

let tempBool = false;

const zoomTrans = {x:0, y:0, scale:1};

class WillowCore extends Component {
    componentDidMount() {
        this.placeNewNode = this.placeNewNode.bind(this);
        this.d3Setup();
    }
    componentDidUpdate() {
        this.d3Restart();
    }

    onOpen = (obj) => {
        this.props.modalOpen(obj);
    }

    onClose = (obj) => {
        this.props.modalClose(obj);
    }

//--------------------------------------------------------------------------------- SETUP SETTINGS
//--------------------------------------------------- D3 SETUP
    d3Setup() {
        const svg = d3.select('#willowCore');
        
        //Background Color
        const backgroundColor = svg.append("rect")
            .attr('class','background')
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", '#dadada');

        const zoomLayer = this.zoomSetup();
        const linksGroup = zoomLayer.append('g')
          .attr('class', 'links')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6);

        const nodesGroup = zoomLayer.append('g')
          .attr('class', 'nodes');

        this.setupContextMenu(zoomLayer);

        svg.on('contextmenu', () => {
            d3.event.preventDefault();
            (d3State.contextMenuOpen) ?
                this.closeContextMenu():
                this.openContextMenu();
        })

        svg.on('mousemove', () => {
            let x = (d3.event.offsetX - zoomTrans.x)/zoomTrans.scale;
            let y = (d3.event.offsetY - zoomTrans.y)/zoomTrans.scale;

            if (!d3State.contextMenuOpen) d3.select('.newNodeRightClickMenu').attr('transform', ` translate(${x},${y})`);
        })

        backgroundColor.on('click', () => {
            this.reset();
        })
    }
    setupContextMenu(zoomLayer) {
        const contextMenu = zoomLayer.append('g')
            .attr('class', 'newNodeRightClickMenu')
            
        const newExplorativeNodeButton = contextMenu.append('g')
            .attr('class', 'newExplorativeNodeButton')
            .on('mouseover', () => {
                d3.select('.newExplorativeNodeButton').select('circle')
                    .attr('fill', 'red')
            })
            .on('mouseout', () => {
                d3.select('.newExplorativeNodeButton').select('circle')
                    .attr('fill', 'white')
            })
            .on('click', () => {
                this.closeContextMenu();
                let newObject = createNewNode('explorative', this.props.projectData, this.props.userStatus)
                newObject.x = d3State.newNodeX;
                newObject.y = d3State.newNodeY;

                this.simulation.stop();
                this.props.projectData.nodes.push(newObject);
                this.d3Restart();
            })
        
        newExplorativeNodeButton
            .append('circle')
                .attr('r', 0)
                .attr('fill', 'white')

        newExplorativeNodeButton
            .append('path')
                .attr('d', "M241.66,50.65,251.58,43a1.76,1.76,0,0,1,2.46.31l45.59,58.82a1.74,1.74,0,0,1-.31,2.46l-9.92,7.69a1.75,1.75,0,0,1-2.45-.31l-45.6-58.82A1.76,1.76,0,0,1,241.66,50.65ZM198.6,96.13l36,46.47a1.74,1.74,0,0,0,2.46.31L275.62,113a1.74,1.74,0,0,0,.31-2.46l-36-46.47a1.74,1.74,0,0,0-2.46-.31L198.91,93.67A1.76,1.76,0,0,0,198.6,96.13ZM79.86,198.88,105.52,232a1.74,1.74,0,0,0,2.45.32l115.41-89.47a1.74,1.74,0,0,0,.31-2.46L198,107.27a1.75,1.75,0,0,0-2.45-.31L80.17,196.43A1.73,1.73,0,0,0,79.86,198.88ZM60.47,219.42l20.32,26.22a1.76,1.76,0,0,0,2.46.31l15.9-12.33a1.74,1.74,0,0,0,.31-2.46L79.14,205a1.75,1.75,0,0,0-2.45-.31L60.79,217A1.74,1.74,0,0,0,60.47,219.42ZM43.55,237.94l15.09,19.47a1.76,1.76,0,0,0,2.46.31l13.75-10.67a1.74,1.74,0,0,0,.32-2.45L60.08,225.13a1.76,1.76,0,0,0-2.46-.31L43.86,235.48A1.76,1.76,0,0,0,43.55,237.94ZM20.37,250.52l20.32,26.21a1.75,1.75,0,0,0,2.45.31l8-6.17a1.73,1.73,0,0,0,.31-2.45L47.18,263,53,258.5a1.76,1.76,0,0,0,.31-2.46L43.53,243.5a1.74,1.74,0,0,0-2.45-.32l-5.77,4.47-4.22-5.44a1.75,1.75,0,0,0-2.46-.32l-7.95,6.17A1.74,1.74,0,0,0,20.37,250.52Z")
                .attr("transform", " scale(0.0) translate(-150.66, -150)")

        newExplorativeNodeButton
            .append('polygon')
            .attr('points', "166.7 153.3 210.94 153.3 210.94 166.7 166.7 166.7 166.7 210.94 153.3 210.94 153.3 166.7 109.06 166.7 109.06 153.3 153.3 153.3 153.3 109.06 166.7 109.06 166.7 153.3")
            .attr('fill', 'red')
            .attr("transform", " scale(0.0) translate(-150.66, -150)") 

        const newStartActionNodeButton = contextMenu.append('g')
                .attr('class', 'newStartActionNodeButton')
                .on('mouseover', () => {
                    d3.select('.newStartActionNodeButton').select('circle')
                        .attr('fill', 'red')
                })
                .on('mouseout', () => {
                    d3.select('.newStartActionNodeButton').select('circle')
                        .attr('fill', 'white')
                })
                .on('click', () => {
                    this.closeContextMenu();
                    let newObject = createNewNode('startAction', this.props.projectData, this.props.userStatus)
                    newObject.x = d3State.newNodeX
                    newObject.y = d3State.newNodeY
    
                    this.simulation.stop();
                    this.props.projectData.nodes.push(newObject);
                    this.d3Restart();
                })

        newStartActionNodeButton
            .append('circle')
            .attr('r', 0)
            .attr('fill', 'white')

        newStartActionNodeButton
            .append('path')
            .attr('d', "M20,275.46V44.54L300,160Z")
            .attr("transform", " scale(0.00) translate(-150.66, -150)")

        newStartActionNodeButton
            .append('polygon')
            .attr('points', "166.7 153.3 210.94 153.3 210.94 166.7 166.7 166.7 166.7 210.94 153.3 210.94 153.3 166.7 109.06 166.7 109.06 153.3 153.3 153.3 153.3 109.06 166.7 109.06 166.7 153.3")
            .attr('fill', 'red')
            .attr("transform", " scale(0.0) translate(-150.66, -150)") 

        const newNextActionNodeButton = contextMenu.append('g')
                .attr('class', 'newNextActionNodeButton')
                .on('mouseover', () => {
                    d3.select('.newNextActionNodeButton').select('circle')
                        .attr('fill', 'red')
                })
                .on('mouseout', () => {
                    d3.select('.newNextActionNodeButton').select('circle')
                        .attr('fill', 'white')
                })
                .on('click', () => {
                    this.closeContextMenu();
                    let newObject = createNewNode('nextAction', this.props.projectData, this.props.userStatus)
                    newObject.x = d3State.newNodeX
                    newObject.y = d3State.newNodeY
    
                    this.simulation.stop();
                    this.props.projectData.nodes.push(newObject);
                    this.d3Restart();
                })

        newNextActionNodeButton
            .append('circle')
            .attr('r', 0)
            .attr('fill', 'white')

        newNextActionNodeButton
            .append('path')
            .attr('d', "M94.1,244.9V75.1L300,160Zm-74.1,0H56.61V75.1H20Z")
            .attr("transform", " scale(0.0) translate(-150.66, -150)")

        newNextActionNodeButton
            .append('polygon')
            .attr('points', "166.7 153.3 210.94 153.3 210.94 166.7 166.7 166.7 166.7 210.94 153.3 210.94 153.3 166.7 109.06 166.7 109.06 153.3 153.3 153.3 153.3 109.06 166.7 109.06 166.7 153.3")
            .attr('fill', 'red')
            .attr("transform", " scale(0.0) translate(-150.66, -150)") 


        const newOneTimeObjectiveNodeButton = contextMenu.append('g')
                .attr('class', 'newOneTimeObjectiveNodeButton')
                .on('mouseover', () => {
                    d3.select('.newOneTimeObjectiveNodeButton').select('circle')
                        .attr('fill', 'red')
                })
                .on('mouseout', () => {
                    d3.select('.newOneTimeObjectiveNodeButton').select('circle')
                        .attr('fill', 'white')
                })
                .on('click', () => {
                    this.closeContextMenu();
                    let newObject = createNewNode('oneTimeObjective', this.props.projectData, this.props.userStatus)
                    newObject.x = d3State.newNodeX
                    newObject.y = d3State.newNodeY
    
                    this.simulation.stop();
                    this.props.projectData.nodes.push(newObject);
                    this.d3Restart();
                })

        newOneTimeObjectiveNodeButton
            .append('circle')
            .attr('r', 0)
            .attr('fill', 'white')

        newOneTimeObjectiveNodeButton
            .append('path')
            .attr('d', "M300,300H20V20H300ZM33.72,286.28H286.28V33.72H33.72ZM160,117.73A42.27,42.27,0,1,0,202.27,160,42.28,42.28,0,0,0,160,117.73Z")
            .attr("transform", " scale(0.0) translate(-150.66, -150)")

        newOneTimeObjectiveNodeButton
            .append('polygon')
            .attr('points', "166.7 153.3 210.94 153.3 210.94 166.7 166.7 166.7 166.7 210.94 153.3 210.94 153.3 166.7 109.06 166.7 109.06 153.3 153.3 153.3 153.3 109.06 166.7 109.06 166.7 153.3")
            .attr('fill', 'red')
            .attr("transform", " scale(0.0) translate(-150.66, -150)") 
        

        const newRecurringObjectiveNodeButton = contextMenu.append('g')
                .attr('class', 'newRecurringObjectiveNodeButton')
                .on('mouseover', () => {
                    d3.select('.newRecurringObjectiveNodeButton').select('circle')
                        .attr('fill', 'red')
                })
                .on('mouseout', () => {
                    d3.select('.newRecurringObjectiveNodeButton').select('circle')
                        .attr('fill', 'white')
                })
                .on('click', () => {
                    this.closeContextMenu();
                    let newObject = createNewNode('recurringObjective', this.props.projectData, this.props.userStatus)
                    newObject.x = d3State.newNodeX;
                    newObject.y = d3State.newNodeY;
    
                    this.simulation.stop();
                    this.props.projectData.nodes.push(newObject);
                    this.d3Restart();
                })

        newRecurringObjectiveNodeButton
            .append('circle')
            .attr('r', 0)
            .attr('fill', 'white')

        newRecurringObjectiveNodeButton
            .append('path')
            .attr('d', "M62.05,136l15.16,4.07a87,87,0,1,1,29.53,87.23,9.44,9.44,0,0,1,12-14.58A68.17,68.17,0,1,0,95.47,145l14.59,3.91L74.91,184ZM300,20V300H20V20ZM286.28,33.72H33.72V286.28H286.28Z")
            .attr("transform", " scale(0.0) translate(-150.66, -150)") 
            
        newRecurringObjectiveNodeButton
            .append('polygon')
            .attr('points', "166.7 153.3 210.94 153.3 210.94 166.7 166.7 166.7 166.7 210.94 153.3 210.94 153.3 166.7 109.06 166.7 109.06 153.3 153.3 153.3 153.3 109.06 166.7 109.06 166.7 153.3")
            .attr('fill', 'red')
            .attr("transform", " scale(0.0) translate(-150.66, -150)") 
    }
    openContextMenu() {
        let x = (d3.event.offsetX - zoomTrans.x)/zoomTrans.scale;
        let y = (d3.event.offsetY - zoomTrans.y)/zoomTrans.scale;
        d3State.newNodeX = x;
        d3State.newNodeY = y;

        d3State.contextMenuOpen = true;
        d3.select('.newExplorativeNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(0, -50)')
        
        d3.select('.newExplorativeNodeButton').select('circle')
            .transition()
            .duration(200)
            .attr('r', 20)
        
        d3.select('.newExplorativeNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', " scale(0.08) translate(-150.66, -150)")

        //NEW START
        d3.select('.newStartActionNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(47, -15.5)')

        d3.select('.newStartActionNodeButton').select('circle')
            .transition()
            .duration(200)
            .attr('r', 20)
        
        d3.select('.newStartActionNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', " scale(0.08) translate(-150.66, -150)")

        //NEXT START
        d3.select('.newNextActionNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(29.38, 40.5)')

        d3.select('.newNextActionNodeButton').select('circle')
            .transition()
            .duration(200)
            .attr('r', 20)
        
        d3.select('.newNextActionNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', " scale(0.08) translate(-150.66, -150)")

        //ONE TIME OBJECTIVE
        d3.select('.newOneTimeObjectiveNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(-29.38, 40.5)')
        
        d3.select('.newOneTimeObjectiveNodeButton').select('circle')
            .transition()
            .duration(200)
            .attr('r', 20)
        
        d3.select('.newOneTimeObjectiveNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', " scale(0.08) translate(-150.66, -150)")

        //RECURRING OBJECTIVE
        d3.select('.newRecurringObjectiveNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(-47, -15.5)')
        
        d3.select('.newRecurringObjectiveNodeButton').select('circle')
            .transition()
            .duration(200)
            .attr('r', 20)
        
        d3.select('.newRecurringObjectiveNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', " scale(0.08) translate(-150.66, -150)")
    }
    closeContextMenu() {
        d3State.contextMenuOpen = false;
        //NEW EXPLORATIVE NODE BUTTON TRANSITIONS
        d3.select('.newExplorativeNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(0, 0)')

        d3.select('.newExplorativeNodeButton').select('circle')
            .attr('r', 0)

        d3.select('.newExplorativeNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', 'scale(0) translate(0, 0)')

        //NEW START ACTIOn NODE BUTTON TRANSITIONS
        d3.select('.newStartActionNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(0, 0)')

        d3.select('.newStartActionNodeButton').select('circle')
            .attr('r', 0)

        d3.select('.newStartActionNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', 'scale(0) translate(0, 0)')

        //NEW NEXT ACTION NODE BUTTON TRANSITIONS
        d3.select('.newNextActionNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(0, 0)')

        d3.select('.newNextActionNodeButton').select('circle')
            .attr('r', 0)

        d3.select('.newNextActionNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', 'scale(0) translate(0, 0)')

        //NEW ONE TIME OBJECTIVE NODE BUTTON TRANSITIONS
        d3.select('.newOneTimeObjectiveNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(0, 0)')

        d3.select('.newOneTimeObjectiveNodeButton').select('circle')
            .attr('r', 0)

        d3.select('.newOneTimeObjectiveNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', 'scale(0) translate(0, 0)')
        //NEW RECURRING OBJECTIVE NODE BUTTON TRANSITIONS
        d3.select('.newRecurringObjectiveNodeButton')
            .transition()
            .duration(200)
            .attr('transform', 'translate(0, 0)')

        d3.select('.newRecurringObjectiveNodeButton').select('circle')
            .attr('r', 0)

        d3.select('.newRecurringObjectiveNodeButton').selectAll('path')
            .transition()
            .duration(200)
            .attr('transform', 'scale(0) translate(0, 0)')

    }
//--------------------------------------------------- TICKED
    ticked() {
        d3.select('.nodes').selectAll('.node').attr('transform', d => `translate(${d.x}, ${d.y})`);

        d3.selectAll('.links').selectAll('line')
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    }
//--------------------------------------------------- ZOOM SETUP
    zoomSetup() {
        const svg = d3.select('svg')
        const zoomLayer = svg.append('g')
          .attr('class', 'zoomLayer');

        const zoom_handler = d3.zoom().scaleExtent([0.25, 2.25]).on("zoom", () => {
            zoomTrans.x = d3.event.transform.x;
            zoomTrans.y = d3.event.transform.y;
            zoomTrans.scale = d3.event.transform.k;
            zoomLayer.attr('transform', d3.event.transform);

            this.zoom_actions(zoomLayer)
        });

        zoom_handler(svg);
        return zoomLayer;
    }

    zoom_actions(zoomLayer) {
        zoomLayer.attr('transform', d3.event.transform);
    }
//--------------------------------------------------- PLACE NEW NODE
    placeNewNode(dataObject) {
        let x = (d3.event.offsetX - zoomTrans.x)/zoomTrans.scale;
        let y = (d3.event.offsetY - zoomTrans.y)/zoomTrans.scale;
        d3.select('svg').on('click', null);

        if (((x | 0) % 30) < 15) dataObject.x = (x | 0) - ((x | 0) % 30);
        if (((x | 0) % 30) >= 15) dataObject.x = (x | 0) + (30 - ((x | 0) % 30));
        if (((y | 0) % 30) < 15) dataObject.y = (y | 0) - ((y | 0) % 30);
        if (((y | 0) % 30) >= 15) dataObject.y = (y | 0) + (30 - ((y | 0) % 30));

        dataObject.status = 'new';

        this.simulation.stop();
        this.props.projectData.nodes.push(dataObject);
        this.d3Restart();
    }

//--------------------------------------------------- D3 RESTART
    d3Restart() {
        this.clearScreen();

        const zoomLayer = d3.select('.zoomLayer')

        const nodesData = this.props.projectData.nodes;
        const linksData = this.props.projectData.links;

        this.simulation = d3.forceSimulation().nodes(nodesData)
        const link_force = d3.forceLink(linksData).id((d) => d.hash_id).strength(0);
        
        this.simulation
            .force('links', link_force)
            .on('tick', this.ticked);
        
        this.createNodes(nodesData);
        this.createLinks(linksData);

        this.showProjectTitle();
        this.createMainMenu();

        var drag_handler = d3.drag()
                .on("start", (d) => this.drag_start(d, this.simulation))
                .on("drag", (d) => this.drag_drag(d, this.simulation))
                .on("end", (d) => this.drag_end(d, this.simulation));	
       
        drag_handler( d3.select('.nodes').selectAll('.node'));
    }

//--------------------------------------------------- CREATE MAIN MENU
    createMainMenu() {
        const svg = d3.select('svg')

        const saveButton = svg.append('g')
            .attr('class', 'saveButton menuBar')
            .attr('transform', `translate( ${this.props.width - 50} , ${10})`)
            .on('mouseover', () => {
                d3.select('.saveButton').select('rect')
                    .attr('fill', '#f8d861')
                d3.select('.saveButton').select('text')
                    .style('visibility', 'visible')
                    .attr('transform', 'translate(-40, 15)')
            })
            .on('mouseout', () => {
                d3.select('.saveButton').select('rect')
                    .attr('fill', 'white')

                d3.select('.saveButton').select('text')
                    .attr('transform', 'translate(0, 15)')
                    .style('fill','black')
                    .style('visibility', 'hidden')
            })
            .on('click', () => {
                d3.select('.saveButton').select('rect')
                .attr('fill', '#317669')
                d3.select('.background')
                    .attr('fill', 'green')

                setTimeout(() => {
                    d3.select('.background')
                        .transition()
                        .duration(1000)
                        .attr('fill', '#dadada')
                }, 0)
                this.props.saveProject(this.props.projectData);
            })

            saveButton
                .append('text')
                .text('SAVE')
                .attr('transform', 'translate(0, 15)')
                .style('fill','black')
                .style('font-size', 15)
                .style('visibility', 'hidden')

            saveButton
                .append('rect')
                .attr('class', 'mainMenuButton')
                .attr('fill', 'white')
                .attr('height', 40)
                .attr('width', 40);

            saveButton
            .append('path')
            .attr('d' , "M131.85,167.09h22.3v-102h11.7v102h22.3L160,215.84ZM285,174.82v65.05H35V174.82H20v80.09H300V174.82Z")
            .attr('transform', 'scale(0.10) translate(30, 30)');

        const addNodeButton = svg.append('g')
            .attr('class', 'addNodeButton menuBar')
            .attr('transform', `translate( ${this.props.width - 50} , ${60})`)
            .on('mouseover', () => {
                if (!d3State.addNodeButtonPressed) {
                    d3.select('.addNodeButton').select('rect')
                        .attr('fill', '#f8d861')
                }

                d3.select('.addNodeButton').select('text')
                    .style('visibility', 'visible')
                    .attr('transform', 'translate(-80, 15)')
            })
            .on('mouseout', () => {
                if (!d3State.addNodeButtonPressed) {
                    d3.select('.addNodeButton').select('rect')
                        .attr('fill', 'white')
                }

                d3.select('.addNodeButton').select('text')
                        .attr('transform', 'translate(0, 15)')
                        .style('fill','black')
                        .style('visibility', 'hidden')
            })
            .on('click', () => {
                d3State.addNodeButtonPressed = true;
                d3.select('.addNodeButton').select('rect')
                    .attr('fill', 'yellow')

                setTimeout(() => d3.select('.background').on('click', () => {
                    this.openContextMenu();
                    setTimeout(() => {
                        d3.select('.background').on('click', this.closeContextMenu)
                        d3.select('.addNodeButton').select('rect')
                            .attr('fill', 'white')
                    }, 0);
                }), 0)
                
            })

            addNodeButton
                .append('text')
                .text('ADD NODE')
                .attr('transform', 'translate(0, 15)')
                .style('fill','black')
                .style('font-size', 15)
                .style('visibility', 'hidden')

            addNodeButton
                .append('rect')
                .attr('class', 'mainMenuButton')
                .attr('fill', 'white')
                .attr('height', 40)
                .attr('width', 40);

            addNodeButton
            .append('path')
            .attr('d' , "M166.7,153.3h44.24v13.4H166.7v44.24H153.3V166.7H109.06V153.3H153.3V109.06h13.4ZM300,160c0,77.2-62.8,140-140,140S20,237.2,20,160,82.8,20,160,20,300,82.8,300,160Zm-18.83,0A121.17,121.17,0,1,0,160,281.17,121.31,121.31,0,0,0,281.17,160Z")
            .attr('transform', 'scale(0.10) translate(30, 30)');

        const addLinkButton = svg.append('g')
            .attr('class', 'addLinkButton menuBar')
            .attr('transform', `translate( ${this.props.width - 50} , ${110})`)
            .on('mouseover', () => {
                if (!d3State.newLinkMode2) {
                    d3.select('.addLinkButton').select('rect')
                        .attr('fill', '#f8d861')
                }

                d3.select('.addLinkButton').select('text')
                    .style('visibility', 'visible')
                    .attr('transform', 'translate(-70, 15)')
            })
            .on('mouseout', () => {

                if (!d3State.newLinkMode2) {
                    d3.select('.addLinkButton').select('rect')
                    .attr('fill', 'white')
                }

                d3.select('.addLinkButton').select('text')
                        .attr('transform', 'translate(0, 15)')
                        .style('fill','black')
                        .style('visibility', 'hidden')
            })
            .on('click', () => {
                d3.select('.addLinkButton').select('rect')
                    .attr('fill', 'red')
                d3State.newLinkMode2 = true;
            })

            addLinkButton
                .append('text')
                .text('ADD LINK')
                .attr('transform', 'translate(0, 15)')
                .style('fill','black')
                .style('font-size', 15)
                .style('visibility', 'hidden')

            addLinkButton
                    .append('rect')
                    .attr('class', 'mainMenuButton')
                    .attr('fill', 'white')
                    .attr('height', 40)
                    .attr('width', 40);
        
            addLinkButton
                    .append('path')
                    .attr('d' , "M267.15,61.81,49,280a15,15,0,1,1-9-9L258.19,52.85,241.11,35.78,300,20,284.22,78.89ZM109.41,133H121V94.71h38.24V83.12H121V44.89H109.41V83.12H71.18V94.71h38.23Z")
                    .attr('transform', 'scale(0.10) translate(30, 30)');
        
        const deleteButton = svg.append('g')
            .attr('class', 'deleteButton menuBar')
            .attr('transform', `translate( ${this.props.width - 50} , ${160})`)
            .on('mouseover', () => {

                if (!d3State.deleteMode) {
                    d3.select('.deleteButton').select('rect')
                    .attr('fill', '#f8d861')
                }

                d3.select('.deleteButton').select('text')
                    .style('visibility', 'visible')
                    .attr('transform', 'translate(-60, 15)')
            })
            .on('mouseout', () => {
                if (!d3State.deleteMode) {
                    d3.select('.deleteButton').select('rect')
                        .attr('fill', 'white')
                }

                d3.select('.deleteButton').select('text')
                        .attr('transform', 'translate(0, 15)')
                        .style('fill','black')
                        .style('visibility', 'hidden')
            })
            .on('click', () => {
                d3.select('.deleteButton').select('rect')
                    .attr('fill', 'red')

                if (JSON.stringify(d3State.selectedNode) === JSON.stringify({})) {
                    console.log('hello');
                    d3State.deleteMode = true;

                } else {
                    d3State.selectedNode.status = 'delete';
                    this.props.projectData.links.forEach(link => {
                        if (link.source_id === d3State.selectedNode.hash_id || link.target_id === d3State.selectedNode.hash_id) {
                            link.status = 'delete';
                        }
                    })
                    console.log(this.props.projectData);
                    this.reset();
                    this.d3Restart();
                }
            })
            deleteButton
                .append('text')
                .text('DELETE')
                .attr('transform', 'translate(0, 15)')
                .style('fill','black')
                .style('font-size', 15)
                .style('visibility', 'hidden')

            deleteButton
                .append('rect')
                .attr('class', 'mainMenuButton')
                .attr('fill', 'white')
                .attr('height', 40)
                .attr('width', 40);
    
            deleteButton
                .append('path')
                .attr('d' , "M270,80H50a8.11,8.11,0,1,0,0,16.22H61.47L90.55,277.67a23.08,23.08,0,0,0,23,22.33h92.82a23.08,23.08,0,0,0,23-22.33L258.53,96.22H270A8.11,8.11,0,1,0,270,80ZM147.9,283.78,136.46,96.22h46L171,283.78ZM106.76,277v-.64L77.89,96.22h42.32l11.44,187.56H113.59A6.83,6.83,0,0,1,106.76,277Zm106.48-.64V277a6.83,6.83,0,0,1-6.83,6.83H187.27L198.71,96.22h43.4ZM60.27,47.57a8.11,8.11,0,0,1,8.11-8.11h62.4a17.15,17.15,0,0,1-.24-2.7A16.78,16.78,0,0,1,147.3,20h25.4a16.78,16.78,0,0,1,16.76,16.76,17.15,17.15,0,0,1-.24,2.7h62.4a8.11,8.11,0,1,1,0,16.22H68.38A8.11,8.11,0,0,1,60.27,47.57Z")
                .attr('transform', 'scale(0.10) translate(30, 30)');
    }
//--------------------------------------------------- SHOW PROJECT TITLE
    showProjectTitle() {
        const svg = d3.select('svg')

        svg.append('text')
            .text(this.props.projectData.project.project_name)
                .attr('transform', 'translate(10, 50)')
                .style('font-size', 40)
                // .style('text-anchor', 'middle')
                .style('fill', 'black');
    }
//--------------------------------------------------- CLEAR SCREEN
    clearScreen() {
        this.reset();
        d3.selectAll('.menuBar').remove();
        d3.selectAll('line').remove();
        d3.selectAll('.node').remove();
    }
//--------------------------------------------------- CREATE LINKS
    createLinks(linksData) {
        const link = d3.select('.links')
            .selectAll("line")
            .data(linksData, (d) => d.hash_id)
            .enter().append("line")

        link
            .attr('stroke-width', 4)
            .style('stroke', d => getLinkColor(d))
            .on('click', (d) => {
                link.filter(data => data.hash_id === d.hash_id)
                    .style('stroke', 'yellow')
                d3State.selectedLink = d;
            })

        link.filter(data => data.status === 'delete')
            .style('visibility', 'hidden')
    }
//--------------------------------------------------- CREATE NODES
    createNodes(nodesData) {
        const node = d3.select('.nodes').selectAll('g')
        .data(nodesData, (d) => d.hash_id)
        .enter().append('g')
        .attr('class', 'node')

        this.createMenu(node);

        //EXPLORATIVE NODE
        const explorativeNode = node.filter((d) => d.label_id === 1)
            .append('g')
            .attr('class', 'explorativeNode')
            .on('click', (d) => this.clickOpenNodeMenu(d))

        explorativeNode
            .append('circle')
                .attr('r', 25)
                .attr('class', 'face')
                .attr('fill', (d) => getNodeColor(d))
        
        explorativeNode
            .append('path')
                .attr('d', () => {
                    return "M241.66,50.65,251.58,43a1.76,1.76,0,0,1,2.46.31l45.59,58.82a1.74,1.74,0,0,1-.31,2.46l-9.92,7.69a1.75,1.75,0,0,1-2.45-.31l-45.6-58.82A1.76,1.76,0,0,1,241.66,50.65ZM198.6,96.13l36,46.47a1.74,1.74,0,0,0,2.46.31L275.62,113a1.74,1.74,0,0,0,.31-2.46l-36-46.47a1.74,1.74,0,0,0-2.46-.31L198.91,93.67A1.76,1.76,0,0,0,198.6,96.13ZM79.86,198.88,105.52,232a1.74,1.74,0,0,0,2.45.32l115.41-89.47a1.74,1.74,0,0,0,.31-2.46L198,107.27a1.75,1.75,0,0,0-2.45-.31L80.17,196.43A1.73,1.73,0,0,0,79.86,198.88ZM60.47,219.42l20.32,26.22a1.76,1.76,0,0,0,2.46.31l15.9-12.33a1.74,1.74,0,0,0,.31-2.46L79.14,205a1.75,1.75,0,0,0-2.45-.31L60.79,217A1.74,1.74,0,0,0,60.47,219.42ZM43.55,237.94l15.09,19.47a1.76,1.76,0,0,0,2.46.31l13.75-10.67a1.74,1.74,0,0,0,.32-2.45L60.08,225.13a1.76,1.76,0,0,0-2.46-.31L43.86,235.48A1.76,1.76,0,0,0,43.55,237.94ZM20.37,250.52l20.32,26.21a1.75,1.75,0,0,0,2.45.31l8-6.17a1.73,1.73,0,0,0,.31-2.45L47.18,263,53,258.5a1.76,1.76,0,0,0,.31-2.46L43.53,243.5a1.74,1.74,0,0,0-2.45-.32l-5.77,4.47-4.22-5.44a1.75,1.75,0,0,0-2.46-.32l-7.95,6.17A1.74,1.74,0,0,0,20.37,250.52Z";
                })
                .attr("transform", "scale(0.10) translate(-150.66, -150)")
                .attr("fill", 'black')

        //START ACTION NODE
        const startActionNode = node.filter(d => d.label_id === 2)
                .append('g')
                .attr('class', 'startActionNode')
                .on('click', (d) => this.clickOpenNodeMenu(d))

        startActionNode
            .append('circle')
            .attr('class', 'face')
            .attr('r', 25)
            .attr('fill', (d) => getNodeColor(d))

        startActionNode
            .append('path')
            .attr('d', function(d) { 
                return "M20,275.46V44.54L300,160Z";
            })
            .attr("transform", "scale(0.10) translate(-150.66, -150)")
            .attr("fill", 'black')
            
        //NEXT ACTION NODE

        const nextActionNode = node.filter(d => d.label_id === 3)
            .append('g')
            .attr('class', 'nextActionNode')
            .on('click', (d) => this.clickOpenNodeMenu(d))
        
        nextActionNode 
            .append('circle')
            .attr('class', 'face')
            .attr('r', 25)
            .attr('fill', (d) => getNodeColor(d))
        
        nextActionNode
            .append('path')
            .attr('d', function(d) { 
                return "M94.1,244.9V75.1L300,160Zm-74.1,0H56.61V75.1H20Z";
            })
            .attr("transform", "scale(0.10) translate(-150.66, -150)")
            .attr("fill", 'black')
            
                
        // ONE TIME OBJECTIVE NODE
        const oneTimeObjectiveNode = node.filter(d => d.label_id === 4)
            .append('g')
            .attr('class', 'oneTimeObjectiveNode')
            .on('click', (d) => this.clickOpenNodeMenu(d))

        oneTimeObjectiveNode
            .append('circle')
            .attr('class', 'face')
            .attr('r', 25)
            .attr('fill', (d) => getNodeColor(d))

        oneTimeObjectiveNode
            .append('path')
            .attr('d', function(d) { 
                return "M300,300H20V20H300ZM33.72,286.28H286.28V33.72H33.72ZM160,117.73A42.27,42.27,0,1,0,202.27,160,42.28,42.28,0,0,0,160,117.73Z";
            })
            .attr("transform", "scale(0.10) translate(-150.66, -150)")
            .attr("fill", 'black')
            

        // RECURRING OBJECTIVE NODE
        const recurringObjectiveNode = node.filter(d => d.label_id === 5)
            .append('g')
            .attr('class', 'recurringObjectiveNode')
            .on('click', (d) => this.clickOpenNodeMenu(d))

        recurringObjectiveNode
            .append('circle')
            .attr('class', 'face')
            .attr('r', 25)
            .attr('fill', (d) => getNodeColor(d))

        recurringObjectiveNode
            .append('path')
            .attr('d', d => {
                return "M62.05,136l15.16,4.07a87,87,0,1,1,29.53,87.23,9.44,9.44,0,0,1,12-14.58A68.17,68.17,0,1,0,95.47,145l14.59,3.91L74.91,184ZM300,20V300H20V20ZM286.28,33.72H33.72V286.28H286.28Z";
            })
            .attr("transform", "scale(0.10) translate(-150.66, -150)")
            .attr("fill", 'black')
            

        node.append('text')
            .text((d) => d.data)
                .attr('x', '0')
                .attr('y', '0')
                .attr('transform', 'translate(0, 0)')
                .style('font-size', 5)
                .style('text-anchor', 'middle')
                .style('fill', 'white');

        d3.selectAll('.node').filter(data => data.status === 'delete')
            .style('visibility' , 'hidden')
    }



//--------------------------------------------------- CREATE NODE MENU
    createMenu(node) {
        const deleteNodeButton = node.append('g')
            .attr('class', 'deleteNodeButton menu')
            .attr('transform', 'translate(0, 0)')
            .on('click', d => {
                d3.selectAll('.deleteNodeButton').filter(data => d.hash_id === d.hash_id).select('circle')
                    .attr('fill', 'red')

                d3State.selectedNode.status = 'delete';
                this.props.projectData.links.forEach(link => {
                    if (link.source_id === d3State.selectedNode.hash_id || link.target_id === d3State.selectedNode.hash_id) {
                        link.status = 'delete';
                    }
                })
                console.log(this.props.projectData);
                this.reset();
                this.d3Restart();
            })
        
        deleteNodeButton
            .append('circle')
                .attr('r', 15)
                .attr('fill', 'white')

        deleteNodeButton
            .append('path')
            .attr('d', () => {
                return "M270,80H50a8.11,8.11,0,1,0,0,16.22H61.47L90.55,277.67a23.08,23.08,0,0,0,23,22.33h92.82a23.08,23.08,0,0,0,23-22.33L258.53,96.22H270A8.11,8.11,0,1,0,270,80ZM147.9,283.78,136.46,96.22h46L171,283.78ZM106.76,277v-.64L77.89,96.22h42.32l11.44,187.56H113.59A6.83,6.83,0,0,1,106.76,277Zm106.48-.64V277a6.83,6.83,0,0,1-6.83,6.83H187.27L198.71,96.22h43.4ZM60.27,47.57a8.11,8.11,0,0,1,8.11-8.11h62.4a17.15,17.15,0,0,1-.24-2.7A16.78,16.78,0,0,1,147.3,20h25.4a16.78,16.78,0,0,1,16.76,16.76,17.15,17.15,0,0,1-.24,2.7h62.4a8.11,8.11,0,1,1,0,16.22H68.38A8.11,8.11,0,0,1,60.27,47.57Z";
            })
            .attr('transform', 'scale(0.05) translate(-160, -150)');

        const addNewLinkButton = node.append('g')
            .attr('class', 'addNewLinkButton menu')
            .attr('transform', 'translate(0,0)')
            .on('click', d => {
                d3.selectAll('.addNewLinkButton').filter(data => d.hash_id === d.hash_id).select('circle')
                    .attr('fill', 'red')
                d3State.newLinkMode = true;
            })
        addNewLinkButton 
            .append('circle')
                .attr('r', 15)
                .attr('fill', 'white')

        addNewLinkButton
            .append('path')
            .attr('d', () => {
                return "M267.15,61.81,49,280a15,15,0,1,1-9-9L258.19,52.85,241.11,35.78,300,20,284.22,78.89ZM109.41,133H121V94.71h38.24V83.12H121V44.89H109.41V83.12H71.18V94.71h38.23Z";
            })
            .attr('transform', 'scale(0.05) translate(-160, -150)');

        const displayInfoButton = node.append('g')
            .attr('class', 'displayInfoButton menu')
            .attr('transform', 'translate(0,0)')
            
        displayInfoButton
            .append('circle')
                .attr('r', 15)
                .attr('fill', 'white')

        displayInfoButton
            .append('path')
            .attr('d', () => {
                return "M223.74,20H63A16.35,16.35,0,0,0,46.69,36.34V283.66A16.35,16.35,0,0,0,63,300H257a16.35,16.35,0,0,0,16.35-16.34V65.21Zm0,22.12,25.32,23.09H223.74ZM257,283.66H63V36.34H207.39V81.56H257ZM80.74,142H239.26v18H80.74Zm109-61.55h-109v-18h109Zm-109,96.42H239.26v18H80.74Zm0,34.86H239.26v18H80.74Z";
            })
            .attr('transform', 'scale(0.05) translate(-160, -150)');
    }
//--------------------------------------------------- RESET
    reset() {
        d3State = {
            selectedNode: {},
            selectedLink: {},
            menuOpen: false,
            deleteMode: false,
            newLinkMode: false,
            newLinkMode2: false,
            contextMenuOpen: false,
            addNodeButtonPressed: false,
            newNodeX: 0,
            newNodeY: 0,
        }

        d3.select('.deleteLinkButton')
        .transition()
        .duration(500)
        .attr('transform', 'translate(500, 640)')

        d3.selectAll('.face')
            .attr('fill', (d) => getNodeColor(d))

        d3.selectAll('.mainMenuButton')
            .attr('fill', 'white')

        d3.selectAll('.menu').selectAll('circle')
            .attr('fill', 'white')

        d3.selectAll('.links').selectAll('line')
            .style('stroke', d => getLinkColor(d))

        d3.selectAll('.menu')
            .transition()
            .duration(250)
            .attr('width', 0)
            .attr('height', 0)
            .attr('transform', `translate(0, 0)`)

        d3.selectAll('.menuLabel')
            .transition()
            .duration(250)
            .attr('x', `0`)
            .attr('y', `0`)
            .style('font-size', '0')
            .style('visibility', 'hidden')
    }
//--------------------------------------------------------------------------------- MENU SETTINGS
//--------------------------------------------------- CLICK OPEN NODE MENU
    clickOpenNodeMenu(d) {
        if (d3State.newLinkMode) {
            const newLinkObject = createNewLink(this.props.projectData, this.props.userStatus, d3State.selectedNode, d);
            if (newLinkObject === 'fail') {
                console.log('node cannot link to itself')
                this.reset();
                return;
            }

            this.simulation.stop();
            this.props.projectData.links.push(newLinkObject);
            this.reset(); 
            this.d3Restart();
            return;
        } else if (d3State.newLinkMode2) {
            d3State.selectedNode = d;

            d3.selectAll('.face').filter(data => data.hash_id === d.hash_id)
                .attr('fill', 'green')

            d3State.newLinkMode2 = false;
            d3State.newLinkMode = true;

        } else if (d3State.deleteMode) {
            d.status = 'delete';

            this.props.projectData.links.forEach(link => {
                if (link.source_id === d.hash_id || link.target_id === d.hash_id) {
                    link.status = 'delete';
                }
            })
            console.log(this.props.projectData);
            this.reset();
            this.d3Restart();

        } else if (d3State.menuOpen) {
            this.reset();
        } else {
            const clickedNode = d3.selectAll('.node').filter((data) => data.hash_id === d.hash_id)

            d3State.menuOpen = true;
            d3State.selectedNode = d;
        
            // UpperLeft
            clickedNode.select('.deleteNodeButton')
            .transition()
            .duration(200)
            .attr('transform', `translate(0, 40)`)

            clickedNode.select('.addNewLinkButton')
            .transition()
            .duration(200)
            .attr('transform', `translate(34.64, -20)`)

            clickedNode.select('.displayInfoButton')
            .transition()
            .duration(200)
            .attr('transform', `translate(-34.64, -20)`)
            
            //Node Circle
            clickedNode.select('.face')
                .attr('fill', '#f8d861')
        }
    }
//--------------------------------------------------- DISPLAY MENU BUTTON
  clickDisplayMenuMode(d) {
    const selectedNode = d3State.selectedNode;
    let content;

    const closeSaveExplorative = () => {
        if (selectedNode.label_id === 1) {
            selectedNode.node_data = {
                bookmarks: this.props.bookmarkListAdd,
                notes: this.props.notes
            };

            this.props.closeBookmark();
            this.props.closeNoteView();
            console.log(selectedNode)
            this.props.saveProject(this.props.projectData);
            this.props.resetBookmarks();
            this.props.resetNotes();
        } else {
            selectedNode.node_data = {
                bookmarks: this.props.bookmarkListAdd,
                notes: this.props.notes
            };

            this.props.closeBookmark();
            this.props.closeNoteView();
            console.log(selectedNode)
            this.props.saveProject(this.props.projectData);
            this.props.resetBookmarks();
            this.props.resetNotes();
        }
    }

    if (selectedNode.label_id === 1) {
        content = <ExplorativeNode />;
        if (!!selectedNode.node_data) {
            selectedNode.node_data.bookmarks.forEach((bm) => this.props.saveBookmark(bm));
            selectedNode.node_data.notes.forEach((nt) => this.props.addNote(nt));
        }
    } else {
        content = <ExplorativeNode />;
        if (!!selectedNode.node_data) {
            selectedNode.node_data.bookmarks.forEach((bm) => this.props.saveBookmark(bm));
            selectedNode.node_data.notes.forEach((nt) => this.props.addNote(nt));
        }
    }



    this.onOpen({
        id: uuid.v4(),
        onClose: () => closeSaveExplorative(),
        content
    })

    console.log(selectedNode);
  }
  
//--------------------------------------------------- UNLOCK MENU BUTTON
//--------------------------------------------------- DELETE MENU BUTTON
//--------------------------------------------------- TICKED
  ticked() {
    d3.select('.nodes').selectAll('.node').attr('transform', d => `translate(${d.x}, ${d.y})`);

    d3.selectAll('.links').selectAll('line')
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  }
//--------------------------------------------------- DRAG NODE
  drag_start(d, simulation) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    if (d.status !== 'new') d.status = 'updated';
  }
  //make sure you can't drag the circle outside the box
  drag_drag(d, simulation) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  drag_end(d, simulation) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    if (((d3.event.x | 0) % 30) < 15) d.x = (d3.event.x | 0) - ((d3.event.x | 0) % 30);
    if (((d3.event.x | 0) % 30) >= 15) d.x = (d3.event.x | 0) + (30 - ((d3.event.x | 0) % 30));
    if (((d3.event.y | 0) % 30) < 15) d.y = (d3.event.y | 0) - ((d3.event.y | 0) % 30);
    if (((d3.event.y | 0) % 30) >= 15) d.y = (d3.event.y | 0) + (30 - ((d3.event.y | 0) % 30));
  }
//--------------------------------------------------- RENDER
  render() {
    return (
      <div id="chart">
        <svg  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" id="willowCore" width={ this.props.width } height={ (this.props.height - 55) } />
        <Modals />
      </div>
    );
  }
    }
const mapStateToProps = (state) => {
    return { 
        projectData: state.projectData,
        userStatus: state.userStatus,
        modals: state.isModalOpen.modals,
        bookmarkListAdd: state.bookmarkListAdd,
        notes: state.notes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        saveProject: (projectData) => dispatch(projectSave(projectData)),
        projectGetData: (projectID) => dispatch(projectGetData(projectID)),
        modalClose: (obj) => dispatch(modalClose(obj)),
        modalOpen: (obj) => dispatch(modalOpen(obj)),
        closeBookmark: () => dispatch(closeBookmark()),
        closeNoteView: () => dispatch(closeNoteView()),
        saveBookmark: (data) => dispatch(saveBookmark(data)),
        addNote: (data) => dispatch(addNote(data)),
        resetBookmarks: () => dispatch(resetBookmarks()),
        resetNotes: () => dispatch(resetNotes()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WillowCore);