import { combineReducers } from "redux";
import contentReducer from "../reducers/contentReducer";

import auth from './auth'
export default combineReducers({
  auth,
  content: contentReducer,
});