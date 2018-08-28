import { combineReducers } from "redux";
import tracksReducer from "./tracks";
import nowPlayingReducer from "./nowPlaying";
import uiReducer from "./ui";

const rootReducer = combineReducers({
    tracks: tracksReducer,
    nowPlaying: nowPlayingReducer,
    ui: uiReducer,
});

export default rootReducer;
