import { combineReducers } from "redux";
import libraryReducer from "./library";
import tracksReducer from "./tracks";
import nowPlayingReducer from "./nowPlaying";
import uiReducer from "./ui";
import settingsReducer from "./settings";

const rootReducer = combineReducers({
    library: libraryReducer,
    tracks: tracksReducer,
    nowPlaying: nowPlayingReducer,
    ui: uiReducer,
    settings: settingsReducer,
});

export default rootReducer;
