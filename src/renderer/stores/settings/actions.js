import types from "./types";

const addSearchPath = (path) => ({
    type: types.ADD_SEARCH_PATH,
    payload: { path },
});

const removeSearchPath = (path) => ({
    type: types.REMOVE_SEARCH_PATH,
    payload: { path },
});

export default {
    addSearchPath,
    removeSearchPath,
};
