import { combineReducers } from "redux";
import posts from "./posts";
import siblings from "./siblings";
import auth from './auth'

export default combineReducers({ posts,siblings,auth});
  
