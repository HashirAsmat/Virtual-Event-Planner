import { combineReducers } from "redux";
import userReducer from './userAuthSlice'; // introducing user Reducers function to redux 

const rootReducer = combineReducers({
  userReducer
});

export default rootReducer;