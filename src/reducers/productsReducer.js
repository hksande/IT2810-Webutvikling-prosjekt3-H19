import {
  CHANGE_COUNT,
  RESET_COUNT,
  STOP_REFETCH
} from "../constants/actionTypes";

const defaultState = {
  count: 0,
  drinks: {},
  refetch: false
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
      return { ...defaultState, refetch: true };
    case STOP_REFETCH:
      return { ...state, refetch: false };
    default:
      return state;
  }
};

export default productsReducer;
