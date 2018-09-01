import types from "./types";

const addSearchPaths = (paths) => ({
    type: types.ADD_SEARCH_PATHS,
    payload: { paths },
});

const removeSearchPath = (path) => ({
    type: types.REMOVE_SEARCH_PATH,
    payload: { path },
});

export default {
    addSearchPaths,
    removeSearchPath,
};
