import React, { Component } from 'react';
import { connect } from 'react-redux';

import {projectSave, projectGetData} from '../actions/project';

import * as d3 from 'd3';
import {getNodeColor} from './Willow_helper_functions/getNodeColor';
import {getLinkColor} from './Willow_helper_functions/getLinkColor';
import {getLinkLabelID} from './Willow_helper_functions/getLinkLabelID';
import {createNewNode} from './Willow_helper_functions/createNewNode';

import { modalClose, modalOpen } from '../actions/modal';
import MilestoneContainer from '../containers/Milestones/MilestoneContainer';
import Modals from '../containers/Modal_NEW/Modals';

let d3State = {
    selectedNode: {},
    selectedLink: {},
    menuOpen: false,
    newLinkMode: false,
    newNodeMode: '',
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
    onClose(obj) {
      this.props.modalClose(obj);
    }
//--------------------------------------------------------------------------------- SETUP SETTINGS
//--------------------------------------------------- D3 SETUP
    d3Setup() {
        const svg = d3.select('#willowCore');
        
        //Background Color
        const backgroundColor = svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", '#DCDCDC');

        const zoomLayer = this.zoomSetup();

        const linksGroup = zoomLayer.append('g')
          .attr('class', 'links')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6);

        const nodesGroup = zoomLayer.append('g')
          .attr('class', 'nodes');

        svg.append('rect')
            .attr('class','testing')
            .attr('width', 0)
            .attr('height', 0)
            .style('fill', 'black')
            .attr('x', 0)
            .attr('y', 0)

        svg.on('contextmenu', () => {
            d3.event.preventDefault();
            if (tempBool) {
                d3.select('.testing')
                .transition()
                .duration(200)
                .attr('height', 0)
                .attr('width', 0)
            } else {
                let x = (d3.event.offsetX - zoomTrans.x)/zoomTrans.scale;
                let y = (d3.event.offsetY - zoomTrans.y)/zoomTrans.scale;
    
                d3.select('.testing')
                    .transition()
                    .duration(200)
                    .attr('height', 100)
                    .attr('width', 100)
            }
            tempBool = !tempBool;
            // let x = (d3.event.offsetX - zoomTrans.x)/zoomTrans.scale;
            // let y = (d3.event.offsetY - zoomTrans.y)/zoomTrans.scale;
        })

        svg.on('mousemove', () => {
            let x = (d3.event.offsetX - zoomTrans.x)/zoomTrans.scale;
            let y = (d3.event.offsetY - zoomTrans.y)/zoomTrans.scale;

            if (!tempBool) {
                d3.select('.testing')
                .attr('x', x)
                .attr('y', y)
            }
        })
            // svg
            //     .append('g')
            //     .attr('transform', `translate(${x}, ${y})`)
            //     .attr('class', 'newNodeMenu')

            //     .append('rect')
            //     .attr('class', 'newNodeRect newNodeExplorative')
            //     .style('fill', 'white')
            //     .attr('width', 10)
            //     .attr('height', 10)

            //     .append('rect')
            //     .attr('class', 'newNodeRect newNodeObjective')
            //     .style('fill', 'white')
            //     .attr('width', 10)
            //     .attr('height', 10)

            //     .append('rect')
            //     .attr('class', 'newNodeRect newNodeAction')
            //     .style('fill', 'white')
            //     .attr('width', 10)
            //     .attr('height', 10)

            //     .append('rect')
            //     .attr('class', 'newNodeRect blank')
            //     .style('fill', 'white')
            //     .attr('width', 10)
            //     .attr('height', 10)
        // })

        backgroundColor.on('click', () => {
            this.reset();
        })


        d3.select('svg').append('g')
        .attr('transform', 'translate(500, 640)')
        .attr('class', 'deleteLinkButton')
        .append('rect')
        .attr('width', 40)
        .attr('height', 40)
        .style('fill', 'black')


        d3.select('.deleteLinkButton')
        .append('text')
        .text('DELETE LINK')
        .attr('transform', 'translate(0, 20)')
        .style('font-size', 10)
        .style('fill', 'white')
        .on('click', () => {
            d3State.selectedLink.status = 'delete';
            console.log(d3State.selectedLink);
            this.d3Restart();
            // d3.select('.links').selectAll('line').filter((d) => d.stat)
        })
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

        dataObject.x = x;
        dataObject.y = y;
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

        //DEV BUTTON
        this.createSeeProjectDataButton();
        
        this.createSaveButton();
        const devButtons = ['explorative', 'startAction', 'nextAction', 'oneTimeObjective', 'recurringObjective'];
        devButtons.forEach((type, i) => {
            this.createNewCreateButton(type, i)
        })

        var drag_handler = d3.drag()
                .on("start", (d) => this.drag_start(d, this.simulation))
                .on("drag", (d) => this.drag_drag(d, this.simulation))
                .on("end", (d) => this.drag_end(d, this.simulation));	
       
        drag_handler( d3.select('.nodes').selectAll('.node'));
    }
//--------------------------------------------------- CLEAR SCREEN
    clearScreen() {
        this.reset();
        d3.selectAll('line').remove();
        d3.selectAll('.node').remove();
        d3.selectAll('.saveButton').remove();
        d3.selectAll('.button').remove();
    }
//--------------------------------------------------- CREATE LINKS
    createLinks(linksData) {
        const link = d3.select('.links')
            .selectAll("line")
            .data(linksData, (d) => d.hash_id)
            .enter().append("line")

        link
            .attr('stroke-width', 2)
            .style('stroke', d => getLinkColor(d))
            .on('click', (d) => {
                link.selectAll('line').filter(data => data.hash_id === d.hash_id)
                d3State.selectedLink = d;
                this.openBottomLinkMenu(d);
            })

        //testing hide all links set to "delete"
        link.filter((d) => d.status === 'delete')
            .style('visibility', 'hidden');
    }

    openBottomLinkMenu(d) {
        d3.select('.deleteLinkButton')
            .transition()
            .duration(500)
            .attr('transform', 'translate(500, 600)')

        console.log('open link for: ', d3State.selectedLink);

    }
//--------------------------------------------------- CREATE NODES
    createNodes(nodesData) {
        const node = d3.select('.nodes').selectAll('g')
        .data(nodesData, (d) => d.hash_id)
        .enter().append('g')
        .attr('class', 'node')

        this.createMenu(node);

        //EXPLORATIVE NODE
        node.filter((d) => d.label_id === 1)
            .append('circle')
                .attr('class', 'face')
                .attr("r", 15)
                .attr("fill", (d) => getNodeColor(d))
                    .on('click', (d) => this.clickOpenNodeMenu(d))
        
        //START ACTION NODE
        node.filter((d) => d.label_id === 2)
            .append('path')
            .attr('d', function(d) { 
                return 'M -10 -15 l 0 30 l 20 -15 z';
            })
            .attr('class', 'face')
            .attr('width', 20)
            .attr('height', 20)
            .attr("fill", (d) => getNodeColor(d))
            .on('click', (d) => this.clickOpenNodeMenu(d))
            
        //NEXT ACTION NODE
        node.filter((d) => d.label_id === 3)
            .append('path')
            .attr('d', function(d) { 
                return 'M -10 -15 l 0 30 l 20 -15 z';
            })
            .attr('class', 'face')
            .attr('width', 20)
            .attr('height', 20)
            .attr("fill", (d) => getNodeColor(d))
            .on('click', (d) => this.clickOpenNodeMenu(d))
                
        // ONE TIME OBJECTIVE NODE
        node.filter((d) => d.label_id === 4)
            .append('path')
            .attr('d', function(d) { 
                return `M 0 0 
                        l 11 -11 
                        l 11 0 
                        l 11 11 
                        l 0 11 
                        l -11 11 
                        l -11 0
                        l -11 -11
                        l 0 -11
                        z`;
            })
            .attr('class', 'face')
            .attr('width', 20)
            .attr('height', 20)
            .attr('transform', 'translate(-17, -6)')
            .attr("fill", (d) => getNodeColor(d))
            .on('click', (d) => this.clickOpenNodeMenu(d))

        // RECURRING OBJECTIVE NODE
        node.filter((d) => d.label_id === 5)
            .append('path')
            .attr('d', function(d) { 
                return `M 0 0 
                        l 11 -11 
                        l 11 0 
                        l 11 11 
                        l 0 11 
                        l -11 11 
                        l -11 0
                        l -11 -11
                        l 0 -11
                        z`;
            })
            .attr('class', 'face')
            .attr('width', 20)
            .attr('height', 20)
            .attr('transform', 'translate(-17, -6)')
            .attr("fill", (d) => getNodeColor(d))
            .on('click', (d) => this.clickOpenNodeMenu(d))

        node.append('text')
            .text((d) => d.data)
                .attr('x', '0')
                .attr('y', '0')
                .attr('transform', 'translate(0, 0)')
                .style('font-size', 5)
                .style('text-anchor', 'middle')
                .style('fill', 'white');
    }



//--------------------------------------------------- CREATE NODE MENU
    createMenu(node) {
        node
        .append('rect')
        .attr('class', 'newNodeButton menu')
        .attr('width', 0)
        .attr('height', 0)
        .style('fill', '#DDD')
        
        node
        .append('text')
        .attr('class', 'newNodeLabel menuLabel')
        .text('new Node')
        .attr('x', `0`)
        .attr('y', `0`)
        .style('font-size', '0')
        .style('visibility', 'hidden')

        //==================================================
        node
        .append('rect')
        .attr('class', 'displayButton menu displayMenu')
        .attr('width', 0)
        .attr('height', 0)
        .style('fill', '#DDD')
        
        node
        .append('text')
        .attr('class', 'displayButtonLabel menuLabel displayMenu')
        .text('display')
        .attr('x', `0`)
        .attr('y', `0`)
            .style('font-size', '0')
            .style('visibility', 'hidden')

        node.selectAll('.displayMenu')
            .on('click', (d) => {this.clickDisplayMenuMode(d)})
            
        //==================================================
        node
        .append('rect')
        .attr('class', 'linkButton menu linkMenu')
        .attr('width', 0)
        .attr('height', 0)
        .attr('id', d => d.hash_id)
        .style('fill', '#DDD')
        
        node
        .append('text')
        .attr('class', 'linkButtonLabel menu linkMenu menuLabel')
        .text('link')
        .attr('x', `0`)
        .attr('y', `0`)
        .style('font-size', '0')
        .style('visibility', 'hidden')

        node.selectAll('.linkMenu')
            .on('click', (d) => {this.clickNewLinkMode(d)})
        
        //==================================================
        node
        .append('rect')
        .attr('class', 'deleteButton menu')
        .attr('width', 0)
        .attr('height', 0)
        .style('fill', '#DDD')
        
        node
        .append('text')
        .attr('class', 'deleteButtonLabel menuLabel')
        .text('delete')
        .attr('x', `0`)
        .attr('y', `0`)
        .style('font-size', '0')
        .style('visibility', 'hidden')
        //==================================================
    }
//--------------------------------------------------- CREATE SAVE BUTTON
    createSaveButton() {
        const saveButton = d3.select('svg').append('g')
        .attr('class', 'saveButton')

        saveButton.append('rect')
            .attr('width', 50)
            .attr('height', 20)
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', 'white')
        
        saveButton.append('text').text('SAVE')
            .attr('position', 'relative')
            .attr('x', `24`)
            .attr('y', `15`)
            .style('fill', 'black')
            .style('font-size', '10')
            .style('text-anchor', 'middle')
        
        saveButton
            .attr('transform', 'translate(5, 5)')

        saveButton
            .on('click', () => {
                d3.select('.saveButton').select('rect')
                    .style('fill', 'red')
                this.props.saveProject(this.props.projectData)
            })
    }
//--------------------------------------------------- CREATE ADD BUTTONS
    createNewCreateButton (type, i) {
        const button =  d3.select('svg').append('g')
        .attr('class', `${type}Button button`)

        button.append('rect')
            .attr('width', 90)
            .attr('height', 30)
            .attr('x', -5)
            .attr('y', -5)
            .attr('fill', 'grey')

        button.append('rect')
        .attr('class','button')
        .attr('width', 80)
        .attr('height', 20)
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', 'white')

        button.append('text').text(`+ ${type.toUpperCase()} NODE`)
            .attr('position', 'relative')
            .attr('x', `40`)
            .attr('y', `15`)
            .style('fill', 'black')
            .style('font-size', '10')
            .style('text-anchor', 'middle')
            .on('click', () => {
                d3.select(`.${type}Button`).select('.button')
                    .style('fill', 'red')
                // d3State.newNodeMode = 'action';
            })
                
        button
            .attr('transform', `translate(1000, ${10 + i * 30})`)
        
        button
            .on('click', () => {
                d3.select(`.${type}Button`).select('.button')
                    .style('fill', 'red')

                const dataObject = createNewNode(type, this.props.projectData, this.props.userStatus);
                setTimeout(() => d3.select('svg').on('click', () => this.placeNewNode(dataObject)), 0)
            })
    }
//--------------------------------------------------- RESET
    reset() {
        d3State = {
            selectedNode: {},
            selectedLink: {},
            menuOpen: false,
            newLinkMode: false,
            newNodeMode: '',
        }

        d3.select('.deleteLinkButton')
        .transition()
        .duration(500)
        .attr('transform', 'translate(500, 640)')

        d3.selectAll('.face')
            .attr('fill', (d) => getNodeColor(d))

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
// DEV BUTTONS
    createSeeProjectDataButton() {
        const seeProjectDataButton = d3.select('svg').append('g')
        .attr('class', 'seeProjectDataButton')

        seeProjectDataButton.append('rect')
            .attr('width', 50)
            .attr('height', 20)
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', 'white')
        
        seeProjectDataButton.append('text').text('Project Data')
            .attr('position', 'relative')
            .attr('x', `24`)
            .attr('y', `15`)
            .style('fill', 'black')
            .style('font-size', '10')
            .style('text-anchor', 'middle')
        
        seeProjectDataButton
            .attr('transform', 'translate(5, 40)')


        seeProjectDataButton
            .on('click', () => {
                d3.select('.seeProjectDataButton').select('rect')
                    .style('fill', 'red')
                    console.log(this.props.projectData);
                // this.props.saveProject(this.props.projectData)
            })
    }
//--------------------------------------------------- CLICK OPEN MENU
    clickOpenNodeMenu(d) {
        if (d3State.newLinkMode) {
            this.clickCreateNewLink(d);
            return;
        }
        if (d3State.menuOpen) {
            this.reset();
        } else {
            const clickedNode = d3.selectAll('.node').filter((data) => data.hash_id === d.hash_id)

            d3State.menuOpen = true;
            d3State.selectedNode = d;
        
            // UpperLeft
            clickedNode.select('.newNodeButton')
            .transition()
            .duration(200)
            .attr('width', 30)
            .attr('height', 30)
            .attr('transform', `translate(-31, -31)`)
            

            clickedNode.select('.newNodeLabel')
            .transition()
            .duration(200)
            .attr('x', `-30`)
            .attr('y', `-20`)
            .style('visibility', 'visible')
            .style('font-size', '10px')
            
            
            //UpperRight
            clickedNode.select('.displayButton')
            .transition()
            .duration(200)
            .attr('width', 30)
            .attr('height', 30)
            .attr('transform', `translate(1, -31)`)
            
            
            clickedNode.select('.displayButtonLabel')
            .transition()
            .duration(200)
            .attr('x', `1`)
            .attr('y', `-20`)
            .style('visibility', 'visible')
            .style('font-size', '10px')
            
            
            //LowerRight
            clickedNode.select('.linkButton')
            .transition()
            .duration(200)
            .attr('width', 30)
            .attr('height', 30)
            .attr('transform', `translate(1, 1)`)
            
            
            clickedNode.select('.linkButtonLabel')
            .transition()
            .duration(200)
            .attr('x', `5`)
            .attr('y', `20`)
            .style('visibility', 'visible')
            .style('font-size', '10px')
            
            
            //LowerLeft
            clickedNode.select('.deleteButton')
            .transition()
            .duration(200)
            .attr('width', 30)
            .attr('height', 30)
            .attr('transform', `translate(-31, 1)`)
            
            
            clickedNode.select('.deleteButtonLabel')
            .transition()
            .duration(200)
            .attr('x', `-30`)
            .attr('y', `20`)
            .style('visibility', 'visible')
            .style('font-size', '10px')

            //Node Circle
            clickedNode.select('.face')
                .attr('fill', '#d83d2f')
        }
    }

//--------------------------------------------------- LINK MENU BUTTON
  clickNewLinkMode(d) {
    d3State.newLinkMode = true;
    d3.selectAll('.node').filter((data) => data.hash_id === d.hash_id).select('.linkButton')
      .style('fill', 'red');
  }

  clickCreateNewLink(d) {
    let hash_id = `${this.props.userStatus.google_id}-${this.props.projectData.project.id}-LINK-${Date.now()}`;
    let label_id;
    
    if (JSON.stringify(d3State.selectedNode) === JSON.stringify(d)) {
        console.log('you cannot link a node to itself')
        d3.selectAll('.node').filter((data) => data.hash_id === d3State.selectedNode.hash_id).select('.linkButton')
        .style('fill', '#DDD');
        this.reset();
        return;
    }

    label_id = getLinkLabelID(d3State.selectedNode, d);

    if(label_id === null) {
        console.log('cannot be connected');
        this.reset();
        return;
    }

    const newLinkObject = {
        hash_id: hash_id,
        project_id: this.props.projectData.project.id,
        id: hash_id,
        link_status: null,
        link_data: null,
        status: 'new',
        source_id: d3State.selectedNode.hash_id,
        source: d3State.selectedNode.hash_id,
        target_id: d.hash_id,
        target: d.hash_id,
        label_id: label_id,
    }
    console.log('im a new link: ', newLinkObject);
    this.props.projectData.links.push(newLinkObject);

  this.simulation.stop();
  this.reset(); 
  this.d3Restart();
  }
//--------------------------------------------------- DISPLAY MENU BUTTON
  clickDisplayMenuMode(d) {
    //   const leftLinks = this.props.projectData.links.filter((link) => link.label_id === 7 && link.target_id === d.hash_id);
        // if (!d.milestone) return console.log('not a milestone');
        const leftSideNodes = [];
        const rightSideNodes = [];

    // leftLinks.forEach((link) => {
    //   this.props.projectData.nodes.forEach((node) => {
    //     if (link.source_id === node.hash_id) leftSideNodes.push(node);
    //   })
    // })

    // const nextMilestone = this.props.projectData.nodes.filter((node) =>
    //   node.hash_id === this.props.projectData.links.filter((link) =>
    //     link.label_id === 8 && link.source_id === d.hash_id)[0].target_id)[0];

    // const nextLinks = this.props.projectData.links.filter((link) => link.label_id === 7 && link.target_id === nextMilestone.hash_id);

    // nextLinks.forEach((link) => {
    //   this.props.projectData.nodes.forEach((node) => {
    //     if (link.source_id === node.hash_id) rightSideNodes.push(node);
    //   })
    // })

    // console.log('leftSideNodes: ', leftSideNodes);
    // console.log('rightSideNodes: ', rightSideNodes);
      //  leftSideNodes={ leftSideNodes } rightSideNodes={ rightSideNodes }
      const content = <MilestoneContainer leftSideNodes={ leftSideNodes } rightSideNodes={ rightSideNodes } />;

      this.props.modalOpen({
        id: 99,
        onClose: () => console.log("closed"),
        // onConfirm: () => console.log("fire at confirming event on custom"),
        content
      })
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
  }

//--------------------------------------------------- DELETE MENU BUTTON
//--------------------------------------------------- RENDER
  render() {

    const onClose = (obj) => {
      this.props.modalClose(obj);
    }

    return (
      <div id="chart">
        <svg id="willowCore" width={1100} height={640} />
        <Modals onClose={ onClose } />
      </div>
    );
  }
    }
const mapStateToProps = (state) => {
    return { 
        projectData: state.projectData,
        userStatus: state.userStatus
    };
    };

const mapDispatchToProps = (dispatch) => {
    return { 
        saveProject: (projectData) => dispatch(projectSave(projectData)),
        projectGetData: (projectID) => dispatch(projectGetData(projectID)),
        modalClose: (obj) => dispatch(modalClose(obj)),
        modalOpen: (obj) => dispatch(modalOpen(obj)),
    }
    };



export default connect(mapStateToProps, mapDispatchToProps)(WillowCore);