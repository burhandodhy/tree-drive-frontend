import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import messages from "./message";
import posts from "./posts";

export default combineReducers({
  auth,
  errors,
  messages,
  posts
});
