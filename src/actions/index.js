import { INCREMENT_COUNT } from "../constants/actionTypes";

export function incrementCount(payload) {
  return { type: INCREMENT_COUNT, payload };
}
