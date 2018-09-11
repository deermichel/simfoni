import recursiveReaddir from "recursive-readdir";
import path from "path";
import { Map } from "immutable";
import { tracksOperations } from "~/stores/tracks";

const supportedTypes = [".mp3"];

let currentWorkState = null;

const getFiles = (added) => new Promise((resolve, reject) => {
    let done = 0;
    let allFiles = [];
    const ignore = (file, stats) => stats.isFile() && !supportedTypes.includes(path.extname(file));
    if (added.size === 0) {
        resolve([]);
    }
    added.forEach((p) => {
        recursiveReaddir(p, [ignore])
            .then((files) => {
                const newFiles = files.filter((f) => !allFiles.includes(f));
                allFiles = allFiles.concat(newFiles);

                done++;
                if (done === added.count()) { // finished?
                    resolve(allFiles);
                }
            })
            .catch((error) => reject(error));
    });
});

export default (store) => (next) => (action) => {
    if (!action.meta || !action.meta.trackProvider) {
        return next(action);
    }

    const previousState = store.getState();
    const result = next(action);
    const currentState = store.getState();

    const currentPaths = currentState.settings.get("searchPaths");
    const previousPaths = previousState.settings.get("searchPaths");
    if (currentPaths === previousPaths) {
        return result; // nothing to do
    }

    currentWorkState = currentState; // set context
    let { tracks } = currentState;

    // remove tracks
    const removed = previousPaths.filterNot((p) => currentPaths.includes(p));
    tracks = tracks.filterNot((t) => removed.includes(t.getIn(["_trackProvider", "searchPath"])));

    // add tracks
    const added = currentPaths.filterNot((p) => previousPaths.includes(p));
    getFiles(added).then((files) => {
        const newTracks = files.map((f) => Map({
            title: path.basename(f, path.extname(f)),
            source: `file://${f}`,
            id: f,
        }));
        tracks = tracks.push(...newTracks);

        if (currentWorkState === currentState) { // still relevant?
            store.dispatch(tracksOperations.setTracks(tracks));
        }
    });

    return result;
};
