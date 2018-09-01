import { combineReducers } from "redux";
import tracksReducer from "./tracks";
import nowPlayingReducer from "./nowPlaying";
import uiReducer from "./ui";
import settingsReducer from "./settings";

const rootReducer = combineReducers({
    tracks: tracksReducer,
    nowPlaying: nowPlayingReducer,
    ui: uiReducer,
    settings: settingsReducer,
});

export default rootReducer;
