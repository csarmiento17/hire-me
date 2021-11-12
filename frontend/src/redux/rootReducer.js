import { combineReducers } from "redux";
import { jobReducer } from "./reducers/jobReducers";

const rootReducer = combineReducers({
  jobs: jobReducer,
});

export default rootReducer;
