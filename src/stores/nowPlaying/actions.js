import types from "./types";

const playTrack = (trackId) => ({
    type: types.PLAY_TRACK,
    payload: { trackId },
});

const pauseTrack = () => ({
    type: types.PAUSE_TRACK,
});

export default {
    playTrack,
    pauseTrack,
};
