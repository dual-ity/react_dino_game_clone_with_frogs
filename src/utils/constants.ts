export const DEFAULT_GAME_DIMENSIONS = { height: 40, width: 70 };

export const LOSS_TEXT = "game over!";
export const START_TEXT = "press space to start..";

export const INITIAL_SPEED = 0.025;
export const SPEED_INCREMENT = 0.0000005;
export const FRAME_TIME = 8;
export const FROG_FRAME_COUNT = 2;
export const GRAVITY = 0.0013;
export const JUMP_SPEED = 0.4;
export const LILY_PAD_INTERVAL_MIN = 35;
export const LILY_PAD_INTERVAL_MAX = 120;
export const SCORE_INCREMENT = 0.1;

export const SCORE_PLACEHOLDER = "0000000";
export const SCORE_TEXT = "score:";
export const HIGH_SCORE_TEXT = "high score:";

export enum zIndex {
  Ground = 10,
  LilyPad = 11,
  Frog = 12,
}
