import { LOG_IN } from '../actions';

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
  default:
    return state;
  }
};

export default playerReducer;
