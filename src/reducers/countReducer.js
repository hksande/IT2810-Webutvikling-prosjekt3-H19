import { CHANGE_COUNT, RESET_COUNT } from "../constants/actionTypes";

const countReducer = (
  state = {
    count: 0,
    drinks: {}
  },
  action
) => {
  switch (action.type) {
    case CHANGE_COUNT:
      if (state.drinks[action.payload.id]) {
        const newCount = {};
        newCount[action.payload.id] =
          state.drinks[action.payload.id] + action.payload.change;
        return { ...state, drinks: { ...state.drinks, ...newCount } };
      } else {
        const newCount = {};
        newCount[action.payload.id] = 1;
        return { ...state, drinks: { ...state.drinks, ...newCount } };
      }
    case RESET_COUNT:
      return {
        count: 0,
        drinks: {}
      };
    default:
      return state;
  }
};

export default countReducer;
