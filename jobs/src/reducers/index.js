import {combineReducers} from "redux";
import loginReducer from "./login";

const allReducers = combineReducers ({
   loginReducer,
   //them nhieu reducer o day

});

export default allReducers;