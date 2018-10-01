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
                const track = {
                    title: meta.common.title || path.basename(f, path.extname(f)),
                    artist: meta.common.artist || " ",
                    album: meta.common.album || " ",
                    duration: Math.ceil(meta.format.duration),
                    uri: `file://${f}`,
                };
                if (meta.common.picture && meta.common.picture.length > 0) {
                    const { data, format } = meta.common.picture[0];
                    track.coverart = `data:${format};base64,${data.toString("base64")}`;
                }
                tracks.push(track);

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
        for (let i = 0; i < tracks.length; i += 64) {
            const batch = tracks.splice(i, 64);
            dispatch(libraryOperations.addTracks(batch));
        }
    });
};

export default {
    importFolders,
};
