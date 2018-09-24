import types from "./types";

const addTracks = (tracks) => ({
    type: types.ADD_TRACKS,
    payload: { tracks },
});

export default {
    addTracks,
};
