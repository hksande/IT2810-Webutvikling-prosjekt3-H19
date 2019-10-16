import { INCREMENT_COUNT, DECREMENT_COUNT } from "../constants/actionTypes";

export function incrementCount(payload) {
  return { type: INCREMENT_COUNT, payload };
}

export function decrementCount(payload) {
  return { type: DECREMENT_COUNT, payload };
}

