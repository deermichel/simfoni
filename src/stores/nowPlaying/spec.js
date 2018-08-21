import { expect } from "chai";
import { fromJS, Map } from "immutable";
import actions from "./actions";
import selectors from "./selectors";
import reducer from "./reducers";
import PlayState from "~/constants/PlayState";

describe("nowPlaying reducer", () => {
    it("has an initial state", () => {
        const nextState = reducer(undefined, {});

        expect(nextState).to.equal(fromJS({
            state: PlayState.PAUSED,
        }));
    });

    it("handles PLAY_TRACK", () => {
        const initialState = Map();
        const action = actions.playTrack("id123");
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            trackId: "id123",
            currentTime: 0,
            state: PlayState.PLAYING,
        }));
    });

    it("handles PAUSE_TRACK", () => {
        const initialState = fromJS({
            trackId: "id123",
            currentTime: 142,
            state: PlayState.PLAYING,
        });
        const action = actions.pauseTrack();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            trackId: "id123",
            currentTime: 142,
            state: PlayState.PAUSED,
        }));
    });
});

describe("nowPlaying selectors", () => {
    describe("getNowPlayingWithTrack", () => {
        it("returns nowPlaying with full track object", () => {
            const state = {
                tracks: fromJS([{
                    id: "sail",
                    title: "Sail",
                    artist: "AWOLNATION",
                    album: "Megalithic Symphony",
                    duration: 259,
                }]),
                nowPlaying: fromJS({
                    trackId: "sail",
                    currentTime: 142,
                    state: PlayState.PAUSED,
                }),
            };
            const selected = selectors.getNowPlayingWithTrack(state);

            expect(selected).to.equal(fromJS({
                track: {
                    id: "sail",
                    title: "Sail",
                    artist: "AWOLNATION",
                    album: "Megalithic Symphony",
                    duration: 259,
                },
                currentTime: 142,
                state: PlayState.PAUSED,
            }));
        });
    });
});
