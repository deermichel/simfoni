import { Map, List } from "immutable";
import types from "./types";
import PlayState from "~/constants/PlayState";

const INITIAL_STATE = Map({
    playState: PlayState.STOPPED,
    history: List(),
});

const playTrack = (state, payload) => {
    const history = state.get("history");
    return state.merge({
        playState: PlayState.PLAYING,
        currentTime: 0,
        currentTrack: payload.track,
        history: history.unshift(payload.track),
    });
};

const playQueue = (state, payload) => {
    const queue = List(payload.queue);
    const track = queue.first();
    return playTrack(state, { track }).merge({
        queue: queue.shift(),
    });
};

const togglePlayback = (state) => {
    const playState = state.get("playState");
    return state.merge({
        playState: (playState === PlayState.PLAYING)
            ? PlayState.PAUSED : PlayState.PLAYING,
    });
};

const skipForward = (state) => {
    const queue = state.get("queue");
    return playQueue(state, { queue });
};

const skipBackward = (state) => {
    const currentTrack = state.get("currentTrack");
    const time = state.get("currentTime");
    const queue = state.get("queue");
    const history = (time >= 3) ? state.get("history") : state.get("history").shift();
    const track = history.first();
    return playTrack(state.merge({
        history: history.shift(),
        queue: (time >= 3) ? queue : queue.unshift(currentTrack),
    }), { track });
};

const nowPlayingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.PLAY_TRACK:
            return playTrack(state, action.payload);
        case types.PLAY_QUEUE:
            return playQueue(state, action.payload);
        case types.TOGGLE_PLAYBACK:
            return togglePlayback(state, action.payload);
        case types.SKIP_FORWARD:
            return skipForward(state, action.payload);
        case types.SKIP_BACKWARD:
            return skipBackward(state, action.payload);
        default:
            return state;
    }
};

export default nowPlayingReducer;
