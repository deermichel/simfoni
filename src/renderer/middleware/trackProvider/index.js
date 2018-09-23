import recursiveReaddir from "recursive-readdir";
import { parseFile } from "music-metadata";
import path from "path";
import { Map } from "immutable";
// import { tracksOperations } from "~/stores/tracks";

const supportedTypes = [".mp3"];

let currentWorkState = null;

const getFiles = (added) => new Promise((resolve, reject) => {
    let done = 0;
    let allFiles = [];
    const ignore = (file, stats) => stats.isFile() && !supportedTypes.includes(path.extname(file));
    if (added.size === 0) {
        resolve(allFiles);
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

const getTracksWithMetadata = (files) => new Promise((resolve, reject) => {
    let done = 0;
    const tracks = [];
    if (files.size === 0) {
        resolve(tracks);
    }
    files.forEach((f) => {
        parseFile(f)
            .then((meta) => {
                tracks.push(Map({
                    title: meta.common.title,
                    artist: meta.common.artist,
                    album: meta.common.album,
                    duration: Math.ceil(meta.format.duration),
                    source: `file://${f}`,
                    id: f,
                }));

                done++;
                if (done === files.length) { // finished?
                    resolve(tracks);
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

    /* TODO
    // remove tracks - currently not implemented
    const removed = previousPaths.filterNot((p) => currentPaths.includes(p));
    tracks = tracks.filterNot((t) => removed.includes(t.getIn(["_trackProvider", "searchPath"])));
    */

    // add tracks
    const added = currentPaths.filterNot((p) => previousPaths.includes(p));
    getFiles(added).then(getTracksWithMetadata).then((newTracks) => {
        tracks = tracks.push(...newTracks);

        if (currentWorkState === currentState) { // still relevant?
            // store.dispatch(tracksOperations.setTracks(tracks));
        }
    });

    return result;
};
