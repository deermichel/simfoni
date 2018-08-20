import { fromJS, List } from "immutable";
import types from "./types";

const INITIAL_STATE = List();

const setTracks = (state, action) => {
    const tracks = fromJS(action.tracks);
    return tracks;
};

const tracksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_TRACKS:
            return setTracks(state, action);
        default:
            return state;
    }
};

export default tracksReducer;
