import { combineReducers } from 'redux';
import playerReducer from './Player';
import settingsReducer from './Settings';
import tokenReducer from './Token';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  settings: settingsReducer,
});

export default rootReducer;
