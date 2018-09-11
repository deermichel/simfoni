import { createStore, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { Iterable } from "immutable";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";
import playerMiddleware from "~/middleware/player";
import trackProviderMiddleware from "~/middleware/trackProvider";

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

const configureStore = (history, initialState) => createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
        loggerMiddleware,
        playerMiddleware(),
        trackProviderMiddleware,
    ),
);

export default configureStore;
