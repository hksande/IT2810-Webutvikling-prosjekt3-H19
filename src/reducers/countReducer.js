import { INCREMENT_COUNT } from "../constants/actionTypes";

const countReducer = (
  state = {
    count: 0
  },
  action
) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

export default countReducer;
