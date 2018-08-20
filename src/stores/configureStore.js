import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";

const loggerMiddleware = createLogger();

const configureStore = (initialState) => createStore(
    rootReducer,
    initialState,
    applyMiddleware(
        loggerMiddleware,
    ),
);

export default configureStore;
