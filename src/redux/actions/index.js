export const LOG_IN = 'LOG_IN';
export const TOKEN = 'TOKEN';
export const SCORE = 'SCORE';

export const token = (state) => ({
  type: TOKEN,
  token: state,
});

export const player = (state) => ({
  type: LOG_IN,
  player: state,
});

export const score = (state) => ({
  type: SCORE,
  score: state,
});
