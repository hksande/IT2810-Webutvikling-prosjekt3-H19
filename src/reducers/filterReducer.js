import {
  SET_ORDER_BY,
  SET_SEARCH,
  SET_TYPE_FILTER
} from "../constants/actionTypes";

const defaultState = {
  orderBy: null,
  searchString: null,
  typeFilter: null
};

const filterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ORDER_BY:
      return { ...state, orderBy: action.payload.orderBy };
    case SET_SEARCH:
      return { ...state, searchString: action.payload.searchString };
    case SET_TYPE_FILTER:
      return {
        ...state,
        typeFilter:
          action.payload.typeFilter === undefined
            ? null
            : action.payload.typeFilter
      };
    default:
      return state;
  }
};

export default filterReducer;
