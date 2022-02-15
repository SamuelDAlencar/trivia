import { TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return action.token;
  default:
    return state;
  }
};

export default tokenReducer;
