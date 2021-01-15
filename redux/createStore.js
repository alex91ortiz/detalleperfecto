import { createStore } from "redux";
import rootReducer from "./reducers/reducer";

export default function configureStore(initialState, history) {
  return createStore(rootReducer);
}