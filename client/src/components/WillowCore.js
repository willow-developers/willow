import React, { Component } from 'react';
import * as d3 from 'd3';

d3.selection.prototype.moveToFront = function() {  
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
    };

class WillowCore extends Component {
  constructor(props) {
      super(props);
      
      this.d3State = {
          spaceDown: false,
          menuOpen: false,
          selectedNode: {},
      }
      this.d3Simulation = this.d3Simulation.bind(this);
      this.zoom_actions = this.zoom_actions.bind(this);
      this.reset = this.reset.bind(this);

      this.ticked = this.ticked.bind(this);
      this.drag = this.drag.bind(this);

      this.clickCreate = this.clickCreate.bind(this);
      this.clickOpenNodeMenu = this.clickOpenNodeMenu.bind(this);
      this.clickRenderDoc = this.clickRenderDoc.bind(this);
      this.clickUnlockNode = this.clickUnlockNode.bind(this);

      this.keyPress = this.keyPress.bind(this);
      this.keyUp = this.keyUp.bind(this);
      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
  }
//--------------------------------------------------- LIFECYCLE METHODS
  componentDidMount() {
    this.d3Simulation(this.props);
  }

  componentDidUpdate() {
    this.d3UpdateSimulation(this.props);
  }
//--------------------------------------------------- D3 FORCE SIMULATION SETUP

  d3UpdateSimulation(props) {
    const nodes = props.data.nodes;
    const links = props.data.links;

    this.simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(1000 / 2, 500 / 2));
        
    const node = d3.select('.node').selectAll('g')
        .data(nodes, (d) => d.id)
        .enter().append('g')
        .attr('class', 'circleGroup')
            .call(this.drag(this.simulation))

    //-------------------------------------------- POP OUT MENU
    node
        .append('rect')
            .attr('class', 'unlockButton menu')
            .attr('width', 0)
            .attr('height', 0)
            .style('fill', '#DDD')
            .on('click', d => this.clickUnlockNode(d))

    node.append('text')
        .append('tspan')
        .attr('class', 'unlockButtonLabel menuLabel')
        .text('unlock')
            .attr('x', `0`)
            .attr('y', `0`)
            .style('font-size', '0')
            .style('visibility', 'hidden')
            .on('click', d => this.clickUnlockNode(d))
    //======================================
    
    node       
        .append('rect')
            .attr('class', 'displayButton menu')
            .attr('width', 0)
            .attr('height', 0)
            .style('fill', '#DDD')
            .on('click', (d) => this.clickRenderDoc(d))

    node.append('text')
        .append('tspan')
        .attr('class', 'displayButtonLabel menuLabel')
        .text('display')
            .attr('x', `0`)
            .attr('y', `0`)
            .style('font-size', '0')
            .style('visibility', 'hidden')
            .on('click', (d) => this.clickRenderDoc(d))
     //======================================
    //MVP++ Feature
    node       
        .append('rect')
            .attr('class', 'markButton menu')
            .attr('width', 0)
            .attr('height', 0)
            .style('fill', '#DDD')
    
    node.append('text')
        .append('tspan')
        .attr('class', 'markButtonLabel menuLabel')
        .text('mark')
            .attr('x', `0`)
            .attr('y', `0`)
            .style('font-size', '0')
            .style('visibility', 'hidden')
     //======================================
    node       
        .append('rect')
            .attr('class', 'deleteButton menu')
            .attr('width', 0)
            .attr('height', 0)
            .style('fill', '#DDD')
    
    node.append('text')
        .append('tspan')
        .attr('class', 'deleteButtonLabel menuLabel')
        .text('delete')
            .attr('x', `0`)
            .attr('y', `0`)
            .style('font-size', '0')
            .style('visibility', 'hidden')
    //=============================================

    node
        .append('circle')
            .attr("r", 10)
            .attr("fill", "#1c2354")
            .on('click', (d) => this.clickOpenNodeMenu(d))
            .on('mouseover', (d) => this.handleMouseOver(d))
            .on('mouseout', (d) => this.handleMouseOut(d))
            
    const link = d3.select('.link').selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", 5);
    
    this.simulation
        .on("tick", () => this.ticked(node, link));

    this.simulation.force("link").links(links);
    this.simulation.alpha(1).restart();
  }

  d3Simulation(props) {
    const data = props.data || {nodes:[], links:[]};
    const nodes = data.nodes;
    const links = data.links;
    this.simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id));
    
    const svg = d3.select('#testingGround');

    //Background Color
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "grey");

    const body = d3.select('body');
    const g = svg.append("g")
        .attr("class", "everything");
    const link = g.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("class", "link")
        .selectAll("line")
        .data(links)
        .enter().append("line")
            .attr("stroke-width", 5);
    const node = g.append("g")
            .attr("Stroke", "#fff")
            .attr("stroke-width", 1.5)
            .attr("class", "node")
        .data(nodes)
        .enter().append('g').append("circle")
            .attr("r", 10)
            .attr("fill", "#1c2354");
    
    node.append("title")
        .text(d => d.id);

    // Drag Link
    // var drag_line = svg.append('svg:path')
    //     .attr('class', 'link dragline hidden')
    //     .attr('d', 'M0,0L0,0');

    // console.log(drag_line);

    // Event Listeners
    this.simulation
        .on("tick", () => this.ticked(node, link));
    body
        .on("keypress", () => this.keyPress())
        .on("keyup", () => this.keyUp());
    node
        .on('click', (d) => this.clickNode(d))
        .call(this.drag(this.simulation));
    svg
        .on('click', () => this.clickCreate(nodes));
    const zoom_handler = d3.zoom().on("zoom", () => this.zoom_actions(g));
    zoom_handler(svg);
  }
//--------------------------------------------------- SIMULATION TIMESTEP
    ticked(node, link) {
        node.attr('transform', d => `translate(${d.x}, ${d.y})`);

        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

  }
//--------------------------------------------------- USER INTERACTIONS
//-------------------------------------- ZOOM  
  zoom_actions(g) {
    g.attr("transform", d3.event.transform);
  }
//-------------------------------------- CLICK 
  clickCreate() {
      if (this.d3State.spaceDown === true) {
        this.props.createNode();
      }
  }

  clickUnlockNode(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }

  clickRenderDoc(d) {
    this.props.clickFunction(d);
  }

  clickOpenNodeMenu(d) {
    const clickedNode = d3.selectAll('.circleGroup').filter((data) => data.id === d.id)
    this.d3State.selectedNode = clickedNode;

    if (this.d3State.menuOpen === true) {
        this.reset();
        this.d3State.menuOpen = false;
    } else {    
        //UpperLeft
        clickedNode.select('.unlockButton')
        .transition()
        .duration(500)
        .attr('width', 30)
        .attr('height', 30)
        .attr('transform', `translate(-31, -31)`)
        
        clickedNode.select('.unlockButtonLabel')
        .transition()
        .duration(500)
        .attr('x', `-30`)
        .attr('y', `-20`)
        .style('visibility', 'visible')
        .style('font-size', '10px')
        
        //UpperRight
        clickedNode.select('.displayButton')
        .transition()
        .duration(500)
        .attr('width', 30)
        .attr('height', 30)
        .attr('transform', `translate(1, -31)`)
        
        clickedNode.select('.displayButtonLabel')
        .transition()
        .duration(500)
        .attr('x', `1`)
        .attr('y', `-20`)
        .style('visibility', 'visible')
        .style('font-size', '10px')
        
        //LowerRight
        clickedNode.select('.markButton')
        .transition()
        .duration(500)
        .attr('width', 30)
        .attr('height', 30)
        .attr('transform', `translate(1, 1)`)
        
        clickedNode.select('.markButtonLabel')
        .transition()
        .duration(500)
        .attr('x', `5`)
        .attr('y', `20`)
        .style('visibility', 'visible')
        .style('font-size', '10px')
        
        //LowerLeft
        clickedNode.select('.deleteButton')
        .transition()
        .duration(500)
        .attr('width', 30)
        .attr('height', 30)
        .attr('transform', `translate(-31, 1)`)
        
        clickedNode.select('.deleteButtonLabel')
        .transition()
        .duration(500)
        .attr('x', `-30`)
        .attr('y', `20`)
        .style('visibility', 'visible')
        .style('font-size', '10px')
        
        clickedNode.select('circle')
            .attr('fill', '#d83d2f')
        this.d3State.menuOpen = true
    }
}
//-------------------------------------- HOVER
    handleMouseOver(d) {
        const hoverNode = d3.selectAll('.circleGroup').filter((data) => data.id === d.id)
        hoverNode.select('circle')
            .attr('fill', '#d83d2f');
    }
    handleMouseOut(d) {
        const hoverNode = d3.selectAll('.circleGroup').filter((data) => data.id === d.id)

        if(JSON.stringify(hoverNode) !== JSON.stringify(this.d3State.selectedNode)){
            hoverNode.select('circle')
                .attr('fill', '#1c2354');
        }
    }
//-------------------------------------- DRAG
  drag(simulation) {
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
      }
      
      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }
//-------------------------------------- KEYPRESS
    keyPress() {
        console.log(d3.event.shiftkey);
        if (d3.event.keyCode === 80) {
            this.d3State.menuOpen = false;
            this.d3State.selectedNode = {};
            this.reset();
        }
        if (d3.event.keyCode === 32 && this.d3State.spaceDown !== true) {
            this.d3State.spaceDown = true;
        }
    }
    keyUp() {
        if (d3.event.keyCode === 32) {
            this.d3State.spaceDown = false;
            console.log(this.d3State);
        }
    }

    reset() {
        d3.selectAll('circle')
        .attr('fill', '#1c2354')

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

    render() {
        return (
            <div>
                <svg id="testingGround" width={1000} height={500}/>
            </div>
        );
    }
}
export default WillowCore;