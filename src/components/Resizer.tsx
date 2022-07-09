import React, { ReactNode } from "react";
import { DEFAULT_GAME_DIMENSIONS } from "../utils/constants";

type props = {
  children: ReactNode;
};

type state = {
  width: number;
  height: number;
};

class Resizer extends React.Component<props, state> {
  state: state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  getDimensions = () => {
    const { width, height } = this.state;
    const multiplier =
      width / height <=
      DEFAULT_GAME_DIMENSIONS.width / DEFAULT_GAME_DIMENSIONS.height
        ? DEFAULT_GAME_DIMENSIONS.width / width
        : DEFAULT_GAME_DIMENSIONS.height / height;

    return {
      width: width
        ? `${multiplier * width}vw`
        : `${DEFAULT_GAME_DIMENSIONS.width}vw`,
      height: height
        ? `${multiplier * height}vh`
        : `${DEFAULT_GAME_DIMENSIONS.height}vh`,
    };
  };

  render() {
    const { children } = this.props;

    return <div style={this.getDimensions()}>{children}</div>;
  }
}

export default Resizer;
