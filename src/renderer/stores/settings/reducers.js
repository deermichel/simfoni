import { Map, Set } from "immutable";
import types from "./types";

const INITIAL_STATE = Map({
    searchPaths: Set(),
});

const addSearchPaths = (state, payload) => {
    const searchPaths = state.get("searchPaths");
    const newPaths = Set(payload.paths);
    return state.set("searchPaths", searchPaths.concat(newPaths));
};

const removeSearchPath = (state, payload) => {
    const searchPaths = state.get("searchPaths");
    return state.set("searchPaths", searchPaths.filterNot((p) => p === payload.path));
};

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ADD_SEARCH_PATHS:
            return addSearchPaths(state, action.payload);
        case types.REMOVE_SEARCH_PATH:
            return removeSearchPath(state, action.payload);
        default:
            return state;
    }
};

export default settingsReducer;
