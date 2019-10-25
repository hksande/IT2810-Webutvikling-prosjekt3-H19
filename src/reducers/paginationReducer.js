import { SET_PAGE } from "../constants/actionTypes";

const defaultState = {
  page: 1
};

const filterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.payload.change === 0
        ? defaultState
        : { ...state, page: state.page + action.payload.change };
    default:
      return state;
  }
};

export default filterReducer;
