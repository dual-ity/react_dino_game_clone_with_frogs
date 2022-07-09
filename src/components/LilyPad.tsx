import React from "react";
import "../styles/LilyPad.css";
import { zIndex } from "../utils/constants";

type props = { left: string };

class LilyPad extends React.Component<props> {
  render() {
    const { left } = this.props;

    return (
      <div
        className="LilyPad"
        style={{
          left: left,
          zIndex: zIndex.LilyPad,
        }}
      >
        <img alt="lilyPad" src={require("../imgs/lilyPad.png")} />
      </div>
    );
  }
}

export default LilyPad;
