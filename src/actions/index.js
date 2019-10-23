import {
  CHANGE_COUNT,
  RESET_COUNT,
  SET_ORDER_BY,
  SET_SEARCH
} from "../constants/actionTypes";

export function changeCount(payload) {
  return { type: CHANGE_COUNT, payload };
}

export function resetCount() {
  return { type: RESET_COUNT };
}

export function setOrderBy(payload) {
  return { type: SET_ORDER_BY, payload };
}

export function setSearch(payload) {
  return { type: SET_SEARCH, payload };
}
