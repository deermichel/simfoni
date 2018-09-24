import { createStore, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { Iterable } from "immutable";
import { createLogger } from "redux-logger";
import { persistReducer, createTransform } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";
import PlayState from "~/constants/PlayState";
import playerMiddleware from "~/middleware/player";

const stateTransformer = (state) => {
    const newState = {};
    Object.keys(state).forEach((i) => {
        if (Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
        } else {
            newState[i] = state[i];
        }
    });
    return newState;
};

const loggerMiddleware = createLogger({ stateTransformer });

const playStateTransform = createTransform((state) => {
    if (state.get("playState") === PlayState.PLAYING) {
        return state.set("playState", PlayState.PAUSED); // pause playback if playing
    }
    return state;
}, null, { whitelist: ["nowPlaying"] });
const persistConfig = {
    transforms: [playStateTransform, immutableTransform()],
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (history, initialState) => createStore(
    connectRouter(history)(persistedReducer),
    initialState,
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
        loggerMiddleware,
        playerMiddleware(),
    ),
);

export default configureStore;
