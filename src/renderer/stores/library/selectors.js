import { createSelector } from "redux-orm";
import orm from "./orm";

const getLibrary = (state) => state.library;

const getTracks = createSelector(
    orm,
    getLibrary,
    (session) => session.Track.all().toModelArray().map((track) => ({
        ...track.ref,
        album: track.album.name,
        artist: track.album.artist.name,
    })),
);

export default {
    getTracks,
};
