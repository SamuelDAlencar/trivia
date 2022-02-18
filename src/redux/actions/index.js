export const LOG_IN = 'LOG_IN';
export const TOKEN = 'TOKEN';
export const SCORE = 'SCORE';
export const SETTINGS = 'SETTINGS';

export const tokenAction = (state) => ({
  type: TOKEN,
  token: state,
});

export const playerAction = (state) => ({
  type: LOG_IN,
  player: state,
});

export const scoreAction = (score, assertions) => ({
  type: SCORE,
  score,
  assertions,
});

export const settingsAction = (category, difficulty, qType) => ({
  type: SETTINGS,
  category,
  difficulty,
  qType,
});
