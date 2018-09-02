import types from "./types";

const addSearchPaths = (paths) => ({
    type: types.ADD_SEARCH_PATHS,
    payload: { paths },
    meta: { trackProvider: true },
});

const removeSearchPath = (path) => ({
    type: types.REMOVE_SEARCH_PATH,
    payload: { path },
    meta: { trackProvider: true },
});

export default {
    addSearchPaths,
    removeSearchPath,
};
