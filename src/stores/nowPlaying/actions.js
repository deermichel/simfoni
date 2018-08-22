import types from "./types";

const playQueue = (queue, history) => ({
    type: types.PLAY_QUEUE,
    payload: { queue, history },
});

const togglePlayback = () => ({ type: types.TOGGLE_PLAYBACK });

const skipForward = () => ({ type: types.SKIP_FORWARD });

const skipBackward = () => ({ type: types.SKIP_BACKWARD });

const seek = (time) => ({
    type: types.SEEK,
    payload: { time },
});

const playTrack = (track) => ({
    type: types.PLAY_TRACK,
    payload: { track },
});

const stopPlayback = () => ({ type: types.STOP_PLAYBACK });

export default {
    playQueue,
    togglePlayback,
    skipForward,
    skipBackward,
    seek,
    playTrack,
    stopPlayback,
};
