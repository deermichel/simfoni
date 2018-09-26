import types from "./types";

const addTracks = (tracks) => ({
    type: types.ADD_TRACKS,
    payload: { tracks },
});

const updateTrack = (track) => ({ type: types.UPDATE_TRACK, payload: { track } });

export default {
    addTracks,
    updateTrack,
};
