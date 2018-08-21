import { Map } from "immutable";
import types from "./types";
import PlayState from "~/constants/PlayState";

const INITIAL_STATE = Map({
    state: PlayState.PAUSED,
});

const playTrack = (state, payload) => state.merge({
    trackId: payload.trackId,
    state: PlayState.PLAYING,
    currentTime: 0,
});

const pauseTrack = (state) => state.set("state", PlayState.PAUSED);

const nowPlayingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.PLAY_TRACK:
            return playTrack(state, action.payload);
        case types.PAUSE_TRACK:
            return pauseTrack(state, action.payload);
        default:
            return state;
    }
};

export default nowPlayingReducer;
