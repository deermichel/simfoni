import { createSelector } from "redux-orm";
import orm from "./orm";

const getLibrary = (state) => state.library;

const getTracks = createSelector(
    orm,
    getLibrary,
    (session) => session.Track.all().toModelArray().map((track) => {
        const trackObj = {
            ...track.ref,
            album: track.album.name,
            artist: track.album.artist.name,
        };

        const { coverart } = track.album;
        if (coverart) {
            trackObj.coverart = coverart;
        }

        return trackObj;
    }),
);

export default {
    getTracks,
};
