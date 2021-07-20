import React from "react";
import { Card, CardBody } from "react-simple-card";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./TileMap.css";

class TileMap extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      data: props.name,
    };
  }

  render() {
    var chart = new Highcharts.chart("container", {
      colorAxis: {
        minColor: "#FFFFFF",
        maxColor: Highcharts.getOptions().colors[0],
      },
      series: [
        {
          type: "treemap",
          layoutAlgorithm: "squarified",
          data: [
            {
              name: "A",
              value: 6,
              colorValue: 1,
            },
            {
              name: "B",
              value: 6,
              colorValue: 2,
            },
            {
              name: "C",
              value: 4,
              colorValue: 3,
            },
            {
              name: "D",
              value: 3,
              colorValue: 4,
            },
            {
              name: "E",
              value: 2,
              colorValue: 5,
            },
            {
              name: "F",
              value: 2,
              colorValue: 6,
            },
            {
              name: "G",
              value: 1,
              colorValue: 7,
            },
          ],
        },
      ],
      title: {
        text: "Highcharts Treemap",
      },
    });

    return <div className="container">{chart}</div>;
  }
}

export default TileMap;
