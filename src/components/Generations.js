import React, { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";

const Generations = (props) => {

  const svgRef = useRef(null);

  const chart = () => {
    const root = d3.hierarchy(props.data);

    let margin = {
      top: 10,
      right: 120,
      bottom: 10,
      left: 90
    }

    const width = 900;

    const dx = 25, dy = width / 6;

    const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

      const tree = d3.tree().nodeSize([dx, dy]);

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [-margin.left, -margin.top, width, dx])
      //.attr("preserveAspectRatio", "xMidYMid meet")
      //.style("font", "10px sans-serif")
      .style("user-select", "none");

    const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#23d6e8de")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", ".3em");

    const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    function update(source) {
      const duration = d3.event && d3.event.altKey ? 2500 : 250;
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      tree(root);

      let left = root;
      let right = root;
      root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + margin.top + margin.bottom;

      const transition = svg.transition()
        .duration(duration)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        //.attr("preserveAspectRatio", "xMidYMid meet")
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

      // Update the nodes…
      const node = gNode.selectAll("g")
        .data(nodes, d => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", d => {
          d.children = d.children ? null : d._children;
          update(d);
        });

      nodeEnter.append("circle")
        .attr("r", 4.5)
        .attr("fill", d => d._children ? "#555" : "#999")
        .attr("stroke", d => d._children ? "#23d6e8de" : "#555")
        .attr("stroke-width", ".4em");

      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -12 : 12)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
        .attr("fill", d => d.data.gender === 'M' ? "#444" : "#e50ee8de")
        .attr("stroke-width", ".3em")
        .attr("font-size", ".7em")
        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke", "white");
        

      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, d => d.target.id);


      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });

      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    update(root);

    return svg.node();
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (props.data && svgRef.current) {
      chart();
    }
    
  }, [props.data, svgRef.current]);


  return (
          <svg ref={svgRef}></svg>
  );

}

export default Generations;