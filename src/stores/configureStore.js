import { createStore, applyMiddleware } from "redux";
import { Iterable } from "immutable";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
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

const configureStore = (initialState) => createStore(
    rootReducer,
    initialState,
    applyMiddleware(
        loggerMiddleware,
        playerMiddleware,
    ),
);

export default configureStore;
