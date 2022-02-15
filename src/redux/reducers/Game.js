const INITIAL_STATE = {
  player: {
    token: '',
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  token: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PLAYER':
    return {
      player: action.player,
      token: action.token,
    };
  default:
    return state;
  }
};

export default gameReducer;
