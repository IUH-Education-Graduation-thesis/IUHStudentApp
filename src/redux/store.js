import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import studentReducers from "./reducers/studentReducers";
const rootReducers = combineReducers({ studentReducers })
export const store = createStore(rootReducers, applyMiddleware(thunk))