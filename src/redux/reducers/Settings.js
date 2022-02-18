import { SETTINGS } from '../actions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SETTINGS:
    return {
      ...state,
      category: action.category,
      difficulty: action.difficulty,
      type: action.qType,
    };
  default:
    return state;
  }
};

export default settingsReducer;
