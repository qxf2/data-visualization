import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import "./NTreeMap.css";
import Tree from "react-d3-tree";

function NTreeMap({ width, height, data }) {
  const svgRef = useRef(null);

  function renderTreemap() {
    const svg = d3.select(svgRef.current);

    svg.attr("width", width).attr("height", height);

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    const treemapRoot = d3
      .treemap()
      .size([width, height])
      .paddingInner(3)
      .padding(8)(root);

    const nodes = svg
      .selectAll("g")
      .data(treemapRoot.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    const fader = (color) => d3.interpolateRgb(color, "#fff")(0.3);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => {
        let color = "#FFA07A";
        if (d.data.color != null) {
          color = d.data.color;
        }
        return color;
      });

    const fontSize = 18;

    nodes
      .append("text")
      .text((d) => `${d.data.name} ${d.data.value}`)
      .attr("font-size", `${fontSize}px`)
      .attr("x", 3)
      .attr("y", fontSize);
  }

  useEffect(() => {
    renderTreemap();
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default NTreeMap;
