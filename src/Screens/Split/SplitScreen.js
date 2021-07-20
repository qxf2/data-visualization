import React from "react";
import { Card, CardHeader, CardBody } from "react-simple-card";
import Split from "react-split";
import "./SplitScreen.css";
import Features from "../../Data/features.json";

class SplitScreen extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { data: [0, 8, 6] };
  }

  render() {
    function getArea() {
      let area = [];
      var sum = 0;
      Features.forEach((i) => {
        sum += i.area;
      });

      Features.forEach((element) => {
        area.push((element.area / sum) * 100);
      });
      return area;
    }

    function cardClicked(e) {
      alert(
        Features[e].feature +
          " is clicked\nMetrics Data are : " +
          JSON.stringify(Features[e].metrics)
      );
    }

    return (
      <div className="App">
        <div className="container">
          <Split
            className="split"
            sizes={getArea()}
            gutterSize={3}
            snapOffset={30}
            direction="horizontal"
          >
            {Features.map((feature, index) => (
              <div
                className="divContainer"
                key={index}
                onClick={(e) => {
                  cardClicked(index);
                }}
              >
                <Card>
                  <CardHeader className="card-header">
                    {feature.feature}
                  </CardHeader>
                  <CardBody className="card-body">
                    {feature.risk_score} of the data {index + 1}
                  </CardBody>
                </Card>
              </div>
            ))}
          </Split>
        </div>
      </div>
    );
  }
}

export default SplitScreen;
