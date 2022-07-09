import React from "react";
import "../styles/Score.css";
import {
  HIGH_SCORE_TEXT,
  SCORE_PLACEHOLDER,
  SCORE_TEXT,
} from "../utils/constants";

type props = { score: number; highScore: number };

class Score extends React.Component<props> {
  static defaultProps = {
    score: 0,
  };

  getScore = (score: number) => {
    return score < Number("9".repeat(SCORE_PLACEHOLDER.length))
      ? (SCORE_PLACEHOLDER + String(Math.round(score))).slice(
          -SCORE_PLACEHOLDER.length
        )
      : score;
  };

  render() {
    const { score, highScore } = this.props;

    return (
      <div className="ScoreWrapper">
        <div className="Score">
          <span>{SCORE_TEXT}&nbsp;</span>
          <span>{this.getScore(score)}</span>
        </div>
        <div className="Score">
          <span>{HIGH_SCORE_TEXT}&nbsp;</span>
          <span>{this.getScore(highScore)}</span>
        </div>
      </div>
    );
  }
}

export default Score;
