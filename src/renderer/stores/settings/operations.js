import storage from "electron-json-storage";
import actions from "./actions";

const addSearchPaths = (paths) => (dispatch, getState) => {
    dispatch(actions.addSearchPaths(paths));

    const searchPaths = getState().settings.get("searchPaths");
    storage.set("settings.searchpaths", searchPaths.toJSON(), (error) => {
        if (error) {
            // TODO: error handling
        }
    });
};

const removeSearchPath = (path) => (dispatch, getState) => {
    dispatch(actions.removeSearchPath(path));

    const searchPaths = getState().settings.get("searchPaths");
    storage.set("settings.searchpaths", searchPaths.toJSON(), (error) => {
        if (error) {
            // TODO: error handling
        }
    });
};

const loadSearchPaths = () => (dispatch) => {
    storage.get("settings.searchpaths", (error, paths) => {
        if (error) {
            // TODO: error handling
            return;
        }

        if (Object.keys(paths).length > 0) {
            dispatch(actions.addSearchPaths(paths));
        }
    });
};

export default {
    addSearchPaths,
    removeSearchPath,
    loadSearchPaths,
};
