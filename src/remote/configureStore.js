import { createStore, applyMiddleware } from "redux";
import { Iterable } from "immutable";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "~/stores/rootReducer";
import playerMiddleware from "~/middleware/player";
import persistMiddleware from "~/middleware/persist";
import remoteMiddleware from "~/middleware/remote";

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

const configureStore = (initialState) => createStore(
    rootReducer,
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        persistMiddleware,
        playerMiddleware(),
        remoteMiddleware("mainWindow"),
    ),
);

export default configureStore;
