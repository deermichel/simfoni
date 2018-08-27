import { combineReducers } from "redux";
import tracksReducer from "./tracks";
import nowPlayingReducer from "./nowPlaying";

const rootReducer = combineReducers({
    tracks: tracksReducer,
    nowPlaying: nowPlayingReducer,
});

export default rootReducer;
