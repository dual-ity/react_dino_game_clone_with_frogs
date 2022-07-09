import React from "react";
import "../styles/RetryButton.css";

type props = { onClick: () => void };

class RetryButton extends React.Component<props> {
  render() {
    const { onClick } = this.props;

    return (
      <img
        src={require("../imgs/retry-button.png")}
        alt="retry-button"
        onClick={onClick}
        className="RetryButton"
      />
    );
  }
}

export default RetryButton;
