import types from "./types";

const playQueue = (queue, history) => ({
    type: types.PLAY_QUEUE,
    payload: { queue, history },
    meta: { player: true },
});

const togglePlayback = () => ({ type: types.TOGGLE_PLAYBACK, meta: { player: true } });

const skipForward = () => ({ type: types.SKIP_FORWARD, meta: { player: true } });

const skipBackward = () => ({ type: types.SKIP_BACKWARD, meta: { player: true } });

const seek = (time) => ({
    type: types.SEEK,
    payload: { time },
    meta: { player: true },
});

const playTrack = (track) => ({
    type: types.PLAY_TRACK,
    payload: { track },
    meta: { player: true },
});

const stopPlayback = () => ({ type: types.STOP_PLAYBACK, meta: { player: true } });

const updateTime = (time) => ({
    type: types.UPDATE_TIME,
    payload: { time },
});

const toggleMute = () => ({ type: types.TOGGLE_MUTE, meta: { player: true } });

const setVolume = (volume) => ({
    type: types.SET_VOLUME,
    payload: { volume },
    meta: { player: true },
});

export default {
    playQueue,
    togglePlayback,
    skipForward,
    skipBackward,
    seek,
    playTrack,
    stopPlayback,
    updateTime,
    toggleMute,
    setVolume,
};
