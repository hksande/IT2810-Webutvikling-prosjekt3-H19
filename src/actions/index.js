import { CHANGE_COUNT, RESET_COUNT } from "../constants/actionTypes";

export function changeCount(payload) {
  return { type: CHANGE_COUNT, payload };
}

export function resetCount() {
  return { type: RESET_COUNT };
}
