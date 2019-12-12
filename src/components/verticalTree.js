import React, { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";

const VerticalTree = (props) => {
    
    const svgRef = useRef(null);


    let chart = () => {

    const margin = { top: 20, right: 90, bottom: 30, left: 90 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    let i = 0,
        duration = 750,
        root;

    let counter = 0;
    let treeData = {};

    const svg = d3.select(svgRef.current)
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)

    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const tree = d3.tree()
        .size([width, height]);


    function buildHeap(inData) {

       // const newsource = { name: inData[0], children: getChildren(0, inData) }
        const newsource = inData;
        //   console.log('dl', newsource)

        root = d3.hierarchy(newsource, function (d) { return d.children; });

        root.x0 = 0;
        root.y0 = width / 2;

        update(root)
    }


    // just leaving this global so i can mess with it in the console
    let nodes;

    function update(source) {
        //  root = d3.hierarchy(newsource, function(d) { return d.children; });

        let treeData = tree(root)
        nodes = treeData.descendants();
        var links = treeData.descendants().slice(1);

        // ****************** Nodes section ***************************
        // Update the nodes...
        var node = g.selectAll('g.node')
            .data(nodes, function (d) { return d.id || (d.id = ++i); });

        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr('cursor', 'pointer')
            .attr("transform", function (d) {
                return "translate(" + source.x0 + "," + source.y0 + ")";
            })
            .on('click', click);

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('fill', '#fff')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', '.5em')
            .attr('r', 1e-6)
            .style("fill", function (d) {
                return d.children ? "lightsteelblue" : "#fff";
            });

        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function (d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) { return d.data.name; });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = g.selectAll('path.link')
            .data(links, function (d) { return d.id; });

        /*
        function connect(d, i) {
          return     "M" + d.source.x + "," + (height - d.source.y)
                   + "V" + (height - (3*d.source.y + 4*d.target.y)/7)
                   + "H" + d.target.x
                   + "V" + (height - d.target.y);
      };*/

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('fill', 'none')
            .attr('stroke', '#555')
            .attr('stroke-width', '.5em')
            .attr('stroke-opacity', 0.4)
            .attr('d', function (d) {
                var o = { y: source.y0, x: source.x0 }
                return diagonal(o, o)

            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function (d) { return diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function (d) {
                var o = { x: source.x, y: source.y }
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function (d, i) {
            //   console.log(d)
            d.x0 = d.x;
            d.y0 = d.y;
        });


    }

    // Takes an index and an array and finds all the children.
    // returns an array which can be added to children of the root node to
    // make a json thing which can be used to make a d3.hierarchy();
   /* function getChildren(i, arr) {
        var childs = [];

        if (arr[i + 1 + i]) {
            childs[0] = { name: arr[i * 2 + 1], children: [] }
            if (arr[i + i + 2]) {
                //  console.log(arr[i+1+ i], arr[i+i+2])
                childs[1] = { name: arr[i * 2 + 2], children: [] };
            }
        }

        var nextin = i * 2 + 1;
        if (arr[nextin * 2 + 1]) {
            //  console.log('more children')
            childs[0].children = getChildren(nextin, arr)
            childs[0]._children = null;

            if (arr[nextin * 2 + 2]) {
                childs[1].children = getChildren(nextin + 1, arr);
                childs[1]._children = null;
            }
        }
        return childs;
     }*/


    // not called but kind of what I might use to annimate the swap thing while
    // balancing binary heaps
    function expandChildren(index, chi) {
        setTimeout(function () {
            //buildHeap([ 4, 3, 2, 9, 14, 29] );

            if (nodes[index].children === null) {
                nodes[0].children = [nodes[0]._children[chi]]
            }
            else {
                console.log(typeof nodes[0].children)
                nodes[index].children.push(nodes[index]._children[1])
            }
            // .h(nodes[0]._children[0]);
            //nodes[0]._children ;

            // console.log(nodes[index])
            update(nodes[index])
            if (chi < 1) {
                expandChildren(0, 1)
            }
        }, 3000);

    }

    //expandChildren(0, 0);


    // Creates a curved (diagonal) path from parent to the child nodes
    // switched around all the x's and y's from orig so it's verticle
    function diagonal(s, d) {
        //console.log('in diag and s = ', s);
        //console.log('d = ', d)

       let path = `M ${s.x} ${s.y}
          C ${(s.x + d.x) / 2} ${s.y},
            ${(s.x + d.x) / 2} ${d.y},
            ${d.x} ${d.y}`

        return path;

    }


    // Toggle children on click.
    function click(d) {
        // use the following to superficially change the text of the node.
        //  this.getElementsByTagName('text')[0].textContent = "clicked all over"

        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        update(d);
    }

    // will make all the children null and store the real vals in _children
    function collapse(d) {
        if (d.children) {
            d._children = d.children
            d.children = null;
            d._children.forEach(collapse)

        }
    }


    buildHeap(props.data)

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

export default VerticalTree;

