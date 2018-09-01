import { Map, List } from "immutable";
import types from "./types";

const INITIAL_STATE = Map({
    searchPaths: List(),
});

const addSearchPath = (state, payload) => {
    const searchPaths = state.get("searchPaths");
    return state.set("searchPaths", searchPaths.push(payload.path));
};

const removeSearchPath = (state, payload) => {
    const searchPaths = state.get("searchPaths");
    return state.set("searchPaths", searchPaths.filterNot((p) => p === payload.path));
};

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ADD_SEARCH_PATH:
            return addSearchPath(state, action.payload);
        case types.REMOVE_SEARCH_PATH:
            return removeSearchPath(state, action.payload);
        default:
            return state;
    }
};

export default settingsReducer;
