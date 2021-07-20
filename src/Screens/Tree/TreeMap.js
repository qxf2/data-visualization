import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import "./TreeMap.css";

function TreeMap({ width, height, data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");
  }, []);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);

    // Give the data to this cluster layout:
    var root = d3
      .hierarchy(data)
      .sum(function (d) {
        return d.weight;
      })
      .sort(function (a, b) {
        console.log(a, b);
        return b.value - a.value;
      });

    // initialize treemap
    d3
      .treemap()
      .size([width, height])
      .paddingTop(28)
      .paddingRight(8)
      .paddingLeft(8)
      .paddingBottom(8)
      .paddingInner(5)(root);

    const color = d3
      .scaleOrdinal()
      .domain(["Spam filter", "Trash Folder", "Social feature"])
      .range(["#402D54", "#D18975", "#8FD175"]);

    const opacity = d3.scaleLinear().domain([10, 30]).range([0.5, 1]);

    // Select the nodes
    var nodes = svg.selectAll("rect").data(root.leaves());

    // draw rectangles
    nodes
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0;
      })
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("stroke", "black")
      .style("fill", function (d) {
        console.log(d);
        return color(d.parent.data.name);
      })
      .style("opacity", function (d) {
        console.log(d);
        return opacity(d.data.weight);
      });

    nodes.exit().remove();

    // select node titles
    var nodeText = svg.selectAll("text").data(root.leaves());

    // add the text
    nodeText
      .enter()
      .append("text")
      .attr("x", function (d) {
        return d.x0 + 5;
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return d.y0 + 20;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return d.data.name.replace("mister_", "");
      })
      .attr("font-size", "19px")
      .attr("fill", "white");

    // select node titles
    var nodeVals = svg.selectAll("vals").data(root.leaves());

    // add the weights
    nodeVals
      .enter()
      .append("text")
      .attr("x", function (d) {
        return d.x0 + 5;
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return d.y0 + 35;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return d.data.weight;
      })
      .attr("font-size", "11px")
      .attr("fill", "white");

    // add the parent node titles
    svg
      .selectAll("titles")
      .data(
        root.descendants().filter(function (d) {
          return d.depth == 1;
        })
      )
      .enter()
      .append("text")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0 + 21;
      })
      .text(function (d) {
        return d.data.name;
      })
      .attr("font-size", "19px")
      .attr("fill", function (d) {
        return color(d.data.name);
      });

    // Add the chart heading
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 14) // +20 to adjust position (lower)
      .text("Features data")
      .attr("font-size", "20px")
      .attr("fill", "black");
  };

  function itemClicked(e) {
    console.log(e);
    alert(JSON.stringify(e.target.__data__.data));
  }

  return (
    <div className="chart">
      <svg ref={ref} onClick={itemClicked}></svg>
    </div>
  );
}

export default TreeMap;
