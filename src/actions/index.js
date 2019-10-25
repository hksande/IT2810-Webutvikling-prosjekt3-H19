import {
  CHANGE_COUNT,
  RESET_COUNT,
  SET_ORDER_BY,
  SET_SEARCH,
  SET_TYPE_FILTER,
  SET_PAGE,
  STOP_REFETCH
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

export function setTypeFilter(payload) {
  return { type: SET_TYPE_FILTER, payload };
}

export function setPage(payload) {
  return { type: SET_PAGE, payload };
}

export function stopRefetch() {
  return { type: STOP_REFETCH };
}
