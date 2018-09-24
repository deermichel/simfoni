import recursiveReaddir from "recursive-readdir";
import { parseFile } from "music-metadata";
import path from "path";
import { libraryOperations } from "../library";

const supportedTypes = [".mp3"];

const getFiles = (folders) => new Promise((resolve, reject) => {
    let done = 0;
    let allFiles = [];
    const ignore = (file, stats) => stats.isFile() && !supportedTypes.includes(path.extname(file));
    if (folders.length === 0) {
        resolve(allFiles);
    }
    folders.forEach((p) => {
        recursiveReaddir(p, [ignore])
            .then((files) => {
                const newFiles = files.filter((f) => !allFiles.includes(f));
                allFiles = allFiles.concat(newFiles);

                done++;
                if (done === folders.length) { // finished?
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
                tracks.push({
                    title: meta.common.title,
                    artist: meta.common.artist,
                    album: meta.common.album,
                    duration: Math.ceil(meta.format.duration),
                    uri: `file://${f}`,
                });

                done++;
                if (done === files.length) { // finished?
                    resolve(tracks);
                }
            })
            .catch((error) => reject(error));
    });
});

const importFolders = (folders) => (dispatch) => {
    getFiles(folders).then(getTracksWithMetadata).then((tracks) => {
        dispatch(libraryOperations.addTracks(tracks));
    });
};

export default {
    importFolders,
};
