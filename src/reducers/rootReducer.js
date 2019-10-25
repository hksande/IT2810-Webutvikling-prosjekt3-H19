import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  filter: filterReducer
});

export default rootReducer;
