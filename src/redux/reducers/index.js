import { combinerReducers } from 'redux';
import player from './player';

const rootReducer = combinerReducers({
  player,
});

export default rootReducer;
