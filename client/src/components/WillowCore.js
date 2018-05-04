import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';


class WillowCore extends Component {
  constructor(props) {
    super(props);
 
  }

  componentDidMount() {
    const props = this.props;
    d3.json('/api/data').then((data) => {
      const nodes = data.nodes;
      const links = data.links;

      const simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(250, 250))
          .on("tick", ticked);
      
      const svg = d3.select('#testingGround')

      const link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .enter().append("line")
          .attr("stroke-width", 5);

      const node = svg.append("g")
          .attr("Stroke", "#fff")
          .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
          .attr("r", 10)
          .attr("fill", "#000")
          .call(drag(simulation));
      

      
      node.append("title")
        .text(d => d.id);
      

      // Event Listeners  
      node.on('click', function(d, i) {
          props.clickFunction(d)
          
      })
      
      //Time
      function ticked() {
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);

        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      }

      function drag() {
  
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
          d.fx = null;
          d.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
      }


    }).catch(error => {console.log(error)})
  }

  render() {
    return (
        <div>
            <svg id="testingGround" width={500} height={500}/>
        </div>
    );
  }
}

export default WillowCore;