import React from "react";
import "../styles/Game.css";
import Frog from "../components/Frog";
import Ground from "../components/Ground";
import LilyPad from "../components/LilyPad";
import Start from "../components/Start";
import {
  FRAME_TIME,
  FROG_FRAME_COUNT,
  GRAVITY,
  INITIAL_SPEED,
  JUMP_SPEED,
  LILY_PAD_INTERVAL_MAX,
  LILY_PAD_INTERVAL_MIN,
  LOSS_TEXT,
  SCORE_INCREMENT,
  SPEED_INCREMENT,
  START_TEXT,
} from "../utils/constants";
import Score from "./Score";

type props = {};

type state = {
  isOn: boolean;
  delta: number;
  lastTime: number;
  groundLeft: number;
  speed: number;
  frogFrame: number;
  currentFrameTime: number;
  isJumping: boolean;
  frogBottom: number;
  yFrogPosition: number;
  nextLilyPadTime: number;
  lilyPads: number[];
  didLose: boolean;
  score: number;
  screenText: string;
};

class Game extends React.Component<props, state> {
  state: state = {
    isOn: false,
    delta: 0,
    score: 0,
    lastTime: 0,
    groundLeft: 0,
    speed: INITIAL_SPEED,
    frogFrame: 0,
    currentFrameTime: 0,
    isJumping: false,
    frogBottom: 0,
    yFrogPosition: 0,
    nextLilyPadTime: LILY_PAD_INTERVAL_MIN,
    lilyPads: [100],
    didLose: false,
    screenText: START_TEXT,
  };

  update = (time: number) => {
    const { isOn, didLose } = this.state;

    if (isOn) {
      const { lastTime, isJumping } = this.state;

      if (lastTime === 0) {
        this.setState({ lastTime: time });
        requestAnimationFrame(this.update);
        return;
      }

      this.handleLoss();

      if (isJumping) {
        this.setState(
          ({ frogBottom, yFrogPosition, delta }) => ({
            frogBottom: frogBottom + yFrogPosition * delta,
            yFrogPosition: yFrogPosition - delta * GRAVITY,
          }),
          () => {
            this.resetJump();
          }
        );
      }

      this.setState(
        ({ groundLeft, delta, speed, lilyPads, nextLilyPadTime, score }) => ({
          delta: time - lastTime,
          lastTime: time,
          groundLeft:
            groundLeft > 200 ? groundLeft - 200 : groundLeft + delta * speed,
          lilyPads:
            nextLilyPadTime <= 0
              ? [
                  ...lilyPads
                    .filter((lilyPad) => lilyPad > -100)
                    .map((lilyPad) => lilyPad - delta * speed),
                  100,
                ]
              : lilyPads
                  .filter((lilyPad) => lilyPad > -100)
                  .map((lilyPad) => lilyPad - delta * speed),
          nextLilyPadTime:
            nextLilyPadTime <= 0
              ? nextLilyPadTime +
                Math.floor(
                  Math.random() *
                    (LILY_PAD_INTERVAL_MAX - LILY_PAD_INTERVAL_MIN + 1) +
                    LILY_PAD_INTERVAL_MIN
                )
              : nextLilyPadTime - delta * speed,
          speed: speed + delta * SPEED_INCREMENT,
          score: score + SCORE_INCREMENT + speed * 10,
        })
      );

      this.animateFrog();
    }
    if (!didLose) {
      requestAnimationFrame(this.update);
    }
  };

  animateFrog = () => {
    const { currentFrameTime } = this.state;

    if (currentFrameTime >= FRAME_TIME) {
      this.setState(({ frogFrame }) => ({
        frogFrame: (frogFrame + 1) % FROG_FRAME_COUNT,
      }));
    }

    this.setState(({ currentFrameTime, delta, speed }) => ({
      currentFrameTime:
        currentFrameTime >= FRAME_TIME
          ? currentFrameTime - FRAME_TIME
          : currentFrameTime + delta * speed,
    }));
  };

  handleLoss = () => {
    const { didLose, score } = this.state;
    const lilyPadRectangles = Array.from(
      document.getElementsByClassName("LilyPad")
    ).map((lilyPad) => lilyPad.getBoundingClientRect());
    const frog = document
      .getElementsByClassName("Frog")[0]
      ?.getBoundingClientRect();

    this.setState({
      didLose: lilyPadRectangles.some(
        (lilyPad) =>
          lilyPad.left < frog.right &&
          lilyPad.top < frog.bottom &&
          lilyPad.right > frog.left &&
          lilyPad.bottom > frog.top
      ),
    });

    if (didLose) {
      this.setState({
        screenText: LOSS_TEXT,
        frogFrame: 2,
      });

      if (score > Number(window.localStorage.getItem("highScore"))) {
        window.localStorage.setItem("highScore", String(score));
      }
    }
  };

  handleStart = () => {
    requestAnimationFrame(this.update);
    this.setState({
      isOn: true,
      screenText: "",
    });
  };

  setIsJumping = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { isJumping } = this.state;

    if (e.key === " " || e.code === "Space") {
      if (!isJumping) {
        this.setState({
          isJumping: true,
          yFrogPosition: JUMP_SPEED,
        });
      }
    }
  };

  resetJump = () => {
    const { frogBottom } = this.state;

    if (frogBottom <= 0) {
      this.setState({
        frogBottom: 0,
        yFrogPosition: 0,
        isJumping: false,
      });
    }
  };

  onReset = () => {
    this.setState({
      isOn: false,
      didLose: false,
      delta: 0,
      lastTime: 0,
      groundLeft: 0,
      speed: INITIAL_SPEED,
      frogFrame: 0,
      currentFrameTime: 0,
      isJumping: false,
      frogBottom: 0,
      yFrogPosition: 0,
      score: 0,
      nextLilyPadTime: LILY_PAD_INTERVAL_MIN,
      lilyPads: [100],
      screenText: "",
    });
    this.handleStart();
  };

  handleKeyDown = () => {
    const { didLose, isOn, screenText } = this.state;

    if (didLose || screenText === LOSS_TEXT) {
      return this.onReset;
    }
    if (isOn) {
      return this.setIsJumping;
    }

    return this.handleStart;
  };

  onRetryButtonClick = () => {
    this.onReset();
  };

  render() {
    const {
      groundLeft,
      frogFrame,
      frogBottom,
      lilyPads,
      score,
      screenText,
      didLose,
    } = this.state;

    return (
      <div id="Game" tabIndex={-1} onKeyDown={this.handleKeyDown()}>
        <Score
          score={score}
          highScore={Number(window.localStorage.getItem("highScore")) ?? 0}
        />
        <Start
          text={screenText}
          didLose={didLose || screenText === LOSS_TEXT}
          onRetryButtonClick={this.onRetryButtonClick}
        />
        <Frog currentFrame={frogFrame} bottom={`${frogBottom}%`} />
        {lilyPads.map((lilyPadLeftCoordinate, index) => (
          <LilyPad left={`${lilyPadLeftCoordinate}%`} key={index} />
        ))}
        <Ground left={`${-groundLeft}%`} />
        <Ground left={`${-groundLeft + 200}%`} />
      </div>
    );
  }
}

export default Game;
