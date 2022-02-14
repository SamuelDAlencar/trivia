const INITIAL_STATE = {
  token: '',
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PLAYER':
    return {
      player: action.player,
      token: action.player.token,
    };
  default:
    return state;
  }
};

export default player;
