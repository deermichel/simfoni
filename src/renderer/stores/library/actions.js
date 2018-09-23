import types from "./types";

const addTrack = (track) => ({
    type: types.ADD_TRACK,
    payload: { track },
});

export default {
    addTrack,
};
