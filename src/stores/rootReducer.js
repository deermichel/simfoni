import { combineReducers } from "redux";
import tracksReducer from "./tracks";

const rootReducer = combineReducers({
    tracks: tracksReducer,
});

export default rootReducer;
