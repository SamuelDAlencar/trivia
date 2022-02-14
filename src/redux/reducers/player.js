const INITIAL_STATE = {
  token: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PLAYER':
    return {
      token: action.token,
      player,
    };
  default:
    return state;
  }
};

export default player;
