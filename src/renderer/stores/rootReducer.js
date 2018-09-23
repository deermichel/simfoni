import { combineReducers } from "redux";
import libraryReducer from "./library";
import nowPlayingReducer from "./nowPlaying";
import uiReducer from "./ui";
import settingsReducer from "./settings";

const rootReducer = combineReducers({
    library: libraryReducer,
    nowPlaying: nowPlayingReducer,
    ui: uiReducer,
    settings: settingsReducer,
});

export default rootReducer;
