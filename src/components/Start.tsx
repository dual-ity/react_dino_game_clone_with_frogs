import React from "react";
import "../styles/Start.css";
import RetryButton from "./RetryButton";

type props = { text: string; didLose: boolean; onRetryButtonClick: () => void };

class Start extends React.Component<props> {
  render() {
    const { text, didLose, onRetryButtonClick } = this.props;

    return (
      <div className="Start">
        {text}{" "}
        {didLose ? <RetryButton onClick={onRetryButtonClick} /> : undefined}
      </div>
    );
  }
}

export default Start;
