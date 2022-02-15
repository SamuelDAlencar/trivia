import { combineReducers } from 'redux';
import playerReducer from './Player';
import tokenReducer from './Token';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
});

export default rootReducer;
