import { combineReducers } from "redux";
import { persistReducer, createTransform } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import createElectronStorage from "redux-persist-electron-storage";
import libraryReducer from "./library";
import nowPlayingReducer from "./nowPlaying";
import uiReducer from "./ui";
import settingsReducer from "./settings";
import PlayState from "~/constants/PlayState";

const rootReducer = combineReducers({
    library: libraryReducer,
    nowPlaying: nowPlayingReducer,
    ui: uiReducer,
    settings: settingsReducer,
});

const playStateTransform = createTransform((state) => {
    if (state.get("playState") === PlayState.PLAYING) {
        return state.set("playState", PlayState.PAUSED); // pause playback if playing
    }
    return state;
}, null, { whitelist: ["nowPlaying"] });
const persistConfig = {
    transforms: [playStateTransform, immutableTransform()],
    key: "root",
    storage: createElectronStorage(),
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
