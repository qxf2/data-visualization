import "./App.css";
import { Card, CardBody, CardHeader } from "react-simple-card";
import Features from "./Data/features.json";
import TileMap from "./Screens/Tiles/TileMap";
import SplitScreen from "./Screens/Split/SplitScreen";
import TreeMap from "./Screens/Tree/TreeMap";
import NTreeMap from "./Screens/NTree/NTreeMap";
import TreeData from "./Data/TreeData.json";
import Data from "../src/Data/data";
import data from "../src/Data/data";
import Tree from "react-d3-tree";

const dataset = TreeData;
function App() {
  return (
    <div className="AppContainer">
      <TreeMap width={1000} height={600} data={data} />
    </div>
  );
}

export default App;
