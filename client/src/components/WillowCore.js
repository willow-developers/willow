import React, { Component } from 'react';
import * as d3 from 'd3';

class WillowCore extends Component {
  constructor(props) {
      super(props);
      
      this.d3State = {
          spaceDown: false,
      }

      this.d3Simulation = this.d3Simulation.bind(this);
      this.zoom_actions = this.zoom_actions.bind(this);
      this.ticked = this.ticked.bind(this);
      this.drag = this.drag.bind(this);
      this.clickCreate = this.clickCreate.bind(this);
      this.clickNode = this.clickNode.bind(this);
      this.keyPress = this.keyPress.bind(this);
      this.keyUp = this.keyUp.bind(this);
  }

//--------------------------------------------------- LIFECYCLE METHODS
  componentDidMount() {
    this.d3Simulation(this.props);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) ? 
            true: 
            false;
  }

  componentDidUpdate() {
    this.d3Simulation(this.props);
  }

//--------------------------------------------------- D3 FORCE SIMULATION SETUP

  d3Simulation(props) {
    const data = props.data || {nodes:[], links:[]};

    const nodes = data.nodes;
    const links = data.links;

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id));
    
    const svg = d3.select('#testingGround');

    const body = d3.select('body');

    const g = svg.append("g")
        .attr("class", "everything");

    const link = g.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .enter().append("line")
            .attr("stroke-width", 5);

    const node = g.append("g")
            .attr("Stroke", "#fff")
            .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
            .attr("r", 10)
            .attr("fill", "#000");
    
    node.append("title")
        .text(d => d.id);

    // Event Listeners
    simulation
        .on("tick", () => this.ticked(node, link));

    body
        .on("shiftkey", ()=> {console.log(d3.event.shiftkey)})
        .on("keypress", () => this.keyPress())
        .on("keyup", () => this.keyUp());

    node
        .on('click', (d) => this.clickNode(d))
        .call(this.drag(simulation));

    svg
        .on('click', () => this.clickCreate(nodes));

    const zoom_handler = d3.zoom().on("zoom", () => this.zoom_actions(g));
    zoom_handler(svg);
  }

//--------------------------------------------------- SIMULATION TIMESTEP
    ticked(node, link) {
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

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
  clickNode(d) {
    if (this.d3State.spaceDown !== true) {
        this.props.clickFunction(d);
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
      //   d.fx = null;
      //   d.fy = null;
      }
      
      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }

//-------------------------------------- KEYPRESS
    keyPress() {
        if (d3.event.keyCode === 32 && this.d3State.spaceDown !== true) {
            this.d3State.spaceDown = true;
            console.log(this.d3State);
        }
    }

    keyUp() {
        if (d3.event.keyCode === 32) {
            this.d3State.spaceDown = false;
            console.log(this.d3State);
        }
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