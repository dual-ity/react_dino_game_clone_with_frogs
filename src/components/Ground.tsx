import React from "react";
import "../styles/Ground.css";
import { zIndex } from "../utils/constants";

type props = { left: string };

class Ground extends React.Component<props> {
  render() {
    const { left } = this.props;

    return (
      <div className="Ground" style={{ left: left, zIndex: zIndex.Ground }}>
        <img alt="ground" src={require("../imgs/ground.png")} />
      </div>
    );
  }
}

export default Ground;
