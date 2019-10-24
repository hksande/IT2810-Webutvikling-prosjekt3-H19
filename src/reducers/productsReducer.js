import {
  CHANGE_COUNT,
  RESET_COUNT,
  SET_ORDER_BY,
  SET_SEARCH,
  SET_TYPE_FILTER
} from "../constants/actionTypes";

const productsReducer = (
  state = {
    count: 0,
    drinks: {},
    orderBy: null,
    searchString: null,
    typeFilter: null
  },
  action
) => {
  switch (action.type) {
    case CHANGE_COUNT:
      if (state.drinks[action.payload.name]) {
        const newCount = {};
        newCount[action.payload.name] =
          state.drinks[action.payload.name] + action.payload.change;
        return {
          ...state,
          drinks: { ...state.drinks, ...newCount },
          count: state.count + +action.payload.change
        };
      } else {
        const newCount = {};
        newCount[action.payload.name] = 1;
        return {
          ...state,
          drinks: { ...state.drinks, ...newCount },
          count: state.count + +action.payload.change
        };
      }
    case RESET_COUNT:
      return {
        count: 0,
        drinks: {}
      };
    case SET_ORDER_BY:
      return { ...state, orderBy: action.payload.orderBy };
    case SET_SEARCH:
      return { ...state, searchString: action.payload.searchString };
    case SET_TYPE_FILTER:
      return { ...state, typeFilter: action.payload.typeFilter };
    default:
      return state;
  }
};

export default productsReducer;
