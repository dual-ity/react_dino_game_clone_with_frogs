import React from "react";
import "../styles/Frog.css";
import { zIndex } from "../utils/constants";

type props = { currentFrame: number; bottom: string };

class Frog extends React.Component<props> {
  render() {
    const { currentFrame, bottom } = this.props;

    return (
      <div className="Frog" style={{ bottom: bottom, zIndex: zIndex.Frog }}>
        <img alt="frog" src={require(`../imgs/frog-${currentFrame}.png`)} />
      </div>
    );
  }
}

export default Frog;
