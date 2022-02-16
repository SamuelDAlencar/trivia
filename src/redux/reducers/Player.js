import { LOG_IN, SCORE } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_IN:
    return action.player;
  case SCORE:
    return {
      ...state.player,
      score: action.score,
    };
  default:
    return state;
  }
};

export default playerReducer;
