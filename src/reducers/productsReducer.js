import {
  CHANGE_COUNT,
  RESET_COUNT
} from "../constants/actionTypes";

const defaultState = {
  count: 0,
  drinks: {}
};

const productsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_COUNT:
      if (state.drinks[action.payload.name]) {
        const newCount = {};
        newCount[action.payload.name] =
          state.drinks[action.payload.name] + action.payload.change;
        return {
          ...state,
          drinks: { ...state.drinks, ...newCount },
          count: state.count + action.payload.change
        };
      } else {
        const newCount = {};
        newCount[action.payload.name] = 1;
        return {
          ...state,
          drinks: { ...state.drinks, ...newCount },
          count: state.count + action.payload.change
        };
      }
    case RESET_COUNT:
      return defaultState;
    default:
      return state;
  }
};

export default productsReducer;
