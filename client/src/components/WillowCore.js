import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class WillowCore extends Component {
    componentDidMount() {
        this.clickCreateNewNode = this.clickCreateNewNode.bind(this);
        this.d3Setup();
    }

    componentDidUpdate() {
        this.d3Restart();
    }
//--------------------------------------------------- CLICK CREATE NEW EXPLORATIVE NODE
    clickCreateNewNode() {
        if (d3State.spaceDown) {
            let x = (d3.event.offsetX - zoomTrans.x)/zoomTrans.scale;
            let y = (d3.event.offsetY - zoomTrans.y)/zoomTrans.scale;

            let dataObject = {
                owner_id: this.props.projectData.project.owner_id, 
                project_id: this.props.projectData.project.id, 
                label_id: 4, 
                node_description: 'testing out creating new Explorative Node functionality',
                status: 'new',
                hash_id: `${this.props.userStatus.google_id}-${this.props.projectData.project.id}-${Date.now()}`,
                x: x,
                y: y,
            }
            console.log('im a new node: ', dataObject);
            this.simulation.stop();
            this.props.projectData.nodes.push(dataObject);
            this.d3Restart();
        }
    }
//--------------------------------------------------- KEYPRESS/KEYUP
    keyPress() {
        if (d3.event.keyCode === 32 && d3State.spaceDown !== true) {
            d3State.spaceDown = true;
        }
    }
    keyUp() {
        if (d3.event.keyCode === 32) {
            d3State.spaceDown = false;
        }
    }
//--------------------------------------------------- D3 RESTART
    d3Restart() {
        d3.selectAll('line').remove();
        d3.selectAll('.node').remove();

        const nodesData = this.props.projectData.nodes;
        const linksData = this.props.projectData.links;

        this.simulation = d3.forceSimulation().nodes(nodesData)

        let link_force = d3.forceLink(linksData).id((d) => d.hash_id).strength(0);

        this.simulation 
            .force('links', link_force);

        this.simulation.on('tick', this.ticked);

        var link = d3.select('.links')
            .selectAll("line")
            .data(linksData)
            .enter().append("line")
                .attr("stroke-width", 2)
                .style("stroke", '#999');   
            
      
        var node = d3.select('.nodes').selectAll('g')
                .data(nodesData, (d) => d.hash_id)
                .enter()
                .append('g')
                .attr('class', 'node')

        this.createNodes();

        var drag_handler = d3.drag()
                .on("start", (d) => this.drag_start(d, this.simulation))
                .on("drag", (d) => this.drag_drag(d, this.simulation))
                .on("end", (d) => this.drag_end(d, this.simulation));	
       
        drag_handler( d3.select('.nodes').selectAll('.node'));
    }
//--------------------------------------------------- CREATE NODES
    createNodes() {
        let node = d3.selectAll('.node');
        //POP OUT MENU
        node
        .append('rect')
        .attr('class', 'unlockButton menu')
        .attr('width', 0)
        .attr('height', 0)
        .style('fill', '#DDD')
        
        node
        .append('text')
        .attr('class', 'unlockButtonLabel menuLabel')
        .text('unlock')
        .attr('x', `0`)
        .attr('y', `0`)
        .style('font-size', '0')
        .style('visibility', 'hidden')
        
        //==================================================
        node
        .append('rect')
        .attr('class', 'displayButton menu')
        .attr('width', 0)
        .attr('height', 0)
        .style('fill', '#DDD')
        
        node
        .append('text')
        .attr('class', 'displayButtonLabel menuLabel')
        .text('display')
        .attr('x', `0`)
        .attr('y', `0`)
            .style('font-size', '0')
            .style('visibility', 'hidden')
            
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
        node
        .append("circle")
        .attr("r", 10)
        .attr("fill", (d) => nodeColor(d))
            .on('click', (d) => this.clickOpenNodeMenu(d))
    }
//--------------------------------------------------- D3 SETUP        
    d3Setup() {
        const svg = d3.select('#willowCore');
        const body = d3.select('body');
        
        svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "grey");

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
        
        const linksGroup = zoomLayer.append('g')
            .attr('class', 'links')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6);
        
        const nodesGroup = zoomLayer.append('g')
            .attr('class', 'nodes');

        svg
            .on('click', this.clickCreateNewNode);
        body
            .on('keypress', this.keyPress)
            .on('keyup', this.keyUp)
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
            clickedNode.select('.unlockButton')
            .transition()
            .duration(200)
            .attr('width', 30)
            .attr('height', 30)
            .attr('transform', `translate(-31, -31)`)

            clickedNode.select('.unlockButtonLabel')
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
            clickedNode.select('circle')
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
        
        const newLinkObject = {
            hash_id: hash_id,
            project_id: this.props.projectData.project.id,
            id: hash_id,
            node_status: null,
            node_data: null,
            status: 'new',
            source_id: d3State.selectedNode.hash_id,
            source: d3State.selectedNode.hash_id,
            target_id: d.hash_id,
            target: d.hash_id,
            label_id: 4

        }
        console.log('im a new link: ', newLinkObject);

        d3.selectAll('.node').filter((data) => data.hash_id === d3State.selectedNode.hash_id).select('.linkButton')
        .style('fill', '#DDD');


        this.simulation.stop();

        let links = this.props.projectData.links;
        links.push(newLinkObject);

        this.reset(); 
        this.d3Restart();
    }
//--------------------------------------------------- DISPLAY MENU BUTTON
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
            d.status = 'updated';
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
//--------------------------------------------------- D3 ZOOM LAYER
    zoom_actions(zoomLayer) {
        zoomLayer.attr('transform', d3.event.transform);
    }
//--------------------------------------------------- RESET
    reset() {
        d3State.menuOpen = false;
        d3State.newLinkMode = false;
        d3State.selectedNode = {};

        d3.selectAll('circle')
        .attr('fill', (d) => nodeColor(d))

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
//--------------------------------------------------- RENDER
    render() {
        return (
            <div>
                <svg id="willowCore" width={960} height={500}/>
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
        dispatch
    }
};


const nodeColor = (d) => {
    return (d.label_id === 4) ?
        'rgb(255, 255, 255' :
        'rbg(0, 0, 0'
}

function linkLabelID(sourceNodeType, targetNodeType) {
    if (sourceNodeType === 'Explorative' && targetNodeType === 'Explorative') {
        return 5;
    } 
    if (sourceNodeType === 'Objective' && targetNodeType === 'Explorative') {
        return 5;
    }
    if (sourceNodeType === 'Explorative' && targetNodeType === 'Objective') {
        return 6;
    }  
    if (sourceNodeType === 'Objective' && targetNodeType === 'Objective') {
        return 8;
    } 
}

let zoomTrans = {x:0, y:0, scale:1};

const d3State = {
    selectedNode: {},
    menuOpen: false,
    newLinkMode: false,
    spaceDown: false,
}


export default connect(mapStateToProps, mapDispatchToProps)(WillowCore);