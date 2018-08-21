import types from "./types";

const setTracks = (tracks) => ({
    type: types.SET_TRACKS,
    payload: { tracks },
});

export default {
    setTracks,
};
